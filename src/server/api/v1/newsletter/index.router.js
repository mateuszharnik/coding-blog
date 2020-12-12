import { Router } from 'express';
import getRequestQueries from '@server/middlewares/queries';
import idValidation from '@server/middlewares/validation';
import {
  getEmails,
  getEmail,
  addEmail,
  deleteEmails,
  deleteEmail,
} from './index.controller';

const router = Router();

router.get(
  '/',
  getRequestQueries,
  getEmails,
);

router.get(
  '/:id',
  idValidation,
  getEmail,
);

router.post(
  '/',
  addEmail,
);

router.delete(
  '/',
  deleteEmails,
);

router.delete(
  '/:id',
  idValidation,
  deleteEmail,
);

export default router;
