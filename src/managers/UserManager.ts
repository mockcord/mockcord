import { snowflake, make, flakeString } from '@mockcord/util';
import { IUser } from '@mockcord/structures';
import base64url from 'base64url';
import { TimestampSigner } from 'reallydangerous';
import { UserManager } from '.';
import { Unauthorized } from '@mockcord/errors';

let users: IUser[] = [];

interface UserCreateOptions {
  id?: snowflake;
  username: string;
  discriminator: number;
  password_hash: string | null;
  flags?: number;
  email?: string;
  bot?: boolean;
  system?: boolean;
}

interface UserGetOptions {
  id?: boolean;
  locale?: boolean;
  mfa_enabled?: boolean;
  flags?: boolean;
  public_flags?: boolean;
  tag?: boolean;
  avatar?: boolean;
  email?: boolean;
  password_hash?: boolean;
  verified?: boolean;
  bot?: boolean;
  system?: boolean;
}

const defaultUserGetOptions: UserGetOptions = {
  id: false,
  locale: false,
  mfa_enabled: false,
  flags: false,
  public_flags: true,
  tag: true,
  avatar: true,
  email: false,
  password_hash: false,
  verified: false,
  bot: false,
  system: false,
}

export default {
  createUser(options: UserCreateOptions): IUser {
    const { id = make(), bot, email = null, flags = 0 } = options;
    delete options.id;

    const user: IUser = {
      id: flakeString(id),
      flags,
      public_flags: flags,
      locale: 'en-US',
      mfa_enabled: false,
      email: email,
      verified: bot || false,
      avatar: null,
      ...options
    }

    users.push(user);

    return user;
  },
  getUserById(id: snowflake, options: UserGetOptions = defaultUserGetOptions): IUser {
    const user = users.find(user => user.id == id);

    for (const [key, value] of Object.entries(options)) {
      if (!value) {
        delete user[key];
      }
    }

    return user;
  },
  getUserByTag(username: string, discriminator: number, options: UserGetOptions = defaultUserGetOptions): IUser | null {
    const user = users.find(user => user.username == username && user.discriminator == discriminator);

    if (!user) {
      return null;
    }

    for (const [key, value] of Object.entries(options)) {
      if (!value) {
        delete user[key];
      }
    }

    return user;
  },
  getUserByToken(token: string): IUser {
    const userId = BigInt(base64url.decode(token.split(".")[0]));
    const user = UserManager.getUserById(userId, {
      password_hash: true,
      flags: true,
      avatar: true,
      tag: true,
      public_flags: true,
      verified: true,
      bot: true,
    });

    if (!user) {
      throw new Unauthorized();
    }

    const signer = new TimestampSigner(user.password_hash, process.env.TOKEN_KEY);
    signer.unsign(token);

    return user;
  },
  makeToken(user: IUser): String {
    return new TimestampSigner(user.password_hash, process.env.TOKEN_KEY)
      .sign(Buffer.from(flakeString(user.id)).toString("base64"));
  }
}