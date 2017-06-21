const tokenCtrl = require('../serverMiddleware/tokenCtrl')
const port = process.env.PORT || 3000
const tokenUtils = require('../utils/serverUtilsTokens')
const querystring = require('querystring')

exports.routes = (expressServer, app, handle) => {
  // I think TOP level pages dont need a link
  // Unless it needs to have a token refresh check on it
  expressServer.get('/moment', tokenCtrl.tokenRefreshCheck, (req, res) => {
    return app.render(req, res, '/moment', req.query)
  })
  //
  // expressServer.get('/hidden', tokenCtrl.tokenRefreshCheck, (req, res) => {
  //   return app.render(req, res, '/hidden', req.query)
  // })

  expressServer.get('/account/confirm/:token*?', async (req, res) => {
    const validationToken = req.params.token

    req.query = {
      token: validationToken
    }

    if (!validationToken) {
      return res.redirect('/register')
    }

    // Confirm check should validate token, remove validation objects in DB, and change valid to TRUE
    const response = await tokenUtils.confirmCheck(validationToken)

    if (response.status === 422) {
      const query = querystring.stringify({
        error: true
      })
      return res.redirect('/register?' + query)
    }

    if (Array.isArray(response)) {
      response.map(token => res.append('Set-Cookie', token))
      return res.redirect('/hidden')
    }

    return res.redirect('/register')
  })

  expressServer.get('/account/reset/:token*?', async (req, res) => {
    const resetToken = req.params.token

    req.query = {
      token: resetToken
    }

    if (!resetToken) {
      return res.redirect('/login')
    }

    // CHeck token status of reset exp in DB
    const response = await tokenUtils.resetCheck(resetToken)

    if (response.status === 422) {
      const query = querystring.stringify({
        error: true
      })
      return res.redirect('/login?' + query)
    }

    return app.render(req, res, '/auth/passwordReset', req.query)
  })

  expressServer.get('/account', tokenCtrl.tokenRefreshCheck, (req, res) => {
    return app.render(req, res, '/auth/account', req.query)
  })

  expressServer.get('/confirm', (req, res) => {
    return app.render(req, res, '/auth/confirmRegistration', req.query)
  })

  // NEXT ROUTE EXAMPLE BELOW
  // page path in app is: /pages/store
  // filename is: edit.js
  // routes.add('edit', '/store/:id/edit', 'store/edit')
  expressServer.get('/login?', (req, res) => {
    return app.render(req, res, '/auth/login', req.query)
  })

  expressServer.get('/logout', (req, res) => {
    return app.render(req, res, '/auth/logout', req.query)
  })

  expressServer.get('/register', (req, res) => {
    return app.render(req, res, '/auth/register', req.query)
  })

  expressServer.get('*', (req, res) => {
    return handle(req, res)
  })

  expressServer.listen(port, err => {
    if (err) throw err
    console.log('> Ready on: ' + port + ' using express')
  })
}
