const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware')

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

  server.get('/profile/:id', (req, res) => {
    const { id } = req.params
    if (['about-me', 'education', 'experience'].includes('id')) {
      return app.render(req, res, `/profile/${id}`)
    }
    return app.render(req, res, '/profile', { id })
  });

  server.get('/jobs/:id', (req, res) => {
    const { id } = req.params
    return app.render(req, res, '/jobs', { id })
  });

  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
