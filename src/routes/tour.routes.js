import express from 'express';

import * as tourController from '../controllers/tour.controller';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/popular', tourController.getTopTours);
router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTour);

// /////////////////////////////////////////
router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', tourController.createTour);

router
  .route('/:id')
  .patch(
    tourController.uploadTourImages,
    tourController.storeTourImages,
    tourController.updateTour
  )
  .delete(tourController.deleteTour);

export default router;
