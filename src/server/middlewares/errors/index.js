import config from '@server/config';
import { statusCodes } from '@server/helpers/constants';

const { NODE_ENV } = config;
const { NOT_FOUND, OK, SERVER_ERROR } = statusCodes;

export const notFound = (req, res, next) => {
  const error = new Error(`Nie znaleziono ${req.originalUrl}`);
  res.status(NOT_FOUND);
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = ({ message, stack }, req, res, next) => {
  const status = res.statusCode === OK ? SERVER_ERROR : res.statusCode;
  res.status(status).json({
    message,
    stack: NODE_ENV === 'production' ? '💩' : stack,
  });
};
