import { ChannelType } from '@mockcord/constants';
import { snowflake, flakeString, make } from '@mockcord/util';
import { IChannel } from '@mockcord/structures';

interface GuildChannelCreateOptions {
  name: string;
  type: ChannelType.GUILD_TEXT | ChannelType.GUILD_VOICE | ChannelType.GUILD_CATEGORY | ChannelType.GUILD_NEWS | ChannelType.GUILD_STORE;
  guild_id: snowflake;
  parent_id?: snowflake;
  permission_overwrites?: [];
}

interface DMChannelCreateOptions {
  recipients: snowflake[];
}

const channels: IChannel[] = [];

export default {
  createGuildChannel(options: GuildChannelCreateOptions): IChannel {
    const channel: IChannel = {
      id: flakeString(make()),
      guild_id: flakeString(options.guild_id),
      parent_id: flakeString(options.parent_id),
      ...options
    }

    return channel;
  },
  getChannelById(id: snowflake) {
    return channels.find(channel => channel.id === id);
  },
}