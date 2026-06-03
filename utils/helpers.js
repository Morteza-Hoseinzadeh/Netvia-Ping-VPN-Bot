// src/utils/helpers.js
function generatePackagesKeyboard(plans, arrName) {
  const rows = [];
  plans.forEach((plan) => {
    const name = plan?.package?.split(' ')[2];
    rows.push([
      { text: plan.price, callback_data: `buy_${arrName}_${name}gb` },
      { text: plan.package, callback_data: `buy_${arrName}_${name}gb` },
    ]);
  });
  return rows;
}

module.exports = { generatePackagesKeyboard };
