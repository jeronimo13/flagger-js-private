const NS_PER_SEC = 1e9

export default class Stat {
  static compactStats(stats) {
    const groups = stats.reduce((groups, stat) => {
      const key = [stat.name, stat.type].join(',')
      groups[key] = groups[key] || []
      groups[key].push(stat)
      return groups
    }, {})

    return Object.values(groups).map(stats => {
      const newStat = new Stat(stats[0].name, stats[0].type)
      let totalDuration, totalCount
      switch (newStat.type) {
        case Stat.TYPE_DURATION:
          totalDuration = stats.reduce(
            (duration, stat) => duration + stat.averageDuration * stat.count,
            0
          )
          totalCount = stats.reduce((count, stat) => count + stat.count, 0)
          newStat.setAverageDuration(totalDuration / totalCount)
          newStat.setCount(totalCount)
          break
        case Stat.TYPE_COUNT:
          newStat.setCount(stats.reduce((count, stat) => count + stat.count, 0))
          break
      }
      return newStat
    })
  }

  constructor(name, type) {
    const allowedTypes = [Stat.TYPE_DURATION, Stat.TYPE_COUNT]
    if (allowedTypes.indexOf(type) === -1) {
      throw 'Invalid stat type passed'
    }
    this.name = name
    this.type = type

    this.count = 0
    this.startTime = null

    this.averageDuration = 0
  }

  start() {
    return this
  }

  stop() {
    return this
  }

  setCount(n) {
    this.count = n
    return this
  }

  setAverageDuration(t) {
    this.averageDuration = t
    return this
  }

  getDuration() {
    return this.averageDuration
  }

  getStatsObj() {
    const statsObj = {
      name: this.name
    }
    if (this.type === Stat.TYPE_DURATION) {
      if (this.averageDuration !== 0) {
        statsObj.duration = this.averageDuration
        statsObj.unit = 'ns'
        statsObj.count = this.count
        return statsObj
      }
    } else if (this.type === Stat.TYPE_COUNT) {
      statsObj.count = this.count
      return statsObj
    }
    return null
  }
}

Stat.TYPE_DURATION = 'stat_type__duration'
Stat.TYPE_COUNT = 'stat_type__count'
