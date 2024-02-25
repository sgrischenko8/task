export function getTimeInMs(dateString) {
  // Parse the input string into a Date object
  const dateObject = new Date(dateString);

  // Get the time in milliseconds
  const timeInMilliseconds = dateObject.getTime();

  return timeInMilliseconds;
}
