import express from 'express';
import Todo from '../../db/models/todo';
import Task from '../../db/models/task';

const loadTodos = (req, res, next) => {
  Todo.find().then(todo => res.json(todo)).catch(next);
};

const addTodo = (req, res, next) => {
  const { todo } = req.body;
  Todo.add(todo).then(t => res.json(t)).catch(next);
};

const deleteTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.del(id).then(todo => res.json(todo)).then(Task.delByTodoId(id)).catch(next);
};

const init = () => {
  const app = express();
  app.get('/', loadTodos);
  app.post('/', addTodo);
  app.delete('/:id', deleteTodo);
  return app;
};

export default init;
