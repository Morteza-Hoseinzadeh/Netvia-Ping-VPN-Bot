// src/handlers/menu.handler.js
async function handleMenu(ctx) {
  const text = ctx.message.text;

  switch (text) {
    case 'سرویس های من 🔷':
      await ctx.reply('این بخش به زودی فعال خواهد شد.');
      break;
    case 'تمدید سرویس 🔰':
      await ctx.reply('بخش تمدید سرویس');
      break;
    case 'اطلاعات بیشتر ℹ️':
      await ctx.reply('بخش اطلاعات بیشتر');
      break;
    case 'پشتیبانی 📞':
      await ctx.reply('برای ارتباط با پشتیبانی:\n@NetviaPingSupport');
      break;
  }
}

module.exports = { handleMenu };
