import { BiArchive, BiHistory } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';

export type activeType = 'history' | 'archive' | 'settings';
type BtnsType = {
  title: string;
  type: activeType;
  icon: any;
};

export default function useDeskAsideButtons() {
  const result: BtnsType[] = [
    {
      title: 'Рабочее пространство',
      type: 'settings',
      icon: <IoIosSettings size={20} />,
    },
    {
      title: 'История',
      type: 'history',
      icon: <BiHistory size={20} />,
    },
    {
      title: 'Архив',
      type: 'archive',
      icon: <BiArchive size={20} />,
    },
  ];
  return result;
}
