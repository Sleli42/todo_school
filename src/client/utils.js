import 'whatwg-fetch';
import { addLoading, delLoading } from './actions/current_loads';
import { server } from '../../config';

const checkStatus = (result) => {
  if (result.status !== 200) {
    throw new Error(result.statusText);
  }
  return result;
};

const paserJson = result => result.json();

const requestJson = (uri, { method = 'GET', body, dispatch } = {}) => {
  const absoluteUri = `http://${server.host}:${server.port}/${uri}`;
  const params = {
    headers: { 'Content-Type': 'application/json' },
    method,
    credentials: 'same-origin',
  };
  if (body) {
    params.body = JSON.stringify(body || {});
  }
  if (dispatch) dispatch(addLoading());
  return fetch(absoluteUri, params)
    .then(checkStatus).then(paserJson)
    .then((result) => {
      if (dispatch) dispatch(delLoading());
      return result;
    })
    .catch((error) => {
      if (dispatch) dispatch(delLoading());
      console.log('ERROR:', error);
    });
};

export default requestJson;
