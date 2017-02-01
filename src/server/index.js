import initApp from './app/init_server';
import config from '../../config';
import models from './models';

initApp(config, models)
  .then(app => console.log(`todo serv started on ${app.url}`))
  .catch(console.error)
