import { Router } from 'express';
import { requireAuth } from '@mockcord/middleware';

import Me from './@me';

const router: Router = Router();

router.use(requireAuth);
router.use('/@me', Me);

export default router;