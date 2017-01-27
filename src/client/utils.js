import 'whatwg-fetch';
import crypto from 'crypto';
// import { addLoading, delLoading } from './actions/current_loads';

const checkStatus = (result) => {
  if (result.status !== 200) {
    throw new Error(result.statusText);
  }
  return result;
};

const parserJson = result => result.json();

const requestJson = (uri, { method = 'GET' } = {}) => {
  const baseUrl = 'http://gateway.marvel.com:80';
  const timeStamp = Math.round(+new Date() / 1000);
  const publicApi = '298bab46381a6daaaee19aa5c8cafea5';
  const privateApi = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d';
  const hash = crypto.createHash('md5').update(`${timeStamp}${privateApi}${publicApi}`).digest('hex');
  const params = { headers: { 'Content-Type': 'application/json' }, method };
  return fetch(`${baseUrl}${uri}?ts=${timeStamp}&apikey=${publicApi}&hash=${hash}`, params)
    .then(checkStatus).then(parserJson);
    // .then(console.log('so goood'));
    // .then(data => console.log(data.data.results));
};

export default requestJson;
