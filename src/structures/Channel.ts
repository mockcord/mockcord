import { snowflake } from '@mockcord/util';
import { IUser } from '.';

export interface IChannel {
  id: snowflake;
  type: number;
  guild_id?: snowflake;
  //guild?: IGuild;
  position?: number;
  //permission_overwrites?: IOverwrite[]; //TODO: Put this in seperate DB
  name?: string;
  topic?: string;
  nsfw?: boolean;
  origin_channel_id?: boolean;
  last_message_id?: snowflake;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: snowflake[];
  icon?: string;
  owner_id?: snowflake;
  application_id?: snowflake;
  parent_id?: snowflake;
  last_pin_timestamp?: string;
}
