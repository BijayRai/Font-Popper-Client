'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// const tokenUtils = require('../utils/serverUtilsTokens')
var tokenUtils = require('../serverCompiled/serverUtilsTokens');
// const tokenUtils = require('../serverMiddleware/serverUtilsTokens')
/*
 * This middleware attaches USER to the req if a user is present
 * from a token refresh
 */










exports.tokenRefreshCheck = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {var jwt, expired, newTokens;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            console.log('REFRESH CHECK in EXPRESS');

            // Check for cookies coming from browser
            // console.log('req cookies from token ctrl')

            jwt = tokenUtils.extractJWTFromCookieParser(req.cookies);
            // console.log('JWT - tokenUtils')
            // console.log(jwt)
            if (
            jwt) {_context.next = 6;break;}
            console.log('no token found next.js server');
            next();return _context.abrupt('return');case 6:



            expired = tokenUtils.isExpired(jwt);if (

            expired) {_context.next = 11;break;}
            console.log('jwt found but not expired');
            next();return _context.abrupt('return');case 11:



            console.log('token expired on next js server');

            // // refresh token
            _context.next = 14;return tokenUtils.getNewTokens(req.headers.cookie);case 14:newTokens = _context.sent;

            // Check for new tokens coming from API
            // console.log('new tokens')
            // console.log(newTokens)
            if (newTokens) {
              newTokens.map(function (token) {return res.append('Set-Cookie', token);});
            }
            next();case 17:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}();