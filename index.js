// src/index.js
require('dotenv').config();
const bot = require('./bot');

bot
  .launch()
  .then(() => console.log('🤖 Bot is up and running!'))
  .catch((error) => console.error('Error launching the bot:', error));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
