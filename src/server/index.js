import initApp from './app/init_server';
import config from '../../config';

initApp(config)
  .then(app => console.log(`todo serv started on ${app.url}`))
  .catch(console.error)
