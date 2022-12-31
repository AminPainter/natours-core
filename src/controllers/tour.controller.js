import multerUpload from '../config/multer';
import Tour from '../models/tour.model';
import { catchAsync } from '../utils';
import storeToCloudinary from '../services/cloudinary.service';
import * as handlerFactory from './factory';

export const createTour = handlerFactory.createOne(Tour);
export const getAllTours = handlerFactory.getAll(Tour);
export const getTour = handlerFactory.getOne(Tour);
export const updateTour = handlerFactory.updateOne(Tour);
export const deleteTour = handlerFactory.deleteOne(Tour);

export const getTopTours = catchAsync(async (req, res, next) => {
  res.formatter.ok(
    await Tour.find({
      $or: [
        { slug: 'the-sea-explorer' },
        { slug: 'the-forest-hiker' },
        { slug: 'the-snow-adventurer' },
      ],
    })
  );
});

export const uploadTourImages = multerUpload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

export const storeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  const files = [...req.files.imageCover, ...req.files.images];

  const storedFiles = await Promise.all(
    files.map((file, idx) =>
      storeToCloudinary(
        file.buffer,
        'tours',
        `${req.params.id}-${idx === 0 ? 'cover' : idx}`
      )
    )
  );

  req.body.imageCover = storedFiles[0].secure_url;
  req.body.images = storedFiles.slice(1).map(file => file.secure_url);
  next();
});
