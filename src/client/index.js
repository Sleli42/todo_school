import React from 'react';
import socketIO from 'socket.io-client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MainApp from './components/App';
import configureStore from './store';
import initialState from './mystate';
import { loadTodos } from './actions/todos';
import { loadTasks } from './actions/tasks';

const io = socketIO.connect();
const store = configureStore(initialState, io);

io.on('disconnect', () => console.log('socket.IO disconnect'));
io.on('error', err => console.log(`socket.IO error ${err}`));
io.on('connect', () => {
  console.log('socket.io connected');
  store.dispatch(loadTodos());
  store.dispatch(loadTasks());
});

render(
  <Provider store={store}>
    <MainApp />
  </Provider>,
  document.getElementById('root'));


export default store;
