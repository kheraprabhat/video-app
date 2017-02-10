/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function makeVideoRequest(method, id, data, api = '/videos') {
  return request[method](api, data);
}

export function createVideoSuccess(data) {
  return {
    type: types.CREATE_VIDEO_SUCCESS,
    data
  };
}

export function createVideoFailure(data) {
  return {
    type: types.CREATE_VIDEO_FAILURE,
    data
  };
}

export function getAllVideos() {
  return (dispatch, getState) => {
    return makeVideoRequest('get', '', data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createVideoSuccess(data));
        }
      })
      .catch(() => {
        return dispatch(createVideoFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

export function createVideo(vid) {
  return (dispatch, getState) => {
    // If the text box is empty
    const id = vid.id;
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { video } = getState();
    const data = {
      count: 1,
      id
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (video && video.watched && video.watched.filter(videoItem => videoItem.id === id).length > 0) {
      data.count = videoItem.count + 1;
    }

    return makeVideoRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createVideoSuccess(data));
        }
      })
      .catch(() => {
        return dispatch(createVideoFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}
