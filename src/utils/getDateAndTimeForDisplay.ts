import { getLocaleFullDateString } from './getLocaleDateString';
import getDate from './getDate';

export default function getDateAndTimeForDisplay(fullDate: Date) {
  const fullDateInISOString = fullDate.toISOString();
  const deadlineDate = getLocaleFullDateString(fullDateInISOString);
  const time = getDate(fullDateInISOString, 'onlyTime');
  const date = getDate(fullDateInISOString, 'onlyDate', true);
  return [time, date, deadlineDate];
}
