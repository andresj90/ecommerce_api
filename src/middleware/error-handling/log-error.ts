import { Response, NextFunction, Request } from 'express';
import { ErrorName } from '@common/types';

const logError = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorInfo = setErrorInformation(err);
  return res.status(errorInfo.code).send(errorInfo.message);
};

const setErrorInformation = (err: Error) => {
  switch (err.name) {
    case ErrorName.ValidationError:
    case ErrorName.TypeError:
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
