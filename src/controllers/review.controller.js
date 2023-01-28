import Review from '../models/review.model';
import * as handlerFactory from './factory';

export const setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const createReview = handlerFactory.createOne(Review);
export const getAllReviews = handlerFactory.getAll(Review);
export const getReview = handlerFactory.getOne(Review);
export const updateReview = handlerFactory.updateOne(Review);
export const deleteReview = handlerFactory.deleteOne(Review);
