require('dotenv').config();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

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

const international_internet_prices = [
  { package: '۱۰ گیگ', price: '۲۵۰,۰۰۰ تومان' },
  { package: '۲۰ گیگ', price: '۴۰۰,۰۰۰ تومان' },
  { package: '۵۰ گیگ', price: '۱,۰۰۰,۰۰۰ تومان' },
  { package: '۱۰ گیگ', price: '۲۵۰,۰۰۰ تومان' },
  { package: '۲۰ گیگ', price: '۴۰۰,۰۰۰ تومان' },
  { package: '۵۰ گیگ', price: '۱,۰۰۰,۰۰۰ تومان' },
];

bot.hears('خرید سرویس جدید 🚀', async (ctx) => {
  await ctx.sendChatAction('typing');
  await ctx.reply('پنل مورد نظر خود را انتخاب کنید:', { reply_markup: serversListKeyboard.reply_markup });
});

bot.action('server_list', async (ctx) => {
  await ctx.sendChatAction('typing');
  await ctx.editMessageText('پنل مورد نظر خود را انتخاب کنید:', { reply_markup: serversListKeyboard.reply_markup });
});

function generatePackagesKeyboard(plans) {
  const rows = [];

  for (let i = 0; i < plans.length; i += 2) {
    rows.push(
      plans.slice(i, i + 2).map((plan) => ({
        text: `${plan.package} | ${plan.price}`,
        callback_data: `buy_${plan.id}`,
      }))
    );
  }

  return rows;
}

let selectedService = {};
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
          ...generatePackagesKeyboard(international_internet_prices),
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
          ...generatePackagesKeyboard(international_internet_prices),
          [{ text: '🏡 بازگشت به لیست سرویس ها', callback_data: 'server_list' }],
        ],
      },
    }
  );
});
// ------- END BUY NEW SERVICE SECTION -------

bot.hears('اکانت تست (به زودی) 🔷', async (ctx) => {
  await ctx.reply('این بخش به زودی فعال خواهد شد.');
});

bot.hears('تمدید سرویس 🔰', async (ctx) => {
  await ctx.reply('بخش تمدید سرویس');
});

bot.hears('میزان مصرف ⌛', async (ctx) => {
  await ctx.reply('بخش میزان مصرف');
});

bot.hears('اطلاعات بیشتر ℹ️', async (ctx) => {
  await ctx.reply('بخش اطلاعات بیشتر');
});

bot.hears('پشتیبانی 📞', async (ctx) => {
  await ctx.reply('برای ارتباط با پشتیبانی:\n@NetviaPingSupport');
});

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
