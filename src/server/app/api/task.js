import express from 'express';

/*
lists todo: curl http://0.0.0.0:3004/api/tasks/ | json_pp
add todo: curl -H "Content-Type: application/json" -X POST -d '{"task": {"description":"todo42", "isCompleted": false, "listId": 1}}' http://0.0.0.0:3004/api/tasks/
delete todo: curl -H "Content-Type: application/json" -X DELETE http://0.0.0.0:3004/api/tasks/1
*/

const tasks = [];
let id = 0;

const loadTasks = (req, res) => res.json(tasks)

const addTask = (req, res) => {
  const { task } = req.body;
  // console.log('label:', todo);
  const taskWithId = { ...task, id: id += 1 }
  task.push(taskWithId);
  res.json(task);
}

const deleteTask = (req, res) => {
  tasks.filter((task => req.params.id !== task.id))
  res.json(tasks);
}

const init = (ctx) => {
  const app = express();
  app.get('/', loadTasks);
  app.post('/', addTask);
  app.delete('/:id', deleteTask);
  return app;
};

export default init;
