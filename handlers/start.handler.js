// src/handlers/start.handler.js
const { mainKeyboard } = require('../keyboards/keyboards');

async function startCommand(ctx) {
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

  await ctx.reply('یکی از موارد زیر را انتخاب کنید:', mainKeyboard);
}

module.exports = { startCommand };
