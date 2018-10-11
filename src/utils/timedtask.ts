export function getDay(num, str = '/') {
  const today = new Date();
  const nowTime = today.getTime();
  const ms = 24 * 3600 * 1000 * num;
  const setTime = nowTime + ms;
  today.setTime(setTime);
  const oYear = today.getFullYear();
  let oMoth = (today.getMonth() + 1).toString();
  if (oMoth.length <= 1) oMoth = '0' + oMoth;
  let oDay = today.getDate().toString();
  if (oDay.length <= 1) oDay = '0' + oDay;
  return oYear + str + oMoth + str + oDay;
}
console.log(__dirname, getDay(-1));
