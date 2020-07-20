import { Router } from 'express';
import Joi from "joi";
import { UserManager } from '@mockcord/managers';
import { sendValidationError } from '@mockcord/util';
import * as bcrypt from "bcryptjs";

interface ICreateMockUserBody {
  username: string;
  password: string;
  email?: string;
  bot?: boolean;
  verified?: boolean;
  system?: boolean;
}

const creatMockUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).max(64).allow(null),
  email: Joi.string().email().allow(null),
  verified: Joi.boolean(),
  bot: Joi.boolean(),
  system: Joi.boolean(),
});

const router: Router = Router();

router.post('/user', (req, res) => {
  const result = creatMockUserSchema.validate(req.body);

  if (result.error) {
    console.log(result.error);
    sendValidationError(res, result.error);
    return;
  }

  const body = req.body as ICreateMockUserBody;
  const { username, password, email, bot, verified, system } = body;


  //Generate a random discriminator that's not already used
  let discriminator: number;

  while (!discriminator || UserManager.getUserByTag(username, discriminator)) {
    discriminator = Math.random() * 10000 | 0;
  }

  const password_hash = password ? bcrypt.hashSync(password, 10) : null;

  const user = UserManager.createUser({
    username,
    discriminator,
    password_hash,
    email,
    bot,
    system,
  });

  res.status(200).json({ token: UserManager.makeToken(user) });
});

export default router;