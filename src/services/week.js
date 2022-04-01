export const getWeekDay = (i) => {
  const arrayOfWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return arrayOfWeekdays[date.getDay()];
};
