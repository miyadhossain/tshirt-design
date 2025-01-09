export function formatDateTime(isoString: string): string {
  // Convert the input string to a Date object
  const date = new Date(isoString);

  // Extract the date components
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year: number = date.getFullYear();

  // Format the time in 12-hour format
  let hours: number = date.getHours();
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const amPm: string = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 or 12-hour to 12-hour format

  // Combine the formatted date and time
  return `${day}-${month}-${year} ${hours}:${minutes} ${amPm}`;
}
