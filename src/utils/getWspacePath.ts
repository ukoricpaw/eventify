export type SinglePath = 'settings' | 'members' | 'desks';

export default function getWspacePath(path: SinglePath) {
  switch (path) {
    case 'desks':
      return 'Доски';
    case 'members':
      return 'Участники';
    case 'settings':
      return 'Настройки';
    default:
      return 'Доски';
  }
}
