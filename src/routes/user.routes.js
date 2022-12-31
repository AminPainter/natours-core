import express from 'express';

import * as userController from '../controllers/user.controller';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);

export default router;
