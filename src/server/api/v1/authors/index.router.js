import { Router } from 'express';
import getRequestQueries from '@server/middlewares/queries';
import idValidation from '@server/middlewares/validation';
import {
  getAuthors,
  getAuthor,
  updateAuthor,
  saveAuthor,
  deleteAuthors,
  deleteAuthor,
} from './index.controller';

const router = Router();

router.get(
  '/',
  getRequestQueries,
  getAuthors,
);

router.get(
  '/:id',
  idValidation,
  getAuthor,
);

router.put(
  '/:id',
  idValidation,
  updateAuthor,
);

router.post(
  '/',
  saveAuthor,
);

router.delete(
  '/',
  deleteAuthors,
);

router.delete(
  '/:id',
  idValidation,
  deleteAuthor,
);

export default router;
