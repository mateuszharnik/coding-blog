import { statusCodes } from '@server/helpers/constants';

const { SERVER_ERROR } = statusCodes;

const responseWithError = (res, next, status = SERVER_ERROR, message = '') => {
  const error = new Error(message);
  res.status(status);
  next(error);
};

export default responseWithError;
