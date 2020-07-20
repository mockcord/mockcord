import { snowflake } from '@mockcord/util';

export interface IIcon {
  id: string;
  owner: snowflake;
  scope: string;
  mime: string;
}