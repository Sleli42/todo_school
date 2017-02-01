import requestJson from '../utils';
import { addAlert } from './alert';
import state from '../mystate';

export const TASK_ADDED = 'task/taskAdded';
export const TASK_DELETED = 'task/deleteTask';
export const TASKS_LOADED = 'task/tasksLoaded';
export const TOGGLE_COMPLETED = 'task/toggleCompleted';

export const tasksLoaded = tasks => ({
  type: TASKS_LOADED,
  payload: tasks,
});

export const loadTasks = () => (dispatch) => {
  const uri = 'api/tasks/';
  requestJson(uri)
    .then(todos => dispatch(tasksLoaded(todos)))
    .catch((error) => {
      if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
    });
};

export const taskAdded = task => ({
  type: TASK_ADDED,
  payload: task,
});

export const addTask = (description, listId) => (dispatch) => {
  const uri = 'api/tasks/';
  const body = { task: { description, listId } };
  const options = { method: 'POST', body, dispatch };
  requestJson(uri, options)
    .then(task => dispatch(taskAdded(task)))
    .catch((error) => {
      if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
    });
};

export const taskDeleted = task => ({
  type: TASK_DELETED,
  payload: task,
});

export const deleteTask = id => (dispatch) => {
  const uri = `api/tasks/${id}/`;
  const options = { method: 'DELETE', dispatch };
  return requestJson(uri, options)
    .then(task => dispatch(taskDeleted(task)))
    .catch((error) => {
      if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
    });
};

export const toggleCompleted = (id, task) => ({
  type: TOGGLE_COMPLETED,
  id,
  task,
});

export default {
  addTask,
  deleteTask,
  tasksLoaded,
  toggleCompleted,
};
