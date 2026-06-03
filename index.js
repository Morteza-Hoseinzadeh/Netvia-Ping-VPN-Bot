require('dotenv').config();

const { Telegraf, session } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

const STATES = {
  WAITING_USERNAME: 'WAITING_USERNAME',
  WAITING_RECEIPT: 'WAITING_RECEIPT',
};

bot.start(async (ctx) => {
  await ctx.sendChatAction('typing');
  await ctx.reply(`
🚀 به Netvia VPN خوش اومدی!

از اینکه Netvia VPN رو برای اینترنت سریع، پایدار و امن انتخاب کردی خوشحالیم 💙

📢 اطلاعیه‌ها و آموزش‌ها:
@NetviaPing

🎧 پشتیبانی آنلاین:
@NetviaPingSupport

✨ مزایای سرویس:
⚡ سرعت بالا
🔒 امنیت و حفظ حریم خصوصی
🌍 دسترسی پایدار و بدون محدودیت
📱 سازگار با تمام دستگاه‌ها

در صورت بروز هرگونه مشکل یا سوال، تیم پشتیبانی ما در کنار شماست.

ممنون که Netvia VPN رو انتخاب کردی 🌟
`);

  await ctx.reply('یکی از موارد زیر را انتخاب کنید:', {
    reply_markup: {
      keyboard: [
        [{ text: 'خرید سرویس جدید 🚀' }],
        [{ text: 'اکانت تست (به زودی) 🔷' }],
        [{ text: 'تمدید سرویس 🔰' }, { text: 'میزان مصرف ⌛' }],
        [{ text: 'اطلاعات بیشتر ℹ️' }, { text: 'پشتیبانی 📞' }],
      ],
    },
  });
});

// ------- START BUY NEW SERVICE SECTION -------
const serversListKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '🌐 اینترنت بین المللی (پینگ پایین)',
          callback_data: 'international_internet',
        },
      ],
      [
        {
          text: '🇮🇷 اینترنت داخلی (اختصاصی برای نت ملی)',
          callback_data: 'domestic_internet',
        },
      ],
    ],
  },
};

const international_internet_table = [
  { id: 'buy_international_10gb', package: 'یک ماهه 10 گیگابایت', price: '249,000 تومان' },
  { id: 'buy_international_15gb', package: 'یک ماهه 15 گیگابایت', price: '329,000 تومان' },
  { id: 'buy_international_20gb', package: 'یک ماهه 20 گیگابایت', price: '399,000 تومان' },
  { id: 'buy_international_30gb', package: 'یک ماهه 30 گیگابایت', price: '549,000 تومان' },
  { id: 'buy_international_50gb', package: 'یک ماهه 50 گیگابایت', price: '799,000 تومان' },
  { id: 'buy_international_80gb', package: 'یک ماهه 80 گیگابایت', price: '1,199,000 تومان' },
];

const domestic_internet_table = [
  { id: 'buy_domestic_1gb', package: 'یک ماهه 1 گیگابایت', price: '199,000 تومان' },
  { id: 'buy_domestic_2gb', package: 'یک ماهه 2 گیگابایت', price: '349,000 تومان' },
  { id: 'buy_domestic_3gb', package: 'یک ماهه 3 گیگابایت', price: '549,000 تومان' },
  { id: 'buy_domestic_5gb', package: 'یک ماهه 5 گیگابایت', price: '799,000 تومان' },
  { id: 'buy_domestic_10gb', package: 'یک ماهه 10 گیگابایت', price: '1,399,000 تومان' },
  { id: 'buy_domestic_20gb', package: 'یک ماهه 20 گیگابایت', price: '2,699,000 تومان' },
];

bot.hears('خرید سرویس جدید 🚀', async (ctx) => {
  await ctx.sendChatAction('typing');
  await ctx.reply('پنل مورد نظر خود را انتخاب کنید:', { reply_markup: serversListKeyboard.reply_markup });
});

bot.action('server_list', async (ctx) => {
  await ctx.sendChatAction('typing');
  await ctx.editMessageText('پنل مورد نظر خود را انتخاب کنید:', { reply_markup: serversListKeyboard.reply_markup });
});

function generatePackagesKeyboard(plans, arrName) {
  const rows = [];

  plans.forEach((plan) => {
    const name = plan?.package?.split(' ')[2];

    return rows.push([
      {
        text: plan.price,
        callback_data: `buy_${arrName}_${name}gb`,
      },
      {
        text: plan.package,
        callback_data: `buy_${arrName}_${name}gb`,
      },
    ]);
  });

  return rows;
}

bot.action('international_internet', async (ctx) => {
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
});

bot.action('domestic_internet', async (ctx) => {
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
});

let selectedService = {};
let serviceName = '';

international_internet_table?.map((plan) => {
  bot.action(`buy_international_${plan?.package?.split(' ')[2]}gb`, async (ctx) => {
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

domestic_internet_table?.map((plan) => {
  bot.action(`buy_domestic_${plan?.package?.split(' ')[2]}gb`, async (ctx) => {
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

let username;

if (selectedService) {
  bot.on('text', async (ctx) => {
    username = ctx.message.text.trim();
    await ctx.sendChatAction('typing');

    if (!/^[a-zA-Z0-9_]{1,20}$/.test(username)) {
      return await ctx.reply('نام کاربری نامعتبر است. لطفاً یک نام کاربری با حروف لاتین و حداکثر 20 کاراکتر وارد نمایید.');
    }
    serviceName = username;

    const cardNumber = '6219861839221529';
    const amount = selectedService.price;

    await ctx.reply(
      `✅ سفارش شما با موفقیت ثبت شد.

📦 سرویس:
${selectedService.package}

👤 نام کاربری:
${serviceName}

━━━━━━━━━━━━━━━

💳 شماره کارت:
\`${cardNumber}\`

👨‍💼 به نام:
مرتضی حسین زاده

💰 مبلغ قابل پرداخت:
\`${amount}\`

━━━━━━━━━━━━━━━

⚠️ لطفاً مبلغ فوق را به شماره کارت اعلام‌شده واریز کرده و سپس روی دکمه «ارسال رسید پرداخت» کلیک نمایید.`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '📤 ارسال رسید پرداخت',
                callback_data: `send_receipt_${serviceName}`,
              },
            ],
          ],
        },
      }
    );
  });
}

const waitingForReceipt = new Map();

bot.action(/send_receipt_(.+)/, async (ctx) => {
  const username = ctx.match[1];

  waitingForReceipt.set(ctx.from.id, { username, service: selectedService });

  await ctx.reply('📤 لطفاً تصویر یا فایل رسید پرداخت خود را ارسال نمایید:');
});

bot.on(['photo', 'document'], async (ctx) => {
  const userData = waitingForReceipt.get(ctx.from.id);

  if (!userData) return;

  let fileId;

  if (ctx.message.photo) {
    fileId = ctx.message.photo.at(-1).file_id;
  } else if (ctx.message.document) {
    fileId = ctx.message.document.file_id;
  }

  // اینجا میتونی به ادمین فوروارد کنی
  console.log('Receipt File ID:', fileId);

  waitingForReceipt.delete(ctx.from.id);

  await ctx.reply('✅ رسید پرداخت با موفقیت دریافت شد.\n\nتیم پشتیبانی در اسرع وقت رسید شما را بررسی کرده و نتیجه را اطلاع خواهد داد.');
});

// ------- END BUY NEW SERVICE SECTION -------

bot
  .launch()
  .then(() => {
    console.log('🤖 Bot is up and running!');
  })
  .catch((error) => {
    console.error('Error launching the bot:', error);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
