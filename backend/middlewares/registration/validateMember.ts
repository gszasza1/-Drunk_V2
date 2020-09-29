import { NextFunction, Request, Response } from 'express';

import { Member } from '../../models/registerMember';

export const validateMemberInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, password }: Member = req.body;
  if (password.length < 6) {
  }
  return next();
};
