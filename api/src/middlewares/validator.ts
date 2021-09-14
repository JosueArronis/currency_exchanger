import { validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';
import { handleError, ApiError } from '../error';

const validationsHandler = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const err = new ApiError(404, 'Invalid request');
  handleError(err, req, res);
};

export default validationsHandler;
