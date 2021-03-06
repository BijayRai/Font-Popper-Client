// @flow

import jwtDecode from 'jwt-decode'
import moment from 'moment'
import {
  logUserOut,
  refreshTokenAction,
  logOut,
  saveUserToRedux
} from '../actions/authActions'

import type { User, UserFiltered } from '../flowTypes/User'
import type { DispatchAction, ReduxStore } from '../flowTypes/redux'

type voidString = string | void
type voidStringArray = string[] | void
type serverCookies = string[] | void
/**
 * unsetToken()
 * - Adds logout timestamp to localstorage to trigger event accross tabs
 *
 */
export const unsetToken = () => {
  if (!process.browser) {
    return
  }
  // window.localStorage.removeItem('token')
  // window.localStorage.removeItem('user')
  // Cookie.remove('jwt')

  window.localStorage.setItem('logout', Date.now())
}
const stringSplit = (jwtToken: string | void, splitter: string): voidString => {
  console.log('jwtToken', jwtToken)

  if (!jwtToken) return undefined
  return jwtToken
    .split(splitter)[1]
}

const findKey = (jwtToken: string, key: string) => {
  if (!jwtToken) return undefined
  return jwtToken.split(';').find(c => c.trim().startsWith(`${key}=`))
}

/**
 * getTokenFromCookie(arg)
 *
 * @param {Object} request - from Server-side
 * @returns {Object} undefined
 * @returns {string} jwt-token
 */
export const getTokenFromCookie = (request: any): voidString => {
  if (!request.headers.cookie) {
    return undefined
  }

  const jwtCookie: string = request.headers.cookie

  return stringSplit(findKey(jwtCookie, 'jwt'), '=')
}

/**
 * getTokenFromCookieRes(arg) - used specifically for RESPONSE cookies on SSR next.js
 *
 * @param {Array} cookies - from Server-side
 * @returns {string} jwt-token || undefined
 */
export const getTokenFromCookieRes = (cookies: serverCookies): voidString => {
  console.log('find error')
  console.log(cookies)

  if (!cookies) {
    return undefined
  }
  console.log('step1')

  console.log(cookies[0])
  console.log('step2')

  return stringSplit(findKey(cookies[0], 'jwt'), '=')
}

/**
 * getCookiesFromServerResponse(arg)
 * - Helper hack to get cookies from headers on Next.js Server response
 *
 * @param {Object} ctxHeaders - from Server-side
 * @returns {String} cookies
 */
export const getCookiesFromServerResponse = (ctxHeaders: any): voidStringArray => {
  if (!ctxHeaders) return undefined

  // const resCookies = ctxHeaders['set-cookie']
  return ctxHeaders['set-cookie']
}

/**
 * findTokenToDecode(headers, req)
 * - Next.js Server-side func to first look for new token being sent from API
 * - If none is found on RES, use req headers
 *
 * @param {Object} ctxHeaders - from Server-side
 * @param {Object} ctxReq - from Server-side
 * @returns {String} Cookie Token
 */
export const findTokenToDecode = (ctxHeaders: any, ctxReq: any): voidString => {
  const cookies: voidStringArray = getCookiesFromServerResponse(ctxHeaders)

  if (cookies) {
    console.log('has new user')
    return getTokenFromCookieRes(cookies)
  } else {
    console.log('no new user, use original token if there is one')
    return getTokenFromCookie(ctxReq)
  }
}

/**
 * convertResCookiesToString(cookies)
 * - Next.js Server-side func to convert Cookie from Response API
 *
 * @param {Array} cookies - from Server-side
 * @returns {String} Cookie Token
 */
export const convertResCookiesToString = (cookies: any): string => {
  const cookiesArray: string[] = []

  const jwtString: voidString = stringSplit(findKey(cookies[0], 'jwt'), '=')
  const jwt = 'jwt=' + String(jwtString)

  const csrfString: voidString = stringSplit(findKey(cookies[1], '_CSRF'), '=')
  const csrf = '_CSRF=' + String(csrfString)

  cookiesArray.push(jwt, csrf)
  return cookiesArray.toString().replace(',', '; ')
}

/**
 * findCookies(ctxHeaders, ctxReq)
 * - Next.js Server-side func to first look for new token being sent from API
 * - This helps the Validate Server Token function looking for cookies server-side
 *
 * @param {Object} ctxHeaders - from Server-side
 * @param {Object} ctxReq - from Server-side
 * @returns {String} JWT - Token
 */
export const findCookies = (ctxHeaders: any, ctxReq: any): voidString => {
  if (!ctxReq) {
    return undefined
  }

  if (!ctxHeaders) {
    return ctxReq.headers.cookie
  }

  const cookies: voidStringArray = getCookiesFromServerResponse(ctxHeaders)

  if (cookies) {
    console.log('has new cookies')
    return convertResCookiesToString(cookies)
  } else {
    console.log('use old cookies')
    return ctxReq.headers.cookie
  }
}

export const filterUserKeys = (user: User): UserFiltered => {
  const allowedKeys = ['name', 'email', 'exp', 'sub']
  const foundKeys: string[] = Object.keys(user).filter((key) => allowedKeys.includes(key))
  return foundKeys.reduce((obj: UserFiltered, key: any) => {
    return {
      ...obj,
      [key]: user[key]
    }
  }, {})
}

/**
 * getUserFromJWT(arg)
 * - Filter out sensitive info when the token is decoded before adding to redux
 *
 * @param {String} token
 * @returns {Object}
 *
 */
export const getUserFromJWT = (token: string | void): UserFiltered | void => {
  if (!token) {
    return undefined
  }

  const tokenDecoded: User = jwtDecode(token)

  // return jwtDecode(token)
  return filterUserKeys(tokenDecoded)
}

/**
 * isUserExpired(user)
 *
 * @param {Object} user
 * @returns {Boolean}
 *
 */
export const isUserExpired = (user: User): boolean => {
  if (user.exp) {
    let expired: boolean = false
    const currentTime: number = moment().unix()
    if (user.exp) {
      expired = user.exp < currentTime // because time goes up
    }

    if (expired) {
      return true
    }
  }

  return false
}

/**
 * validateUserTokenClient(store, user)
 *
 * @param {Object} store
 * @param {Object} user
 * @returns {Object} {Dispatch Action: logOut}
 * @returns {Object} {Dispatch Action: logUserOut}
 * @returns {Object} {Dispatch Action: refreshToken}
 * @returns {Object} {Dispatch Action: saveUserToRedux}
 */
export const validateUserTokenClient = async (store: ReduxStore, user: User): DispatchAction => {
  console.log('validateUser-Client')
  if (!user) {
    return store.dispatch(logUserOut())
  }

  // if expired log user out
  if (isUserExpired(user)) {
    console.log('user is expired')
    try {
      return await store.dispatch(refreshTokenAction(user))
    } catch (e) {
      console.log('refresh token error')
    }
  }
}

/**
 * validateUserTokenServer(store, user, cookie)
 *
 * @param {Object} store
 * @param {Object} user
 * @param {Object} cookies
 * @returns {Object} {Dispatch Action: logOut}
 * @returns {Object} {Dispatch Action: logUserOut} (expired)
 * @returns {Object} {Dispatch Action: saveUserToRedux}
 */
export const validateUserTokenServer = async (store: ReduxStore, user: UserFiltered | void, cookies?: string): DispatchAction => {
  /*
   * find cookies on browser(jwt)
   * find user from token and pass user in to this function from getInitialProps on HOC
   * - if there is no user(undefined) - dispatch logout
   * - if there is a new user
   * - return new user to save to redux
   * - return old user to save to redux
   */
  console.log('validateUser-Server', user)

  if (!user) {
    return store.dispatch(logOut())
  }

  /*
   Save user from token
   */
  console.log('save user')

  // example of getting more USER meta data
  // Than what is just given to us from the JWT
  // await store.dispatch(getUserHearts(cookies))
  return store.dispatch(saveUserToRedux(user))
}
