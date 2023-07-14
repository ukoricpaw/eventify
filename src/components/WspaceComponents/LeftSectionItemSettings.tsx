import { CgUserList } from 'react-icons/cg';
import { BiTable } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';
import styles from '../../styles/WorkingSpace.module.scss';
import { MouseEvent, ReactNode } from 'react';

export interface ItemsInterface {
  icon: ReactNode;
  content: string;
}

const ItemList: ItemsInterface[] = [
  {
    icon: <CgUserList size={25} color="gray" />,
    content: 'Участники',
  },
  {
    icon: <BiTable size={25} color="gray" />,
    content: 'Доски',
  },
  {
    icon: <IoIosSettings size={25} color="gray" />,
    content: 'Настройки',
  },
];

export default function LeftSectionItemSettings({ wspaceId }: { wspaceId: number }) {
  const handleStopPropogation = (e: MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
  };

  return (
    <ul className={styles.itemSettings} onClick={handleStopPropogation}>
      {ItemList.map(item => {
        return (
          <li className={styles.settingItem} key={item.content}>
            {item.icon}
            <p className={styles.settingContent}>{item.content}</p>
          </li>
        );
      })}
    </ul>
  );
}
