import styles from '../../styles/Desk.module.scss';
import { FaInfo } from 'react-icons/fa';

export default function MoreInfoWrapper() {
  return (
    <div className={styles.moreInfoWrapper} onClick={e => e.stopPropagation()}>
      <h3 className={styles.moreInfoWrapper__title}>Действия с колонной</h3>
      <ul className={styles.moreInfoList}>
        <li className={styles.moreInfoList__item}>
          <FaInfo size={12} /> Информация о колонне...
        </li>
      </ul>
    </div>
  );
}
