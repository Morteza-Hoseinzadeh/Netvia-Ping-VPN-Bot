// src/handlers/buyHandler.js
const { serversListKeyboard } = require('../keyboards/keyboards');
const { generatePackagesKeyboard } = require('../utils/helpers');
const constants = require('../config/constants');

const { international_internet_table, domestic_internet_table, CARD_NUMBER, CARD_OWNER } = constants;

let selectedService = {};
let serviceName = '';

async function showBuyMenu(ctx) {
  await ctx.sendChatAction('typing');
  await ctx.reply('پنل مورد نظر خود را انتخاب کنید:', { reply_markup: serversListKeyboard.reply_markup });
}

async function backToServerList(ctx) {
  await ctx.sendChatAction('typing');
  await ctx.editMessageText('پنل مورد نظر خود را انتخاب کنید:', { reply_markup: serversListKeyboard.reply_markup });
}

async function showInternationalPlans(ctx) {
  await ctx.editMessageText(
    `💰 تعرفه‌های Netvia VPN

⚠️ خرید سرویس به منزله پذیرش قوانین است.

• کیفیت سرویس ممکن است تحت تأثیر محدودیت‌های اینترنت کشور قرار گیرد.
• اختلالات ناشی از اپراتورها و اینترنت بین‌الملل خارج از مسئولیت ماست.
• بازگشت وجه تنها پس از بررسی پشتیبانی امکان‌پذیر است.

🛒 پلن مورد نظر خود را انتخاب کنید:

🔷 به دلیل نا پایداری اینترنت کشور تمامی پکیج ها به صورت ماهانه محاسبه میشود 🔷
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'قیمت ها', callback_data: 'prices_table' },
            { text: 'تعرفه ها', callback_data: 'packages_table' },
          ],
          ...generatePackagesKeyboard(international_internet_table, 'international'),
          [{ text: '🏡 بازگشت به لیست سرویس ها', callback_data: 'server_list' }],
        ],
      },
    }
  );
}

async function showDomesticPlans(ctx) {
  await ctx.editMessageText(
    `💰 تعرفه‌های Netvia VPN | اینترنت اضطراری

🇮🇷 مناسب زمان اختلال یا محدودیت اینترنت بین‌الملل

✅ قابل استفاده بر بستر اینترنت ملی (National Information Network)
🌍 امکان دسترسی به اینترنت جهانی در شرایط محدودیت
⚡ پینگ و پایداری مناسب
📱 سازگار با تمامی دستگاه‌ها

💡 این سرویس به‌صورت ویژه برای شرایطی طراحی شده است که دسترسی به اینترنت بین‌الملل با اختلال یا محدودیت مواجه شود.

🛒 پلن مورد نظر خود را انتخاب کنید:
`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'قیمت ها', callback_data: 'prices_table' },
            { text: 'تعرفه ها', callback_data: 'packages_table' },
          ],
          ...generatePackagesKeyboard(domestic_internet_table, 'domestic'),
          [{ text: '🏡 بازگشت به لیست سرویس ها', callback_data: 'server_list' }],
        ],
      },
    }
  );
}

// Register Buy Actions
function registerBuyActions(bot) {
  international_internet_table.forEach((plan) => {
    const cb = plan.id;
    bot.action(cb, async (ctx) => {
      await ctx.deleteMessage();
      selectedService = plan;
      await ctx.reply(
        `🛒 سرویس مورد نظر شما انتخاب شد.

📦 پلن: ${plan.package}
💰 قیمت: ${plan.price}

👤 لطفاً یک نام کاربری با حروف لاتین و حداکثر 20 کاراکتر وارد نمایید: 👇`
      );
    });
  });

  domestic_internet_table.forEach((plan) => {
    const cb = plan.id;
    bot.action(cb, async (ctx) => {
      await ctx.deleteMessage();
      selectedService = plan;
      await ctx.reply(
        `🛒 سرویس مورد نظر شما انتخاب شد.

📦 پلن: ${plan.package}
💰 قیمت: ${plan.price}

👤 لطفاً یک نام کاربری با حروف لاتین و حداکثر 20 کاراکتر وارد نمایید: 👇`
      );
    });
  });
}

async function handleUsername(ctx) {
  if (!selectedService?.package) return;

  const username = ctx.message.text.trim();
  await ctx.sendChatAction('typing');

  if (!/^[a-zA-Z0-9_]{1,20}$/.test(username)) {
    return await ctx.reply('نام کاربری نامعتبر است. لطفاً یک نام کاربری با حروف لاتین و حداکثر 20 کاراکتر وارد نمایید.');
  }

  serviceName = username;

  await ctx.reply(
    `✅ سفارش شما با موفقیت ثبت شد.

📦 سرویس:
${selectedService.package}

👤 نام کاربری:
${serviceName}

━━━━━━━━━━━━━━━

💳 شماره کارت:
\`${CARD_NUMBER}\`

👨‍💼 به نام:
${CARD_OWNER}

💰 مبلغ قابل پرداخت:
\`${selectedService.price}\`

━━━━━━━━━━━━━━━

⚠️ لطفاً مبلغ فوق را به شماره کارت اعلام‌شده واریز کرده و سپس روی دکمه «ارسال رسید پرداخت» کلیک نمایید.`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: '📤 ارسال رسید پرداخت', callback_data: `send_receipt_${serviceName}` }]],
      },
    }
  );
}

const waitingForReceipt = new Map();

async function handleSendReceipt(ctx) {
  const username = ctx.match[1];
  waitingForReceipt.set(ctx.from.id, { username, service: selectedService });
  await ctx.reply('📤 لطفاً تصویر یا فایل رسید پرداخت خود را ارسال نمایید:');
}

async function handleReceiptUpload(ctx) {
  const userData = waitingForReceipt.get(ctx.from.id);
  if (!userData) return;

  let fileId = ctx.message.photo ? ctx.message.photo.at(-1).file_id : ctx.message.document?.file_id;

  console.log('Receipt File ID:', fileId);

  waitingForReceipt.delete(ctx.from.id);

  await ctx.reply('✅ رسید پرداخت با موفقیت دریافت شد.\n\nتیم پشتیبانی در اسرع وقت رسید شما را بررسی کرده و نتیجه را اطلاع خواهد داد.');
}

module.exports = {
  showBuyMenu,
  backToServerList,
  showInternationalPlans,
  showDomesticPlans,
  registerBuyActions,
  handleUsername,
  handleSendReceipt,
  handleReceiptUpload,
};
