import express from 'express';
import Task from '../../db/models/task';

const loadTasks = (req, res, next) => {
  Task.find().then(task => res.json(task)).catch(next);
};

const addTask = (req, res, next) => {
  const { task } = req.body;
  Task.add(task).then(t => res.json(t)).catch(next);
};

const deleteTask = (req, res, next) => {
  const { id } = req.params;
  Task.del(id).then(task => res.json(task)).catch(next);
};

const init = () => {
  const app = express();
  app.get('/', loadTasks);
  app.post('/', addTask);
  app.delete('/:id', deleteTask);
  return app;
};

export default init;
