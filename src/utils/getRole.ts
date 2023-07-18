export default function getRole(roleId: number): string {
  switch (roleId) {
    case 1:
      return 'Администратор';
    case 2:
      return 'Модератор';
    case 3:
      return 'Только чтение';
    default:
      return 'Основатель';
  }
}
