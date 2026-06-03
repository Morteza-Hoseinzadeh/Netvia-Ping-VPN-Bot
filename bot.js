// src/bot.js
const { Telegraf, session } = require('telegraf');

const { startCommand } = require('./handlers/start.handler');
const { handleMenu } = require('./handlers/menu.handler');
const purchase = require('./handlers/purchase.handler');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

// Start Command
bot.start(startCommand);

/* ------------------------------ START BUY NEW SERVICE CODES ------------------------------ */

// Menu Commands
bot.hears('خرید سرویس جدید 🚀', purchase.showBuyMenu);
bot.hears(['اکانت تست (به زودی) 🔷', 'تمدید سرویس 🔰', 'میزان مصرف ⌛', 'اطلاعات بیشتر ℹ️', 'پشتیبانی 📞'], handleMenu);

// Buy Flow
bot.action('server_list', purchase.backToServerList);
bot.action('international_internet', purchase.showInternationalPlans);
bot.action('domestic_internet', purchase.showDomesticPlans);

purchase.registerBuyActions(bot);

bot.action(/send_receipt_(.+)/, purchase.handleSendReceipt);

// Username Input & Receipt
bot.on('text', purchase.handleUsername);
bot.on(['photo', 'document'], purchase.handleReceiptUpload);

/* ------------------------------ END BUY NEW SERVICE CODES ------------------------------ */

module.exports = bot;
