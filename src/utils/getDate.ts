export default function getDate(date: string) {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return `${day < 10 ? `0${day}` : day}.${month + 1 < 10 ? `0${month + 1}` : month + 1}.${newDate.getFullYear()} - ${
    hours < 10 ? `0${hours}` : hours
  }:${minutes < 10 ? `0${minutes}` : minutes}`;
}
