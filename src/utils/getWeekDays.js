export function getWeekDays(payload, firstDay) {
  let startOfWeek;
  // Create the starting date of the week (Monday)
  if (!payload) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
    );
  } else {
    startOfWeek = new Date(firstDay);
    startOfWeek.setDate(startOfWeek.getDate() + payload);
  }

  // Create an array to store the days of the week
  const weekDays = [];

  // Populate the array with dates from Monday to Sunday
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const formattedDate = day.toISOString().split("T")[0]; // Extract "YYYY-MM-DD"
    weekDays.push(formattedDate);
  }

  return weekDays;
}
