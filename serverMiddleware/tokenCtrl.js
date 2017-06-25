// @flow
/**
 * FLow wont pick up unless we use the non-compiled version so uncomment it
 * So we aren't using babel-node in production
 */
const tokenUtils = require('../serverCompiled/serverUtilsTokens')
// const tokenUtils = require('../serverMiddleware/serverUtilsTokens')

/*
 * This middleware attaches USER to the req if a user is present
 * from a token refresh
 */
type Jwt = {
  sub: number,
  email: string,
  name: string,
  csrf: string,
  rfs: string,
  exp: number,
  iat: string
}

exports.tokenRefreshCheck = async (req: any, res: any, next: any) => {
  console.log('REFRESH CHECK in EXPRESS')

  // Check for cookies coming from browser
  // console.log('req cookies from token ctrl')

  const jwt: Jwt | void = tokenUtils.extractJWTFromCookieParser(req.cookies)
  // console.log('JWT - tokenUtils')
  // console.log(jwt)

  if (!jwt) {
    console.log('no token found next.js server')
    next()
    return
  }

  const expired = tokenUtils.isExpired(jwt)

  if (!expired) {
    console.log('jwt found but not expired')
    next()
    return
  }

  console.log('token expired on next js server')

  // // refresh token
  const newTokens: string[] = await tokenUtils.getNewTokens(req.headers.cookie)

  // Check for new tokens coming from API
  // console.log('new tokens')
  // console.log(newTokens)
  if (newTokens) {
    newTokens.map(token => res.append('Set-Cookie', token))
  }
  next()
}
