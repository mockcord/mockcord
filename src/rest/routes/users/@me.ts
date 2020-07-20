import { Router } from 'express';
import { UserManager } from '@mockcord/managers';
import { discrimString } from '@mockcord/util';

const router: Router = Router();

router.get('/', (req, res) => {
  const user = UserManager.getUserById(req.user.id, {
    id: true,
    tag: true,
    avatar: true,
    public_flags: true,
    password_hash: false,
    flags: true,
    bot: true,
    email: true,
    verified: true,
    locale: true,
    mfa_enabled: true,
  });

  res.send({
    ...user,
    discriminator: discrimString(user.discriminator),
  });
});

export default router;