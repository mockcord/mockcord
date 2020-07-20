import { RequestHandler } from 'express';
import { UserManager } from '@mockcord/managers';
import { TokenType } from '@mockcord/constants';
import { Unauthorized } from '@mockcord/errors';

const requireAuth: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Unauthorized();
  }

  if (authorization.startsWith("Bot ")) {
    return fetchUser(authorization.substring(4).trim(), TokenType.BOT)(req, res, next);
  } else {
    return fetchUser(authorization, TokenType.USER)(req, res, next);
  }
};

const fetchUser = (token: string, tokenType: TokenType): RequestHandler => (req, res, next) => {
  try {
    const user = UserManager.getUserByToken(token);

    if (user.bot && tokenType != TokenType.BOT) {
      throw new Unauthorized();
    }

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    throw new Unauthorized();
  }
};

export default requireAuth;