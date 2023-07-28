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
      return `${userEmail} проинициализировал(-а) доску с именем '${firstItem}'`;
    case 3:
      return `${userEmail} обновил(-а) доску '${firstItem}'`;
    case 4:
      return `${userEmail} создал(-а) колонну с именем '${firstItem}'`;
    case 6:
      return `${userEmail} удалил(-а) колонну '${firstItem}'`;
    case 7:
      return `${userEmail} заархивировал(-а)колонну '${firstItem}'`;
    case 8:
      return `${userEmail} переименовал(-а) колонну '${firstItem}' в '${secondItem}'`;
    case 9:
      return `${userEmail} добавил(-а) описание к колонне '${firstItem}'`;
    case 10:
      return `${userEmail} создал(-а) задание '${firstItem}'`;
    case 11:
      return `${userEmail} добавил(-а) дедлайн до '${secondItem}' к заданию '${firstItem}'`;
    case 12:
      return `${userEmail} переименовал(-а) задание '${firstItem}' в '${secondItem}'`;
    case 13:
      return `${userEmail} добавил(-а) описание к заданию '${firstItem}'`;
    case 14:
      return `${userEmail} удалил(-а) задание '${firstItem}'`;
    case 15:
      return `${userEmail} разархивировал(-а) колонну '${firstItem}'`;
    default:
      return;
  }
}
