import express from 'express';
import initTodos from './todo';
import initTasks from './task';

const init = () => {
  const app = express();
  app.use('/todos', initTodos());
  app.use('/tasks', initTasks());
  return app;
};

export default init;
