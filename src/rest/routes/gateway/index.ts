import { Router } from 'express';
import { requireAuth } from '@mockcord/middleware';

const router: Router = Router();

router.get("/", (req, res) => {
  res.json({ url: process.env.GATEWAY_URL });
});

router.get("/bot", requireAuth, (req, res) => {
  res.json({ url: process.env.GATEWAY_URL });
});

export default router;