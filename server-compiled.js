'use strict';var express = require('express');
var httpProxy = require('http-proxy');
var cookieParser = require('cookie-parser');
var router = require('./routes/index');
// const compression = require('compression'); // for production tests

var next = require('next');
var bodyParser = require('body-parser'); // turns the body into json object

// ENV SETUP
var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });
var handle = app.getRequestHandler();
var prod = process.env.NODE_ENV === 'production';
var expressServer = express();

if (prod) {
  /*
             Production Setup with express
             */


  app.prepare().then(function () {
    expressServer.use(cookieParser());
    // allows us to send json to our express app
    expressServer.use(bodyParser.json());

    router.routes(expressServer, app, handle);
  });
} else {
  /*
          Reverse Proxy Setup for Dev with express
          */


  var apiProxy = httpProxy.createProxyServer({ changeOrigin: true });

  app.prepare().then(function () {
    // expressServer.use('/api', (req, res) => {
    //   apiProxy.web(req, res, { target: 'http://localhost:7777' })
    // })
    expressServer.use(cookieParser());
    expressServer.use('/api/**', function (req, res) {
      apiProxy.web(req, res, {
        target: 'http://localhost:7777/' + req.params[0] });

    });

    expressServer.use(bodyParser.json());

    router.routes(expressServer, app, handle);
  });
}
