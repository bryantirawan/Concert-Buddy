const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  
  require('dotenv').config()

  const apiUrl = process.env.API_URL
  const apiToken = process.env.API_Key
  const headers  = {
    "x-api-key": `${apiToken}`,
    "Accept": "application/json"
  }

  // define http-proxy-middleware
  let setlistProxy = proxy({
    target: apiUrl,
    headers: headers,
  })

  // define the route and map the proxy
  app.use('/selectconcert', setlistProxy)

};