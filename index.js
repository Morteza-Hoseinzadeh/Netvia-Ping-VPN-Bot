// src/index.js
require('dotenv').config();
const bot = require('./bot');

bot
  .launch()
  .then(() => console.log('🤖 Netvia VPN Bot is running!'))
  .catch((err) => console.error(err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
