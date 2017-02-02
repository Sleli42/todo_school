import express from 'express';
import http from 'http';
import R from 'ramda';
import cookieParser from 'cookie-parser'
import uuid from 'uuid';
// import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import socketIO from 'socket.io';
// import favicon from 'serve-favicon';
import initApi from './api/init_api';
import { error } from './middleware';
import Connector from './connector';

const getUrl = server => `http://${server.address().address}:${server.address().port}`;
const initApp = (config = {}, models) => {
  const { publicPath, buildPath, server } = config;
  const app = express();
  const httpServer = http.createServer(app);
  const io = socketIO(httpServer);
  app.connector = new Connector(models, io);

  const session = (req, res, next) => {
    let id = R.path(['cookies', 'todoAppId'], req);
    console.log('id:', id);
    if (!id) {
      id = uuid.v4();
      res.cookie('todoAppId', id);
    }
    req.user = { id };
    next();
  };

  const promise = new Promise((resolve) => {
    app
      .use(compression())
      .use(cookieParser())
      .use(session)
      .use(bodyParser.json())
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .use('/sessions', (req, res) => {
        const ids = R.compose(R.pluck('id'), R.values)(app.connector.users);
        res.json(ids);
      })
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
