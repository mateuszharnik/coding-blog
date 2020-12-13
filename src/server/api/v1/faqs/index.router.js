import { Router } from 'express';
import getRequestQueries from '@server/middlewares/queries';
import idValidation from '@server/middlewares/validation';
import {
  getFAQs,
  getFAQ,
  updateFAQ,
  addFAQ,
  deleteFAQs,
  deleteFAQ,
} from './index.controller';

const router = Router();

router.get(
  '/',
  getRequestQueries,
  getFAQs,
);

router.get(
  '/:id',
  idValidation,
  getFAQ,
);

router.put(
  '/:id',
  idValidation,
  updateFAQ,
);

router.post(
  '/',
  addFAQ,
);

router.delete(
  '/',
  deleteFAQs,
);

router.delete(
  '/:id',
  idValidation,
  deleteFAQ,
);

export default router;
