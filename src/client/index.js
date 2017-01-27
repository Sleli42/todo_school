import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store';
import initialState from './mystate';
import { loadHeros } from './actions/';

export const store = configureStore(initialState);

store.dispatch(loadHeros());

console.log('mounting react app ...');  // eslint-disable-line no-console
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));


export default store;
