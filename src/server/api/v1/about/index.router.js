import { Router } from 'express';
import idValidation from '@server/middlewares/validation';
import { getAbout, updateAbout } from './index.controller';

const router = Router();

router.get(
  '/',
  getAbout,
);

router.put(
  '/:id',
  idValidation,
  updateAbout,
);

export default router;
