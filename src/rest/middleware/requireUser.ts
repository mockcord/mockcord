import { RequestHandler } from 'express';
import { NotFound } from '../errors';
import { UserManager } from '@mockcord/managers';

export const requireUser: RequestHandler = (req, res, next) => {
  const userId = req.params.userId;
  const user = UserManager.getUserById(userId);

  if (!user) {
    throw new NotFound(10013);
  }

  req.requested_user = user;

  next();
};

export default requireUser;