// this function not make sense, coz not represent all actuals rooms. its just show all apartments which have been booked in the past

export function getApartments(array) {
  // Use a Set to store unique names
  const uniqueNamesSet = new Set();

  // Iterate through the orders array and add unique names to the set
  array.forEach((order) => {
    const room = order.roomDetails;
    if (room && room.name) {
      uniqueNamesSet.add(room.name);
    }
  });

  // Convert the set to an array
  const uniqueNamesArray = Array.from(uniqueNamesSet);

  return uniqueNamesArray;
}
