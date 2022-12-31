import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import oauthClient from '../config/google';
import User from '../models/user.model';
import catchAsync from '../utils/catch-async';
import AppError from '../utils/error';

export const getGoogleAuthScreen = (req, res) =>
  res.redirect(
    oauthClient.generateAuthUrl({
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    })
  );

export const handleGoogleRedirect = catchAsync(async (req, res) => {
  const { tokens } = await oauthClient.getToken(req.query.code);
  const googleUser = await (
    await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    )
  ).json();

  if (!googleUser.verified_email)
    throw new AppError('Your google email address has not been verified');

  const user = await User.findOneAndUpdate(
    { email: googleUser.email },
    googleUser,
    { upsert: true, new: true, runValidators: true }
  );

  const token = await promisify(jwt.sign)(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie('jwt', token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge:
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });

  res.formatter[user.isNew ? 'created' : 'ok']({ user, token });
});
