import express from 'express';
import Todo from '../../models/todo'


/*
lists todo: curl http://0.0.0.0:3004/api/todos/ | json_pp
add todo: curl -H "Content-Type: application/json" -X POST -d '{"todo": {"label":"todo40"}}' http://0.0.0.0:3004/api/todos/
delete todo: curl -H "Content-Type: application/json" -X DELETE http://0.0.0.0:3004/api/todos/1
*/

const loadTodos = todos => (req, res, next) => {
  res.json(todos.load());
}

const addTodo = todos => (req, res, next) => {
  res.json(todos.add(req.body.todo));
}

const deleteTodo = todos => (req, res, next) => {
  try {
    res.json(todos.del(Number(req.params.id)));
  }
  catch (err) {
    next(err);
  }
}

const init = (ctx, models) => {
  const app = express();
  app.get('/', loadTodos(models.todos));
  app.post('/', addTodo(models.todos));
  app.delete('/:id', deleteTodo(models.todos, models.tasks));
  return app;
};

export default init;
