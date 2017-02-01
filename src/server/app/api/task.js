import express from 'express';

/*
lists todo: curl http://0.0.0.0:3004/api/tasks/ | json_pp
add todo: curl -H "Content-Type: application/json" -X POST -d '{"task": {"description":"todo42", "isCompleted": false, "listId": 1}}' http://0.0.0.0:3004/api/tasks/
delete todo: curl -H "Content-Type: application/json" -X DELETE http://0.0.0.0:3004/api/tasks/1
*/

const loadTasks = tasks => (req, res, next) => {
  res.json(tasks.load());
}

const addTask = tasks => (req, res, next) => {
  res.json(tasks.add(req.body.task));
}

const deleteTask = tasks => (req, res, next) => {
  try {
    res.json(tasks.del(Number(req.params.id)));
  }
  catch(err) {
    next(err);
  }
}

const init = (ctx, models) => {
  const app = express();
  app.get('/', loadTasks(models.tasks));
  app.post('/', addTask(models.tasks));
  app.delete('/:id', deleteTask(models.tasks));
  return app;
};

export default init;
