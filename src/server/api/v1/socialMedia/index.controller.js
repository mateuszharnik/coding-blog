import responseWithError from '@server/helpers/errors';
import { serverErrorMessages, statusCodes, socialMediaErrorMessages } from '@server/helpers/constants';
import schema from './index.schema';
import SocialMedia from './index.model';

const { DEFAULT } = serverErrorMessages;
const { SOCIAL_MEDIA_NOT_FOUND, SOCIAL_MEDIA_NOT_UPDATED } = socialMediaErrorMessages;
const {
  SERVER_ERROR, OK, CONFLICT, NOT_FOUND,
} = statusCodes;

export const getSocialMedia = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);

  try {
    const socialMedia = await SocialMedia.findOne();

    if (!socialMedia || socialMedia?.deleted_at) {
      return sendError(NOT_FOUND, SOCIAL_MEDIA_NOT_FOUND);
    }

    res.status(OK).json(socialMedia);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};

export const updateSocialMedia = async (req, res, next) => {
  const sendError = responseWithError.bind(null, res, next);
  const { error: schemaError, value } = schema.validate(req.body);

  if (schemaError) {
    return sendError(CONFLICT, schemaError.details[0].message);
  }

  try {
    const socialMedia = await SocialMedia.findById(req.params.id);

    if (!socialMedia || socialMedia?.deleted_at) {
      return sendError(NOT_FOUND, SOCIAL_MEDIA_NOT_FOUND);
    }

    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(
      req.params.id, value, { new: true },
    );

    if (!updatedSocialMedia) {
      return sendError(SERVER_ERROR, SOCIAL_MEDIA_NOT_UPDATED);
    }

    res.status(OK).json(updatedSocialMedia);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return sendError(SERVER_ERROR, DEFAULT);
  }
};
