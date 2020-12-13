import responseWithError from '@server/helpers/errors';
import { serverErrorMessages, faqsErrorMessages, statusCodes } from '@server/helpers/constants';
import schema from './index.schema';
import FAQ from './index.model';

const { DEFAULT } = serverErrorMessages;
const {
  SERVER_ERROR, OK, CONFLICT, NOT_FOUND,
} = statusCodes;
const {
  FAQ_ALREADY_EXIST,
  FAQ_NOT_FOUND,
  FAQ_NOT_CREATED,
  FAQ_NOT_DELETED,
  FAQ_NOT_UPDATED,
} = faqsErrorMessages;

export const getFAQs = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { skip, limit, sort } = req.pagination;

  try {
    const total = await FAQ.countDocuments({ deleted_at: null });
    const faqs = await FAQ.find({ deleted_at: null }, null, { skip, limit, sort });

    const result = faqs.length ? {
      total,
      faqs,
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

export const getFAQ = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq || faq?.deleted_at) {
      return sendError(NOT_FOUND, FAQ_NOT_FOUND);
    }

    res.status(OK).json(faq);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const updateFAQ = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq || faq?.deleted_at) {
      return sendError(NOT_FOUND, FAQ_NOT_FOUND);
    }

    const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!updatedFAQ) {
      return sendError(SERVER_ERROR, FAQ_NOT_UPDATED);
    }

    res.status(OK).json(updatedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const addFAQ = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const question = new RegExp(`^${value.question}$`, 'i');
    const faq = await FAQ.findOne({ $and: [{ question }, { deleted_at: null }] });

    if (faq) {
      return sendError(CONFLICT, FAQ_ALREADY_EXIST);
    }

    const createdFAQ = await FAQ.create(value);

    if (!createdFAQ) {
      return sendError(SERVER_ERROR, FAQ_NOT_CREATED);
    }

    res.status(OK).json(createdFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const deleteFAQs = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const { n: deleted = 0 } = await FAQ.updateMany(
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

export const deleteFAQ = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq || faq?.deleted_at) {
      return sendError(NOT_FOUND, FAQ_NOT_FOUND);
    }

    const deletedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedFAQ) {
      return sendError(SERVER_ERROR, FAQ_NOT_DELETED);
    }

    res.status(OK).json(deletedFAQ);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};
