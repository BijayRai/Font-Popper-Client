'use strict';var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var jwtDecode = require('jwt-decode');
var moment = require('moment');
var fetch = require('isomorphic-unfetch');
var config = require('../config/envConfigServer');

// type voidString = string | void














/**
 * extractJWTFromCookieParser(arg)
 *
 * @param {Object} cookies - server cookies array
 * @returns {String} undefined
 * @returns {String} cookie string
 */
exports.extractJWTFromCookieParser = function (cookies) {
  // console.log('cookies - extractJWTFromCookieParser')
  // console.log(cookies)

  if (!cookies.jwt) {
    return undefined;
  }
  // const jwt = cookies.jwt
  return jwtDecode(cookies.jwt);
};

/**
    * extractUserFromJwt(arg)
    *
    * @param {String} jwt string
    * @returns {String} undefined
    * @returns {String} cookie string
    */
// NOT CURRENTLY USED
exports.extractUserFromJwt = function (jwt) {
  var jwtDecoded = jwtDecode(jwt);
  return {
    email: jwtDecoded.email,
    name: jwtDecoded.name,
    exp: jwtDecoded.exp };

};

exports.isExpired = function (token) {
  var currentTime = moment().unix();
  // const expired = token.exp < currentTime
  // console.log('is expired? ', expired)

  return token.exp < currentTime; // because time goes up
};

exports.getNewTokens = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(cookies) {var response, responseCookies;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              fetch(config.envConfig.BACKEND_URL + '/api/refresh', {
                method: 'GET',
                headers: {
                  cookie: cookies },

                credentials: 'include' // here's the magical line that fixed everything
              }));case 2:response = _context.sent;
            // check full response from the API request
            // console.log('fetch response')
            // console.log(JSON.stringify(response, null, 2))

            // Split up header to return object hack
            responseCookies = response.headers;return _context.abrupt('return',
            responseCookies._headers['set-cookie']);case 5:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x) {return _ref.apply(this, arguments);};}();


exports.resetCheck = function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resetToken) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:return _context2.abrupt('return',
            fetch(config.envConfig.BACKEND_URL + '/api/account/resetCheck', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json' },

              credentials: 'include', // Don't forget to specify this if you need cookies
              body: (0, _stringify2.default)({ resetToken: resetToken }) }));case 1:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function (_x2) {return _ref2.apply(this, arguments);};}();



exports.confirmCheck = function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(validationToken) {var response, responseCookies;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
              fetch(
              config.envConfig.BACKEND_URL + '/api/account/confirm',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' },

                credentials: 'include', // Don't forget to specify this if you need cookies
                body: (0, _stringify2.default)({ token: validationToken }) }));case 2:response = _context3.sent;



            responseCookies = response.headers;if (!

            responseCookies) {_context3.next = 6;break;}return _context3.abrupt('return',
            responseCookies._headers['set-cookie']);case 6:return _context3.abrupt('return',


            response);case 7:case 'end':return _context3.stop();}}}, _callee3, undefined);}));return function (_x3) {return _ref3.apply(this, arguments);};}();


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