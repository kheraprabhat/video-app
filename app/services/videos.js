import axios from 'axios';

const service = {
  getVideos: () => axios.get('https://demo2697834.mockable.io/movies')
};

export default service;
