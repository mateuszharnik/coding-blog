import { Router } from 'express';
import { statusCodes } from '@server/helpers/constants';
import authors from '@server/api/v1/authors/index.router';
import about from '@server/api/v1/about/index.router';
import contact from '@server/api/v1/contact/index.router';
import messages from '@server/api/v1/messages/index.router';
import socialMedia from '@server/api/v1/socialMedia/index.router';
import newsletter from '@server/api/v1/newsletter/index.router';

const { OK } = statusCodes;
const router = Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => res.status(OK).json({ message: 'OK 💛' }));

router.use('/about', about);
router.use('/contact', contact);
router.use('/authors', authors);
router.use('/messages', messages);
router.use('/newsletter', newsletter);
router.use('/social-media', socialMedia);

export default router;
