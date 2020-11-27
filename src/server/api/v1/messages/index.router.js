import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import getRequestQueries from '@server/middlewares/queries';
import idValidation from '@server/middlewares/validation';
import { times, limiterMessages } from '@server/helpers/constants';
import {
  getMessages,
  getMessage,
  addMessage,
  deleteMessages,
  deleteMessage,
} from './index.controller';

const router = Router();

const limiter = rateLimit({
  windowMs: times.TEN_MINUTES,
  max: 3,
  message: limiterMessages.MESSAGES,
});

router.get(
  '/',
  getRequestQueries,
  getMessages,
);

router.get(
  '/:id',
  idValidation,
  getMessage,
);

router.post(
  '/',
  limiter,
  addMessage,
);

router.delete(
  '/',
  deleteMessages,
);

router.delete(
  '/:id',
  idValidation,
  deleteMessage,
);

export default router;
