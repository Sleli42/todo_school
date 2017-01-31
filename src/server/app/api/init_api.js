import express from 'express';
import initTodos from './todo';
import initTasks from './task';

const init = (ctx) => {
  const app = express();
  app.use('/todos', initTodos(ctx));
  app.use('/tasks', initTasks(ctx));
  return app;
};

export default init;
