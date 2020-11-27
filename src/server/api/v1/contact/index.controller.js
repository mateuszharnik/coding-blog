import responseWithError from '@server/helpers/errors';
import { serverErrorMessages, statusCodes, contactErrorMessages } from '@server/helpers/constants';
import schema from './index.schema';
import Contact from './index.model';

const { DEFAULT } = serverErrorMessages;
const { CONTACT_NOT_FOUND, CONTACT_NOT_UPDATED } = contactErrorMessages;
const {
  SERVER_ERROR, OK, CONFLICT, NOT_FOUND,
} = statusCodes;

export const getContact = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const contact = await Contact.findOne();

    if (!contact || contact?.deleted_at) {
      return sendError(NOT_FOUND, CONTACT_NOT_FOUND);
    }

    res.status(OK).json(contact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const updateContact = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact || contact?.deleted_at) {
      return sendError(NOT_FOUND, CONTACT_NOT_FOUND);
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id, value, { new: true },
    );

    if (!updatedContact) {
      return sendError(SERVER_ERROR, CONTACT_NOT_UPDATED);
    }

    res.status(OK).json(updatedContact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};
