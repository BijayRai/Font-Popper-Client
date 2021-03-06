// @flow
import type { UserFiltered } from '../flowTypes/User'

const jwtDecode = require('jwt-decode')
const moment = require('moment')
const fetch = require('isomorphic-unfetch')
const config = require('../config/envConfigServer')

// type voidString = string | void
type CookiesFromServer = {
  [string]: any
}

type Jwt = {
  sub: number,
  email: string,
  name: string,
  csrf: string,
  rfs: string,
  exp: number,
  iat: string
}

/**
 * extractJWTFromCookieParser(arg)
 *
 * @param {Object} cookies - server cookies array
 * @returns {String} undefined
 * @returns {String} cookie string
 */
exports.extractJWTFromCookieParser = (cookies: CookiesFromServer): Jwt | void => {
  console.log('Spencer compiled')

  // console.log('cookies - extractJWTFromCookieParser')
  // console.log(cookies)

  if (!cookies.jwt) {
    return undefined
  }
  // const jwt = cookies.jwt
  return jwtDecode(cookies.jwt)
}

/**
 * extractUserFromJwt(arg)
 *
 * @param {String} jwt string
 * @returns {String} undefined
 * @returns {String} cookie string
 */
// NOT CURRENTLY USED
exports.extractUserFromJwt = (jwt: string): UserFiltered => {
  const jwtDecoded = jwtDecode(jwt)
  return {
    email: jwtDecoded.email,
    name: jwtDecoded.name,
    exp: jwtDecoded.exp
  }
}

exports.isExpired = (token: Jwt): boolean => {
  const currentTime = moment().unix()
  // const expired = token.exp < currentTime
  // console.log('is expired? ', expired)

  return token.exp < currentTime // because time goes up
}

exports.getNewTokens = async (cookies: string[]): Promise<string[]> => {
  const response = await fetch(`${config.envConfig.BACKEND_URL}/api/refresh`, {
    method: 'GET',
    headers: {
      cookie: cookies
    },
    credentials: 'include' // here's the magical line that fixed everything
  })
  // check full response from the API request
  // console.log('fetch response')
  // console.log(JSON.stringify(response, null, 2))

  // Split up header to return object hack
  const responseCookies = response.headers
  return responseCookies._headers['set-cookie']
}

exports.resetCheck = async (resetToken: string): Promise<any> => {
  return fetch(`${config.envConfig.BACKEND_URL}/api/account/resetCheck`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({ resetToken: resetToken })
  })
}

// USED FOR EMAIL CHECK PROCESS
exports.confirmCheck = async (validationToken: string): Promise<any> => {
  const response = await fetch(
    `${config.envConfig.BACKEND_URL}/api/account/confirm`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Don't forget to specify this if you need cookies
      body: JSON.stringify({ token: validationToken })
    }
  )

  const responseCookies = response.headers

  if (responseCookies) {
    return responseCookies._headers['set-cookie']
  }

  return response
}

// exports.getJwtFromCookie = cookie => {
//   console.log('cookie from String Split', cookie)
//
//   return stringSplit(findKey(cookie, 'jwt'), '=')
//   // return cookie.split(';').find(c => c.trim().startsWith('jwt=')).split('=')[1]
// }
//
// exports.checkTokenRefreshTime = token => {
//   if (!token) {
//     return
//   }
//   // console.log('config')
//   // console.log(config.REFRESH_WINDOW)
//
//   // IS THIS SETUP ELSEWHERE?
//   const currentTime = moment().unix()
//   const refreshWindow = config.envConfig.REFRESH_WINDOW // min
//   const duration = token.exp - currentTime
//   const timeLeft = moment.duration(duration * 1000, 'milliseconds')
//   const minLeft = moment.duration(timeLeft).minutes()
//
//   console.log('min left until exp')
//   console.log(minLeft)
//
//   if (minLeft < refreshWindow && minLeft >= 0) {
//     console.log('does token need refresh?')
//     console.log('true')
//
//     return true
//   }
//
//   return false
// }
