import multerUpload from '../config/multer';
import Tour from '../models/tour.model';
import catchAsync from '../utils/catch-async';
import storeToCloudinary from '../services/cloudinary.service';

export const createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  res.formatter.created(tour);
});

export const getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find(req.query);
  res.formatter.ok(tours, { results: tours.length });
});

export const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.formatter.ok(tour);
});

export const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.formatter.ok(tour);
});

export const deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.formatter.noContent();
});

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
