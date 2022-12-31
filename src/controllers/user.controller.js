import User from '../models/user.model';

import * as handlerFactory from './factory';

export const createUser = handlerFactory.createOne(User);
export const getAllUsers = handlerFactory.getAll(User);
export const getUser = handlerFactory.getOne(User);
export const updateUser = handlerFactory.updateOne(User);
export const deleteUser = handlerFactory.deleteOne(User);

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const updateMe = () => {};
