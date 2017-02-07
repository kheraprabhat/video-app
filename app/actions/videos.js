/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function makeVideoRequest(method, id, data, api = '/video') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

/*
 * @param data
 * @return a simple JS object
 */
export function createVideoRequest(data) {
  return {
    type: types.VIDEO_FETCH_SUCCESS,
    id: data.id,
    count: data.count,
    text: data.text
  };
}
