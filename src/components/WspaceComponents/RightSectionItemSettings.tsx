import styles from '../../styles/WorkingSpace.module.scss';
import ItemTitleWrapper from './ItemTitleWrapper';
import { ItemsInterface } from './LeftSectionItemSettings';
import CompoundButton from '../FormComponents/CompoundButton';
import { CgUserList } from 'react-icons/cg';
import { BiTable } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';

const ItemList: ItemsInterface[] = [
  {
    icon: <CgUserList size={18} color="white" />,
    content: 'Участники',
  },
  {
    icon: <BiTable size={18} color="white" />,
    content: 'Доски',
  },
  {
    icon: <IoIosSettings size={18} color="white" />,
    content: 'Настройки',
  },
];

export default function RightSectionItemSettings({ wspaceName }: { wspaceName: string }) {
  return (
    <div className={styles.rightSection__itemSettings}>
      <ItemTitleWrapper wspace={wspaceName} />
      <ul className={styles.itemSettingsList}>
        {ItemList.map(item => {
          return (
            <CompoundButton padding={{ x: '9', y: '4' }} variant="success" key={item.content}>
              {item.content}
              {item.icon}
            </CompoundButton>
          );
        })}
      </ul>
    </div>
  );
}
