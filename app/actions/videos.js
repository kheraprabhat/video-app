/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function makeVideoRequest(method, id, data, api = '/video') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function createVideoSuccess() {
  return {
    type: types.CREATE_VIDEO_SUCCESS
  };
}

export function createTopicFailure(data) {
  return {
    type: types.CREATE_VIDEO_FAILURE,
    id: data.id,
    error: data.error
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createVideoRequest(data) {
  return {
    type: types.VIDEO_FETCH_SUCCESS,
    id: data.id,
    count: data.count
  };
}

export function createVideo(video) {
  return (dispatch, getState) => {
    // If the text box is empty
    const id = video.id;
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { videoSt } = getState();
    const data = {
      count: 1,
      id
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (videoSt.watched.filter(videoItem => videoItem.id === id).length > 0) {
      data.count = videoItem.count + 1;
    }

    // First dispatch an optimistic update
    dispatch(createVideoRequest(data));

    return makeVideoRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createVideoSuccess());
        }
      })
      .catch(() => {
        return dispatch(createVideoFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}
