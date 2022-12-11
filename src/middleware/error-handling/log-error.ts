import { Response, NextFunction } from 'express';
import { ErrorName } from '@common/types';

const logError = (err: Error, res: Response, next: NextFunction) => {
  const errorInfo = setErrorInformation(err);
  next();
  return res.status(errorInfo.code).send(errorInfo.message);
};

const setErrorInformation = (err: Error) => {
  switch (err.name) {
    case ErrorName.ValidationError:
      return {
        code: 400,
        message: err.message
      };
    case ErrorName.MongoServerError:
      return {
        code: 500,
        message: err.message
      };
    default:
      return { code: 500, message: err.message };
  }
};

export { logError };
