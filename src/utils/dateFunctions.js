export function getWeekNumber(date = new Date()) {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;

  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);

  const diff = target - firstThursday;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  return 1 + Math.floor(diff / oneWeek);
}

export function formatDateToDDMMYYYY(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return "Invalid date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
