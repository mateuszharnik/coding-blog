import { Router } from 'express';
import idValidation from '@server/middlewares/validation';
import { getContact, updateContact } from './index.controller';

const router = Router();

router.get(
  '/',
  getContact,
);

router.put(
  '/:id',
  idValidation,
  updateContact,
);

export default router;
