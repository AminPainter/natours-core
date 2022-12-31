import express from 'express';

import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/login', authController.getGoogleAuthScreen);
router.get('/redirect', authController.handleGoogleRedirect);

export default router;
