// src/handlers/usage.handler.js
async function showUsage(ctx) {
  await ctx.sendChatAction('typing');
  await ctx.reply('میزان مصرف');
}

module.exports = { showUsage };
