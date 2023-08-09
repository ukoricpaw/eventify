export function getLocaleFullDateString(fullDate: string): string {
  if (!fullDate) {
    return '';
  }

  const newDate = new Date(fullDate).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return newDate;
}

export function getLocaleDateWithoutTimeString(fullDate: string): [string, number] {
  const nowDate = new Date();
  const newDate = new Date(fullDate);

  const localedDate = newDate.toLocaleDateString('ru-RU', {
    month: 'short',
    day: 'numeric',
  });

  const timeDiff = newDate.getTime() - nowDate.getTime();
  const dayDiff = timeDiff / (1000 * 3600 * 24);

  return [localedDate, dayDiff];
}
