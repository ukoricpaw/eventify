import { Dispatch, SetStateAction } from 'react';

export default function changeFullDateByInput(
  fullDate: Date,
  setFullDate: Dispatch<SetStateAction<{ fullDate: Date }>>,
  type: 'time' | 'date',
  inputField: string,
) {
  if (type === 'date') {
    changeFullDateByDate(fullDate, setFullDate, inputField);
  } else {
    changeFullDateByTime(fullDate, setFullDate, inputField);
  }
}

function changeFullDateByTime(
  fullDate: Date,
  setFullDate: Dispatch<SetStateAction<{ fullDate: Date }>>,
  inputField: string,
) {
  const [hours, minutes] = inputField.split(':');
  fullDate.setHours(Number(hours));
  fullDate.setMinutes(Number(minutes));
  setFullDate({ fullDate });
}

function changeFullDateByDate(
  fullDate: Date,
  setFullDate: Dispatch<SetStateAction<{ fullDate: Date }>>,
  inputField: string,
) {
  if (!inputField) {
    let nowFullDate = new Date();
    fullDate.setFullYear(nowFullDate.getFullYear());
    fullDate.setMonth(nowFullDate.getMonth());
    fullDate.setDate(nowFullDate.getDate());
    setFullDate({ fullDate });
  } else {
    const [year, months, days] = inputField.split('-');
    fullDate.setFullYear(Number(year));
    fullDate.setMonth(Number(months) - 1);
    fullDate.setDate(Number(days));
    setFullDate({ fullDate });
  }
}
