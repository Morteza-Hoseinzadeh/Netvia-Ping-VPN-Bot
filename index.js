require('dotenv').config();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot
  .launch()
  .then(() => {
    console.log('Bot is up and running!');
  })
  .catch((error) => {
    console.error('Error launching the bot:', error);
  });
