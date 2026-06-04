// src/utils/helpers.js
function generatePackagesKeyboard(plans, type) {
  return plans.map((plan) => {
    const name = plan.package.split(' ')[2];
    return [
      { text: plan.price, callback_data: `buy_${type}_${name}gb` },
      { text: plan.package, callback_data: `buy_${type}_${name}gb` },
    ];
  });
}

module.exports = { generatePackagesKeyboard };
