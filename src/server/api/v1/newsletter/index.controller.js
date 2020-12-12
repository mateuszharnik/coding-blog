import responseWithError from '@server/helpers/errors';
import { serverErrorMessages, emailsErrorMessages, statusCodes } from '@server/helpers/constants';
import schema from './index.schema';
import Newsletter from './index.model';

const { DEFAULT } = serverErrorMessages;
const {
  SERVER_ERROR, OK, CONFLICT, NOT_FOUND,
} = statusCodes;
const {
  EMAIL_ALREADY_EXIST,
  EMAIL_NOT_FOUND,
  EMAIL_NOT_CREATED,
  EMAIL_NOT_DELETED,
} = emailsErrorMessages;

export const getEmails = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { skip, limit, sort } = req.pagination;

  try {
    const total = await Newsletter.countDocuments({ deleted_at: null });
    const emails = await Newsletter.find({ deleted_at: null }, null, { skip, limit, sort });

    const result = emails.length ? {
      total,
      emails,
      pagination: {
        skip,
        limit,
        remaining: total - (skip + limit) > 0,
      },
    } : [];

    res.status(OK).json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const getEmail = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const email = await Newsletter.findById(req.params.id);

    if (!email || email?.deleted_at) {
      return sendError(NOT_FOUND, EMAIL_NOT_FOUND);
    }

    res.status(OK).json(email);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const addEmail = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const pattern = new RegExp(`^${value.email}$`, 'i');
    const email = await Newsletter.findOne({ $and: [{ email: pattern }, { deleted_at: null }] });

    if (email) {
      return sendError(CONFLICT, EMAIL_ALREADY_EXIST);
    }

    const createdEmail = await Newsletter.create(value);

    if (!createdEmail) {
      return sendError(SERVER_ERROR, EMAIL_NOT_CREATED);
    }

    res.status(OK).json(createdEmail);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const deleteEmails = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const { n: deleted = 0 } = await Newsletter.updateMany(
      { deleted_at: null }, { deleted_at: Date.now() },
    );

    const result = deleted ? { deleted } : [];
    res.status(OK).json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const deleteEmail = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const email = await Newsletter.findById(req.params.id);

    if (!email || email?.deleted_at) {
      return sendError(NOT_FOUND, EMAIL_NOT_FOUND);
    }

    const deletedEmail = await Newsletter.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedEmail) {
      return sendError(SERVER_ERROR, EMAIL_NOT_DELETED);
    }

    res.status(OK).json(deletedEmail);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};
