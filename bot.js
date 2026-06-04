// src/bot.js
const { Telegraf, session } = require('telegraf');

const { startCommand } = require('./handlers/start.handler');
const { handleMenu } = require('./handlers/menu.handler');
const purchase = require('./handlers/purchase.handler');
const { showUsage } = require('./handlers/usage.handler');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

bot.start(startCommand);

bot.hears('خرید سرویس جدید 🚀', purchase.showPurchaseMenu);
bot.hears(['سرویس های من 🔷', 'تمدید سرویس 🔰', 'اطلاعات بیشتر ℹ️', 'پشتیبانی 📞'], handleMenu);
bot.hears('میزان مصرف ⌛', showUsage);

bot.action('server_list', purchase.backToServerList);
bot.action('international_internet', purchase.showInternationalPlans);
bot.action('domestic_internet', purchase.showDomesticPlans);

purchase.registerPurchaseActions(bot);
bot.action(/send_receipt_(.+)/, purchase.handleSendReceipt);

bot.on('text', purchase.handleUsernameInput);
bot.on(['photo', 'document'], purchase.handleReceiptUpload);

module.exports = bot;
