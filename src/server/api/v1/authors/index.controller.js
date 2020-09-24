import responseWithError from '@server/helpers/errors';
import { serverErrorMessages, authorsErrorMessages, statusCodes } from '@server/helpers/constants';
import schema from './index.schema';
import Author from './index.model';

const { DEFAULT } = serverErrorMessages;
const {
  SERVER_ERROR, OK, CONFLICT, NOT_FOUND,
} = statusCodes;
const {
  AUTHOR_ALREADY_EXIST,
  AUTHOR_NOT_FOUND,
  AUTHOR_NOT_CREATED,
  AUTHOR_NOT_DELETED,
  AUTHOR_NOT_UPDATED,
} = authorsErrorMessages;

export const getAuthors = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { skip, limit, sort } = req.pagination;

  try {
    const total = await Author.countDocuments({ deleted_at: null });
    const authors = await Author.find({ deleted_at: null }, null, { skip, limit, sort });

    res.status(OK).json({
      total,
      authors,
      pagination: {
        skip,
        limit,
        remaining: total - (skip + limit) > 0,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const getAuthor = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const author = await Author.findById(req.params.id);

    if (!author || author?.deleted_at) {
      return sendError(NOT_FOUND, AUTHOR_NOT_FOUND);
    }

    res.status(OK).json(author);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const updateAuthor = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const author = await Author.findById(req.params.id);

    if (!author || author?.deleted_at) {
      return sendError(NOT_FOUND, AUTHOR_NOT_FOUND);
    }

    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!updatedAuthor) {
      return sendError(SERVER_ERROR, AUTHOR_NOT_UPDATED);
    }

    res.status(OK).json(updatedAuthor);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const saveAuthor = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const name = new RegExp(`^${value.name}$`, 'i');
    const author = await Author.findOne({ $and: [{ name }, { deleted_at: null }] });

    if (author) {
      return sendError(CONFLICT, AUTHOR_ALREADY_EXIST);
    }

    const createdAuthor = await Author.create(value);

    if (!createdAuthor) {
      return sendError(SERVER_ERROR, AUTHOR_NOT_CREATED);
    }

    res.status(OK).json(createdAuthor);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const deleteAuthors = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const { n: deleted = 0 } = await Author.updateMany({}, { deleted_at: Date.now() });

    res.status(OK).json({ deleted });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const deleteAuthor = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const author = await Author.findById(req.params.id);

    if (!author || author?.deleted_at) {
      return sendError(NOT_FOUND, AUTHOR_NOT_FOUND);
    }

    const deletedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedAuthor) {
      return sendError(SERVER_ERROR, AUTHOR_NOT_DELETED);
    }

    res.status(OK).json(deletedAuthor);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};
