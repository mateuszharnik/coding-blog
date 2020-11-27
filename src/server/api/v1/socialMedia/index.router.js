import { Router } from 'express';
import idValidation from '@server/middlewares/validation';
import { getSocialMedia, updateSocialMedia } from './index.controller';

const router = Router();

router.get(
  '/',
  getSocialMedia,
);

router.put(
  '/:id',
  idValidation,
  updateSocialMedia,
);

export default router;
