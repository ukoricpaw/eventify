import styles from '../../styles/Desk.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import ContextConsumer from '../GeneralComponents/ContextConsumer';
import { DeskWSocketContext } from './GeneralDeskComponents/DeskWSocketProvider';

interface ArchiveListItemIProps {
  listId: number;
  name: string;
}

export default function ArchiveListItem({ listId, name }: ArchiveListItemIProps) {
  return (
    <li className={styles.archiveList__item}>
      <p className={styles.item__name}>{name} </p>
      <ContextConsumer Context={DeskWSocketContext}>
        {value => (
          <IoIosArrowBack
            className={styles.item__backToDesk}
            onClick={() => value?.emitEvent('archiveColumn')(listId, 'false')}
          />
        )}
      </ContextConsumer>
    </li>
  );
}
