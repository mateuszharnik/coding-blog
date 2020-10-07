import { idSchema } from '@server/schemas';
import responseWithError from '@server/helpers/errors';
import { statusCodes } from '@server/helpers/constants';

const { CONFLICT } = statusCodes;

const idValidation = (req, res, next) => {
  const { error } = idSchema.validate(req.params.id);

  if (error) {
    return responseWithError(res, next, CONFLICT, error.details[0].message);
  }

  next();
};

export default idValidation;
