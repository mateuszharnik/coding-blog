import { Router } from 'express';
import { statusCodes } from '@server/helpers/constants';
import authors from '@server/api/v1/authors/index.router';
import about from '@server/api/v1/about/index.router';

const { OK } = statusCodes;
const router = Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => res.status(OK).json({ message: 'OK 💛' }));

router.use('/about', about);
router.use('/authors', authors);

export default router;
