import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export class ApiError extends Error {
  statusCode = 0;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}
export class BadRequest extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthenticatedError extends ApiError {
  constructor(message: string) {
    super(401, message);
  }
}
export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message);
  }
}

export const handleError = (err: Error, req: Request, res: Response): void => {
  if (err instanceof ApiError) {
    const { statusCode, message } = err;

    if ([401, 404, 400, 409].includes(statusCode)) {
      const errors = validationResult(req);
      res.status(statusCode).json({
        status: err.name,
        status_code: statusCode,
        message,
        errors: !errors.isEmpty() ? errors.array() : null,
      });
      return;
    }
  } else {
    res.status(500).json({
      status: err.name,
      status_code: 500,
      message: 'Internal server error',
    });
    return;
  }
};
