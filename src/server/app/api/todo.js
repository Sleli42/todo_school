import express from 'express';

/*
lists todo: curl http://0.0.0.0:3004/api/todos/ | json_pp
add todo: curl -H "Content-Type: application/json" -X POST -d '{"todo": {"label":"todo40"}}' http://0.0.0.0:3004/api/todos/
delete todo: curl -H "Content-Type: application/json" -X DELETE http://0.0.0.0:3004/api/todos/1
*/

const todos = [];
let id = 0;

const loadTodos = (req, res) => res.json(todos)

const addTodo = (req, res) => {
  const { todo } = req.body;
  // console.log('label:', todo);
  const todoWithId = { ...todo, id: id += 1 }
  todos.push(todoWithId);
  res.json(todos);
}

const deleteTodo = (req, res) => {
  todos.filter((todo => req.params.id !== todo.id))
  res.json(todos);
}

const init = (ctx) => {
  const app = express();
  app.get('/', loadTodos);
  app.post('/', addTodo);
  app.delete('/:id', deleteTodo);
  return app;
};

export default init;
