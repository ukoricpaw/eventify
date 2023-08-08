export default function getLocaleDateString(fullDate: string): string {
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
