import { snowflake } from '@mockcord/util';
import { IIcon } from './Icon';

export interface IUser {
  id: snowflake;
  username: string;
  discriminator: number;
  avatar: IIcon | null;
  bot?: boolean;
  system?: boolean;
  nsfw_allowed?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_since?: string | null;
  public_flags?: number;
  password_hash?: string;
  phone?: string;
}