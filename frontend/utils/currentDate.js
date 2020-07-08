const currentDate = new Date();
const options = { weekday: 'long' };
export const currentDateIntl = new Intl.DateTimeFormat('en-US', options).format(
  currentDate
);
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1;
export const currentDay = currentDate.getDate();
export const currentyDayOfWeek = currentDate.getDay();
export const currentHour = currentDate.getHours();
export const currentMinute = currentDate.getMinutes();
export const currentSecond = currentDate.getSeconds();
