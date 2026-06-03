// src/handlers/menuHandler.js
async function handleMenu(ctx) {
  const text = ctx.message.text;

  if (text === 'اکانت تست (به زودی) 🔷') {
    await ctx.reply('این بخش به زودی فعال خواهد شد.');
  } else if (text === 'تمدید سرویس 🔰') {
    await ctx.reply('بخش تمدید سرویس');
  } else if (text === 'میزان مصرف ⌛') {
    await ctx.reply('بخش میزان مصرف');
  } else if (text === 'اطلاعات بیشتر ℹ️') {
    await ctx.reply('بخش اطلاعات بیشتر');
  } else if (text === 'پشتیبانی 📞') {
    await ctx.reply('برای ارتباط با پشتیبانی:\n@NetviaPingSupport');
  }
}

module.exports = { handleMenu };
