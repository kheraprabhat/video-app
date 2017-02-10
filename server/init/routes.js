/**
 * Routes for express app
 */
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers } from '../db';

const videosController = controllers && controllers.videos;

export default (app) => {
  // topic routes
  if (videosController) {
    app.get('/videos', videosController.all);
    app.post('/videos', videosController.add);
    app.put('/videos/:id', videosController.update);
    app.delete('/videos/:id', videosController.remove);
  } else {
    console.warn(unsupportedMessage('videos routes'));
  }
};
