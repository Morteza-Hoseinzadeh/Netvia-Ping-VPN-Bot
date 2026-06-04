// src/keyboards/keyboards.js
const mainKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: 'خرید سرویس جدید 🚀' }],
      [{ text: 'سرویس های من 🔷' }],
      [{ text: 'تمدید سرویس 🔰' }, { text: 'میزان مصرف ⌛' }],
      [{ text: 'اطلاعات بیشتر ℹ️' }, { text: 'پشتیبانی 📞' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};

const serversListKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🌐 اینترنت بین المللی (پینگ پایین)', callback_data: 'international_internet' }],
      [{ text: '🇮🇷 اینترنت داخلی (اختصاصی برای نت ملی)', callback_data: 'domestic_internet' }],
    ],
  },
};

module.exports = { mainKeyboard, serversListKeyboard };
