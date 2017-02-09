import express from 'express';
import Todo from '../../db/models/todo';

const loadTodos = (req, res, next) => {
  if (req.query.label) {
    Todo.filter(req.query.label)
      .then(todos => res.json(todos))
      .catch(next);
  } else {
    Todo.find().then(todo => res.json(todo)).catch(next);
  }
};

const addTodo = (req, res, next) => {
  const { todo } = req.body;
  Todo.add(todo).then(t => res.json(t)).catch(next);
};

const deleteTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.del(id).then(id => res.json(id)).catch(next);
};

const init = () => {
  const app = express();
  app.get('/', loadTodos);
  app.post('/', addTodo);
  app.delete('/:id', deleteTodo);
  return app;
};

export default init;
