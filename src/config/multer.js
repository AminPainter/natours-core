import multer from 'multer';

import AppError from '../utils/error';

const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.includes('image')) cb(null, true);
    else cb(new AppError('One of the uploaded files was not an image'), false);
  },
});

export default multerUpload;
