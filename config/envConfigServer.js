// @flow
/*
 https://testone.now.sh/api = myapi.nw.sh/api
 because of this translation - the routes on the API need to be looking for /api/__route__
 Since Now does it this way - in order to have our app ready for Prod deployment, adding api on the end of
 localHost:3000/api -> translates to http://localhost:7777 due to http-proxy - so now our original /api/__route__
 will still work in both Dev and Production
 */
const prod = process.env.NODE_ENV
const config = require('./config.json')
let URL
if (prod === 'production') {
  URL = config.PROD_URL
} else if (prod === 'test') {
  URL = config.TEST_URL
} else {
  URL = config.DEV_URL
}

const env = {
  BACKEND_URL: URL,
  WEBSITE_TITLE: 'Now Thats Delicious!',
  REFRESH_WINDOW: config.REFRESH_WINDOW,
  TAGS: ['Wifi', 'Open Late', 'Family Friendly', 'Vegetarian', 'Licensed']
}

exports.envConfig = env
