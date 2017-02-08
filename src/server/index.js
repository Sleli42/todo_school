import initApp from './app';
import config from '../../config';
import initDb from './db';

Promise.all([initApp(config), initDb(config)])
  .then(([app, { db }]) => {
    db.on('error', console.error);
    console.log(`todo serv started on ${app.url}`);
  })
  .catch(console.error);
