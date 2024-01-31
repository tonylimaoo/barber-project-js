export const subtractMinutes = (date, minutes) => {
  date.setMinutes(date.getMinutes() - minutes);
  return date;
}

export const subtractHours = (date, hours) => {
  date.setHours(date.getHours() - hours);

  return date;
}