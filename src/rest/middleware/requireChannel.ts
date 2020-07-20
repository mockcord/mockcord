import { RequestHandler } from 'express';
import { NotFound } from '../errors';
import { ChannelManager } from '@mockcord/managers';

export const requireChannel: RequestHandler = (req, res, next) => {
  const channelId = req.params.channelId;
  const channel = ChannelManager.getChannelById(channelId);

  if (!channel) {
    throw new NotFound(10003);
  }

  req.channel = channel;

  next();
};

export default requireChannel;