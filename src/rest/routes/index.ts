import { Router } from 'express';

import Gateway from './gateway';
import Mock from './mock';
import Users from './users';

const router: Router = Router();

// Official Discord endpoints
router.use('/gateway', Gateway);
router.use('/users', Users);

// Our special endpoint to create fake users, guilds, channels etc.
router.use('/mock', Mock);

export default router;