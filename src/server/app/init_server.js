import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import initApi from './api/init_api';

const getUrl = (server) => `http://${server.address().address}:${server.address().port}`;
const initApp = (config = {}) => {
  const { publicPath, buildPath, server } = config;
  const app = express();
  const httpServer = http.createServer(app);
  const promise = new Promise((resolve) => {
    app
      .use(compression())
      .use(bodyParser.json())
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .use(morgan('dev'))
      .use('/api', initApi(app))
      .use('/public', express.static(publicPath))
      .use('/build', express.static(buildPath))
      .use((req, res) => {
        res.redirect('/public/index.html');
      })

    httpServer.listen(server.port, server.host, () => {
      app.config = config;
      app.url = getUrl(httpServer);
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
