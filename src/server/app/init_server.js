import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import initApi from './api/init_api';
import { error } from './middleware';
import Connector from './connector'

const getUrl = (server) => `http://${server.address().address}:${server.address().port}`;
const initApp = (config = {}, models) => {
  const { publicPath, buildPath, server } = config;
  const app = express();
  const httpServer = http.createServer(app);
  // console.log('models:', models.todos);
  // models.todos.on('add', () => console.log('todo as been added'));
  // models.todos.on('add', () => console.log('todo as been a'));
  app.connector = new Connector(models);
  const promise = new Promise((resolve) => {
    app
      .use(compression())
      .use(bodyParser.json())
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .use(morgan('dev'))
      .use('/api', initApi(app, models))
      .use('/public', express.static(publicPath))
      .use('/build', express.static(buildPath))
      .use((req, res) => {
        res.redirect('/public/index.html');
      })
      .use(error);

    httpServer.listen(server.port, server.host, () => {
      app.config = config;
      app.url = getUrl(httpServer);
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
