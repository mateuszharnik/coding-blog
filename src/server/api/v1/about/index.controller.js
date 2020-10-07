import responseWithError from '@server/helpers/errors';
import { serverErrorMessages, statusCodes, aboutErrorMessages } from '@server/helpers/constants';
import schema from './index.schema';
import About from './index.model';

const { DEFAULT } = serverErrorMessages;
const { ABOUT_NOT_FOUND, ABOUT_NOT_UPDATED } = aboutErrorMessages;
const {
  SERVER_ERROR, OK, CONFLICT, NOT_FOUND,
} = statusCodes;

export const getAbout = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const about = await About.findOne();

    if (!about || about?.deleted_at) {
      return sendError(NOT_FOUND, ABOUT_NOT_FOUND);
    }

    res.status(OK).json(about);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const updateAbout = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const about = await About.findById(req.params.id);

    if (!about || about?.deleted_at) {
      return sendError(NOT_FOUND, ABOUT_NOT_FOUND);
    }

    const updatedAbout = await About.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!updatedAbout) {
      return sendError(SERVER_ERROR, ABOUT_NOT_UPDATED);
    }

    res.status(OK).json(updatedAbout);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};
