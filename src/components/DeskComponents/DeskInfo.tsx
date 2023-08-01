import styles from '../../styles/Desk.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getDeskInfo } from '@/store/selectors/deskSelectors';

export default function DeskInfo() {
  const deskInfo = useAppSelector(getDeskInfo);

  return (
    <section className={styles.deskInfo}>
      <div className={styles.deskInfo__wrapper}>
        <h2 className={styles.deskInfo__name}>{deskInfo.name}</h2>
        {deskInfo.description && <p className={styles.deskInfo__description}>{deskInfo.description}</p>}
      </div>
    </section>
  );
}
