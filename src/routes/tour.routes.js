import express from 'express';

import * as tourController from '../controllers/tour.controller';

const router = express.Router();

router.get('/popular', tourController.getTopTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    tourController.uploadTourImages,
    tourController.storeTourImages,
    tourController.updateTour
  )
  .delete(tourController.deleteTour);

export default router;
