// src/utils/subscription?.js
function parseSubscriptionUserInfo(userInfo) {
  if (!userInfo) return null;

  const download = Number(userInfo.match(/download=([\d]+)/)?.[1] || 0);
  const total = Number(userInfo.match(/total=([\d]+)/)?.[1] || 0);
  const expireTimestamp = Number(userInfo.match(/expire=([\d]+)/)?.[1] || 0);

  const usedGB = (download / 1024 ** 3).toFixed(2);
  const totalGB = (total / 1024 ** 3).toFixed(2);
  const remainingGB = ((total - download) / 1024 ** 3).toFixed(2);

  let expiry = 'نامشخص';
  if (expireTimestamp) {
    expiry = new Date(expireTimestamp * 1000).toLocaleDateString('fa-IR');
  }

  return { usedGB: parseFloat(usedGB), totalGB: parseFloat(totalGB), remainingGB: parseFloat(remainingGB), expiry };
}

module.exports = { parseSubscriptionUserInfo };
