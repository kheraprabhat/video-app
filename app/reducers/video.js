import { combineReducers } from 'redux';
import * as types from '../types';

const fetchVideos = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.VIDEO_FETCH_SUCCESS:
      return true;
    default:
      return state;
  }
};

const videos = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
};

const videoReducer = combineReducers({
  fetchVideos,
  videos
});

export default videoReducer;
