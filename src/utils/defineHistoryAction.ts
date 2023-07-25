import { DeskAct } from '@/types/deskTypes';

export type ActType = {
  act: DeskAct;
  firstItem: string;
  secondItem: string | null;
  userEmail: string;
};

export default function defineHistoryAction(deskAct: ActType) {
  const userEmail =
    deskAct.userEmail.slice(0, deskAct.userEmail.indexOf('@')).length > 15
      ? `${deskAct.userEmail.slice(0, 15)}...`
      : deskAct.userEmail.slice(0, deskAct.userEmail.indexOf('@'));

  const firstItem = deskAct.firstItem.length > 10 ? `${deskAct.firstItem.slice(0, 10)}...` : deskAct.firstItem;
  const secondItem = deskAct.secondItem
    ? deskAct.secondItem.length > 10
      ? `${deskAct.secondItem.slice(0, 10)}...`
      : deskAct.secondItem
    : null;
  switch (deskAct.act.id) {
    case 2:
      return `${userEmail} проинициализировал доску с именем '${firstItem}'`;
    case 3:
      return `${userEmail} обновил доску '${firstItem}'`;
    case 4:
      return `${userEmail} создал колонну с именем '${firstItem}'`;
    case 6:
      return `${userEmail} удалил колонну '${firstItem}'`;
    case 7:
      return `${userEmail} заархивировал колонну '${firstItem}'`;
    case 8:
      return `${userEmail} переименовал колонну '${firstItem}' в '${secondItem}'`;
    case 9:
      return `${userEmail} добавил описание к колонне '${firstItem}'`;
    case 10:
      return `${userEmail} создал задание '${firstItem}'`;
    case 11:
      return `${userEmail} добавил дедлайн до '${secondItem}' к заданию '${firstItem}'`;
    case 12:
      return `${userEmail} переименовал задание '${firstItem}' в '${secondItem}'`;
    case 13:
      return `${userEmail} добавил описание к заданию '${firstItem}'`;
    case 14:
      return `${userEmail} удалил задание '${firstItem}'`;
    case 15:
      return `${userEmail} разархивировал колонну '${firstItem}'`;
    default:
      return;
  }
}
