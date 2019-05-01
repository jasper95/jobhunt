const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware')
const path = require('path')

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || 8000;
const ROOT_URL = dev ? `http://localhost:${port}` : 'https://mydomain.com';

const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();
  server.use(proxy('/api', {
    target: process.env.API_URL,
    pathRewrite: { '^/api': '/' },
    changeOrigin: true
  }))

  server.get('/service-worker.js', (req, res) => {
    const swPath = path.join(process.cwd(), '.next', 'service-worker.js')
    app.serveStatic(req, res, swPath)
  })

  server.get('/user/:id', (req, res) => {
    const { id } = req.params
    return app.render(req, res, '/user', { id })
  });

  server.get('/company/:id', (req, res) => {
    const { id } = req.params
    return app.render(req, res, '/company', { id })
  });

  server.get('/jobs/:id', (req, res) => {
    const { id } = req.params
    return app.render(req, res, '/jobs', { id })
  });

  server.get('/confirm', (req, res) => {
    const { user_id } = req.query
    return app.render(req, res, '/login', { user_id })
  })

  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
