import { CgUserList } from 'react-icons/cg';
import { BiTable } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';

export default function useItemSettings(size: number, color: string, roleId: number) {
  const settingsArr = [
    {
      name: 'members',
      icon: <CgUserList size={size} color={color} />,
      content: 'Участники',
    },
    {
      name: 'desks',
      icon: <BiTable size={size} color={color} />,
      content: 'Доски',
    },
    {
      name: 'settings',
      icon: <IoIosSettings size={size} color={color} />,
      content: 'Настройки',
    },
  ];
  if (roleId !== 1) {
    settingsArr.pop();
  }

  return settingsArr;
}
