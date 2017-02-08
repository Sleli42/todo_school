import requestJson from '../utils';
import { deleteTask } from './tasks';
import { addAlert } from './alert';
import state from '../mystate';

export const TODO_ADDED = 'todo/todoAdded';
export const TODO_DELETED = 'todo/todoDeleted';
export const TODOS_LOADED = 'todo/todosLoaded';

export const todosLoaded = todos => ({
  type: TODOS_LOADED,
  payload: todos,
});

export const loadTodos = () => (dispatch) => {
  const uri = 'api/todos/';
  requestJson(uri)
    .then(todos => dispatch(todosLoaded(todos)))
    .catch((error) => {
      if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
    });
};

export const todoAdded = todo => ({
  type: TODO_ADDED,
  payload: todo,
});

export const addTodo = title => (dispatch) => {
  const uri = 'api/todos/';
  const body = { todo: { label: title } };
  const options = { method: 'POST', body, dispatch };
  requestJson(uri, options)
    .then(todo => dispatch(todoAdded(todo)))
    .catch((error) => {
      if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
    });
};

export const todoDeleted = todo => ({
  type: TODO_DELETED,
  payload: todo,
});

export const deleteTodo = id => (dispatch) => {
  const uri = `api/todos/${id}/`;
  const options = { method: 'DELETE', dispatch };
  requestJson(uri, options)
    .then(dispatch(todoDeleted({ id })))
    .catch((error) => {
      if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
    });
  // const filtered = tasks.filter(task => task.listId === id);
  // const tasksPromises = filtered.map(task => deleteTask(task.id)(dispatch));
  // Promise.all([requestJson(uri, options), ...tasksPromises])
  //   .then(values => dispatch(todoDeleted(values[0])))
  //   .catch((error) => {
  //     if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
  //   });
};

export default {
  loadTodos,
  addTodo,
  todoAdded,
  deleteTodo,
  todoDeleted,
};
