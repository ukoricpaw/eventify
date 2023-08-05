export default function getDate(date: string | number, type?: 'onlyDate' | 'onlyTime' | 'dateTime', sep?: boolean) {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  let separator = '.';
  if (sep) {
    separator = '-';
  }
  const returnedDate = `${year}${separator}${month + 1 < 10 ? `0${month + 1}` : month + 1}${separator}${
    day < 10 ? `0${day}` : day
  }`;

  const returnedTime = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

  switch (type) {
    case 'onlyDate':
      return returnedDate;
    case 'onlyTime':
      return returnedTime;
    case 'dateTime':
      return [returnedDate, returnedTime];
    default:
      return `${day < 10 ? `0${day}` : day}.${month + 1 < 10 ? `0${month + 1}` : month + 1}.${year} - ${
        hours < 10 ? `0${hours}` : hours
      }:${minutes < 10 ? `0${minutes}` : minutes}`;
  }
}
