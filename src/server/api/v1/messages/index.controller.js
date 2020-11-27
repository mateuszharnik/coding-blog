import responseWithError from '@server/helpers/errors';
import { serverErrorMessages, messagesErrorMessages, statusCodes } from '@server/helpers/constants';
import schema from './index.schema';
import Message from './index.model';

const { DEFAULT } = serverErrorMessages;
const {
  SERVER_ERROR, OK, CONFLICT, NOT_FOUND,
} = statusCodes;
const {
  MESSAGE_NOT_FOUND,
  MESSAGE_NOT_CREATED,
  MESSAGE_NOT_DELETED,
  MESSAGE_NOT_UPDATED,
} = messagesErrorMessages;

export const getMessages = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { skip, limit, sort } = req.pagination;

  try {
    const total = await Message.countDocuments({ deleted_at: null });
    const messages = await Message.find({ deleted_at: null }, null, { skip, limit, sort });

    const result = messages.length ? {
      total,
      messages,
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

export const getMessage = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const message = await Message.findById(req.params.id);

    if (!message || message?.deleted_at) {
      return sendError(NOT_FOUND, MESSAGE_NOT_FOUND);
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id, { readed: true }, { new: true },
    );

    if (!updatedMessage) {
      return sendError(SERVER_ERROR, MESSAGE_NOT_UPDATED);
    }

    res.status(OK).json(updatedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const addMessage = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const message = await Message.create(value);

    if (!message) {
      return sendError(SERVER_ERROR, MESSAGE_NOT_CREATED);
    }

    res.status(OK).json(message);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const deleteMessages = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const { n: deleted = 0 } = await Message.updateMany(
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

export const deleteMessage = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const message = await Message.findById(req.params.id);

    if (!message || message?.deleted_at) {
      return sendError(NOT_FOUND, MESSAGE_NOT_FOUND);
    }

    const deletedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedMessage) {
      return sendError(SERVER_ERROR, MESSAGE_NOT_DELETED);
    }

    res.status(OK).json(deletedMessage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};
