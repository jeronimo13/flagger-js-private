const https = require('https')

const httpsRequestPromise = async options => {
  const {data, ...params} = options
  return new Promise((resolve, reject) => {
    const req = https
      .request(params, res => {
        var body = ''
        res.on('data', chunk => {
          body += chunk
        })
        res.on('end', () => {
          const json = JSON.parse(body)
          resolve(json)
        })
      })
      .on('error', error => {
        reject(error)
      })
    req.write(data)
    req.end()
  })
}

export {httpsRequestPromise}
