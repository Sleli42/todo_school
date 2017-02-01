import express from 'express';
import initTodos from './todo';
import initTasks from './task';

const init = (ctx, models) => {
  const app = express();
  app.use('/todos', initTodos(ctx, models));
  app.use('/tasks', initTasks(ctx, models));
  return app;
};

export default init;
