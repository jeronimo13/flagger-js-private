import EventSource from 'eventsource'
import Environment from './environment'
import {logger} from './logger'
import LRU from './lru'
import Router from './router'
import Stat from './stat'
import {version} from '../package.json'

import * as http from 'http'
import * as https from 'https'
import * as URL from 'url'

// Default API domain
const DEFAULT_API_DOMAIN = 'airshiphq.com'

// Primary API endpoints
const IDENTIFY_ENDPOINT = `/v2/identify`
const GATING_INFO_ENDPOINT = `/v2/gating-info`

// SSE API endpoints
const SSE_GATING_INFO_ENDPOINT = `/v2/sse-events`

// Backup API URL & endpoint
const BACKUP_URL = 'https://backup-api.airshiphq.com'
const BACKUP_GATING_INFO_ENDPOINT = `${BACKUP_URL}/v2/gating-info`

const REQUEST_TIMEOUT = 10 * 1000

// Default ingestion parameters
const DEFAULT_INGESTION_INTERVAL = 30
const DEFAULT_BROWSER_INGESTION_INTERVAL = 15
const DEFAULT_INGESTION_MAX_ITEMS = 500
const DEFAULT_BROWSER_INGESTION_MAX_ITEMS = 5

export default class Airship extends Environment {
  constructor(gatingInfoListener) {
    super()

    this.gatingInfoListener = gatingInfoListener
    this.init()
  }

  init() {
    this.ingestionMaxItems = DEFAULT_INGESTION_MAX_ITEMS
    this.ingestionInterval = DEFAULT_INGESTION_INTERVAL * 1000

    // eslint-disable-next-line no-undef
    if (__BROWSER__) {
      this.ingestionMaxItems = DEFAULT_BROWSER_INGESTION_MAX_ITEMS
      this.ingestionInterval = DEFAULT_BROWSER_INGESTION_INTERVAL * 1000
    }

    this.objects = []
    this.stats = []
    this.exposures = []
    this.flags = new Set()
    this.oldFlags = new Set()

    this.objectLRUCache = new LRU(500)
    this.firstIngestion = true

    this.shouldIngestObjects = true
    this.shouldIngestStats = true
    this.shouldIngestExposures = true
    this.shouldIngestFlags = true

    this.restartIngestionWorker()
  }

  restartIngestionWorker() {
    if (this.ingestionWorker) {
      clearInterval(this.ingestionWorker)
    }

    this.ingestionWorker = setInterval(() => {
      this.maybeIngest(true)
    }, this.ingestionInterval)
  }

  async maybeIngest(force = false) {
    if (!this.shouldIngestObjects) {
      this.objects = []
    }

    if (!this.shouldIngestStats) {
      this.stats = []
    }

    if (!this.shouldIngestExposures) {
      this.exposures = []
    }

    if (!this.shouldIngestFlags) {
      this.flags = new Set()
    }

    let shouldIngest =
      force ||
      (this.objects.length >= this.ingestionMaxItems ||
        this.stats.length >= this.ingestionMaxItems ||
        this.exposures.length >= this.ingestionMaxItems ||
        this.flags.size > 0)

    if (this.firstIngestion) {
      shouldIngest = shouldIngest || this.objects.length > 0
      this.firstIngestion = !shouldIngest
    }

    if (
      this.objects.length === 0 &&
      this.stats.length === 0 &&
      this.exposures.length === 0 &&
      this.flags.size === 0
    ) {
      shouldIngest = false
    }

    if (shouldIngest) {
      const objects = this.objects
      const stats = this.stats
      const exposures = this.exposures
      const flags = Array.from(this.flags)
      flags.forEach(flagName => {
        this.oldFlags.add(flagName)
      })

      this.objects = []
      this.stats = []
      this.exposures = []
      this.flags = new Set()

      await this.postContent(
        this.primaryServerUrl + IDENTIFY_ENDPOINT + '/' + this.envKey,
        JSON.stringify({
          objects: objects,
          stats: stats.map(s => s.getStatsObj()).filter(so => so !== null),
          exposures: exposures,
          flags: flags,
          sdkInfo: {
            name: '__SDK_NAME__',
            version: version
          }
        })
      ).catch(err => {
        logger(err)
      })
    }
  }

  _identifyObject(obj) {
    const airshipObj = Environment.prototype._identifyObject.call(this, obj)

    if (!airshipObj.isValid()) {
      return airshipObj
    }
    const id = airshipObj.getId()
    const hash = airshipObj.getHash()
    const storedHash = this.objectLRUCache.get(id)
    if (storedHash === null || hash !== storedHash) {
      this.objects.push(airshipObj.getRawObject())
    }

    this.objectLRUCache.set(id, hash)
    this.maybeIngest()

    return airshipObj
  }

  _compactStats() {
    this.stats = Stat.compactStats(this.stats)
  }

  _saveStat(stat) {
    this.stats.push(stat)
    if (this.stats.length >= this.ingestionMaxItems) {
      this._compactStats()
    }
    this.maybeIngest()
  }

  _saveExposure(expo) {
    this.exposures.push(expo)
    this.maybeIngest()
  }

  async publish(objs) {
    if (!Array.isArray(objs)) {
      logger('The "publish" method takes an array of objects (aka entities).')
      return
    }

    objs.forEach(obj => {
      this._identifyObject(obj)
    })

    await this.maybeIngest(true)
  }

  getContent(url, timeout = REQUEST_TIMEOUT) {
    return new Promise((resolve, reject) => {
      const urlObj = URL.parse(url)

      const lib = urlObj.protocol === 'https:' ? https : http

      const request = lib.get(url, response => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject('Failed to load page, status code: ' + response.statusCode)
        }
        const body = []

        response.on('data', chunk => body.push(chunk))

        response.on('end', () => {
          resolve(body.join(''))
        })
      })

      request.on('error', err => reject(err))

      request.setTimeout(timeout, () => {
        request.abort()
        reject('Request timed out')
      })
    })
  }

  postContent(
    url,
    data,
    contentType = 'application/json',
    timeout = REQUEST_TIMEOUT
  ) {
    return new Promise((resolve, reject) => {
      const urlObj = URL.parse(url)

      const lib = urlObj.protocol === 'https:' ? https : http

      const options = {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.path,
        method: 'POST',
        headers: {
          'Content-Type': contentType,
          'Content-Length': Buffer.byteLength(data)
        }
      }
      const request = lib.request(options, response => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject('Failed to post to url, status code: ' + response.statusCode)
        }

        const body = []

        response.on('data', chunk => body.push(chunk))

        response.on('end', () => resolve(body.join('')))
      })

      request.on('error', err => {
        reject(err)
      })

      request.setTimeout(timeout, () => {
        request.abort()
        reject('Request timed out')
      })

      request.write(data)
      request.end()
    })
  }

  async _getGatingInfo() {
    const body = await this.getContent(
      `${this.primaryServerUrl}${GATING_INFO_ENDPOINT}/${
        this.envKey
      }?casing=camel`
    )
    return JSON.parse(body)
  }

  async _getBackupGatingInfo() {
    const body = await this.getContent(
      `${BACKUP_GATING_INFO_ENDPOINT}/${this.envKey}-camel`
    )
    return JSON.parse(body)
  }

  updateSDK() {
    const ingestionMaxItems = this.router.getIngestionMaxItem()
    const browserIngestionMaxItems = this.router.getBrowserIngestionMaxItems()
    const ingestionInterval = this.router.getIngestionInterval()
    const browserIngestionInterval = this.router.getBrowserIngestionInterval()
    const shouldIngestObjects = this.router.getShouldIngestObjects()
    const shouldIngestStats = this.router.getShouldIngestStats()
    const shouldIngestExposures = this.router.getShouldIngestExposures()
    const shouldIngestFlags = this.router.getShouldIngestFlags()

    // eslint-disable-next-line no-undef
    if (__BROWSER__) {
      // Use SDK info's browserIngestionMaxItems threshold instead (if it exists)
      if (
        typeof browserIngestionMaxItems === 'number' &&
        browserIngestionMaxItems > 0
      ) {
        this.ingestionMaxItems = browserIngestionMaxItems
        this.restartIngestionWorker()
      }

      // Use SDK info's ingestionInterval instead (if it exists)
      if (
        typeof browserIngestionInterval === 'number' &&
        browserIngestionInterval > 0 &&
        browserIngestionInterval != this.ingestionInterval
      ) {
        this.ingestionInterval = browserIngestionInterval
        this.restartIngestionWorker()
      }
    } else {
      // Use SDK info's ingestionMaxItem threshold instead (if it exists)
      if (typeof ingestionMaxItems === 'number' && ingestionMaxItems > 0) {
        this.ingestionMaxItems = ingestionMaxItems
        this.restartIngestionWorker()
      }

      // Use SDK info's ingestionInterval instead (if it exists)
      if (
        typeof ingestionInterval === 'number' &&
        ingestionInterval > 0 &&
        ingestionInterval != this.ingestionInterval
      ) {
        this.ingestionInterval = ingestionInterval
        this.restartIngestionWorker()
      }
    }

    // Check if SDK info directs SDK to ingest entities
    if (typeof shouldIngestObjects === 'boolean') {
      this.shouldIngestObjects = shouldIngestObjects
    }

    // Check if SDK info directs SDK to ingest stats
    if (typeof shouldIngestStats === 'boolean') {
      this.shouldIngestStats = shouldIngestStats
    }

    // Check if SDK info directs SDK to ingest exposures
    if (typeof shouldIngestExposures === 'boolean') {
      this.shouldIngestExposures = shouldIngestExposures
    }

    // Check if SDK info directs SDK to ingest flags
    if (typeof shouldIngestFlags === 'boolean') {
      this.shouldIngestFlags = shouldIngestFlags
    }
  }

  async updateGatingInfo(statName, fetchFn) {
    try {
      const stat = new Stat(statName, Stat.TYPE_DURATION)
      stat.start()
      const result = await fetchFn()
      const gatingInfo = result
      this.router = new Router(gatingInfo)
      this.updateSDK()
      if (this.gatingInfoListener) {
        this.gatingInfoListener(gatingInfo)
      }
      stat.stop()
      this._saveStat(stat)
    } catch (err) {
      logger(err)

      return false
    }
    return true
  }

  async configure(
    envKey,
    subscribeToUpdates = true,
    apiDomain = DEFAULT_API_DOMAIN
  ) {
    const envKeyRegex = /^[a-z0-9]{16}$/
    if (!envKey.match(envKeyRegex)) {
      throw 'options["envKey"] should be a string of lowercase characters and digits. Double check on the Airship web app.'
    }

    this.envKey = envKey
    this.subscribeToUpdates = subscribeToUpdates

    this.primaryServerUrl = `https://api.${apiDomain}`
    this.sseServerUrl = `https://sse.${apiDomain}`

    this.init()

    this.failed = false

    // First try the Airship server
    if (
      !(await this.updateGatingInfo(
        'duration__gating_info',
        this._getGatingInfo.bind(this)
      ))
    ) {
      // Then try the Airship CloudFront distribution
      this.failed = !(await this.updateGatingInfo(
        'duration__cloudfront_gating_info',
        this._getBackupGatingInfo.bind(this)
      ))
    }

    if (this.failed) {
      throw 'Failed to retrieve initial gating information'
    }

    if (subscribeToUpdates) {
      this._subscribeToUpdates()
      this._policeSSE()
    }
  }

  async shutdown() {
    if (this.ingestionWorker) {
      clearInterval(this.ingestionWorker)
    }

    this._unpoliceSSE()
    this._unsubscribeFromUpdates()

    await this.maybeIngest(true)
  }

  flag(flagName) {
    const flag = Environment.prototype.flag.call(this, flagName)
    if (flag.isWild()) {
      // Register the new uncategorized flag
      if (!this.oldFlags.has(flagName)) {
        this.flags.add(flagName)
        this.maybeIngest()
      }
    }
    return flag
  }

  _policeSSE() {
    this._unpoliceSSE()
    this.policeSSEInterval = setInterval(() => {
      const now = Date.now()
      const then = this.lastSSEConnectTimestamp || 0
      if ((now - then) / 1000 > 30) {
        logger(
          'Did not receive a keepalive for more than 30 seconds. Reconnecting.'
        )
        this._subscribeToUpdates()
      }
    }, 5 * 1000)

    this.pollGatingInfoInterval = setInterval(() => {
      const now = Date.now()
      const then = this.lastSSEConnectTimestamp || 0
      if ((now - then) / 1000 > 60) {
        logger(
          'Did not receive a keepalive for more than 30 seconds. Polling gating info.'
        )
        this.updateGatingInfo(
          'duration__cloudfront_gating_info',
          this._getBackupGatingInfo.bind(this)
        ).then(
          () => logger('Polled gating info from CloudFront'),
          () => logger('Failed polling gating info from CloudFront')
        )
      }
    }, 60 * 1000)
  }

  _unpoliceSSE() {
    if (this.policeSSEInterval) {
      clearInterval(this.policeSSEInterval)
      delete this.policeSSEInterval

      if (this.lastSSEConnectTimestamp) {
        delete this.lastSSEConnectTimestamp
      }
    }

    if (this.pollGatingInfoInterval) {
      clearInterval(this.pollGatingInfoInterval)
      delete this.pollGatingInfoInterval
    }
  }

  _subscribeToUpdates() {
    this._unsubscribeFromUpdates()

    this.eventSource = new EventSource(
      `${this.sseServerUrl}${SSE_GATING_INFO_ENDPOINT}?envkey=${
        this.envKey
      }&casing=camel`
    )
    this.eventSource.addEventListener('gatingInfoUpdate', evt => {
      const gatingInfo = JSON.parse(evt.data)
      this.router = new Router(gatingInfo)
      this.updateSDK()
      if (this.gatingInfoListener) {
        this.gatingInfoListener(gatingInfo)
      }
      this.lastSSEConnectTimestamp = Date.now()
    })

    this.eventSource.addEventListener('keepalive', () => {
      this.lastSSEConnectTimestamp = Date.now()
    })
  }

  _unsubscribeFromUpdates() {
    if (this.eventSource) {
      this.eventSource.close()
      delete this.eventSource
    }
  }
}
