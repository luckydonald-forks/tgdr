import Telegraf from 'telegraf';
import config from '../config';
import asyncHandler from './asyncHandler';
import * as auth from './auth';
import * as commands from './commands';
import * as rate from './rate';

const bot = new Telegraf(config.bot_token);

bot.use(asyncHandler(auth.onlyPrivate));
bot.use(asyncHandler(auth.register));
bot.use(asyncHandler(auth.adminCheck));

bot.start(asyncHandler(commands.start));
bot.hears(['💙', '👎'], asyncHandler(rate.likeDislike));
bot.command('/skip', asyncHandler(rate.submit));
bot.command('/rate', asyncHandler(rate.start));
bot.on('text', asyncHandler(rate.reviewText));

bot.use(asyncHandler(auth.clear));

bot.help(commands.help);

bot.command(
  'ban',
  auth.authAdmin,
  auth.setCommandingFlag(true),
  asyncHandler(commands.ban),
  auth.setCommandingFlag(false)
);
bot.command(
  'unban',
  auth.authAdmin,
  auth.setCommandingFlag(true),
  asyncHandler(commands.unban),
  auth.setCommandingFlag(false)
);

bot.startPolling();

export default bot;
