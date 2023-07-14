import styles from '../../styles/WorkingSpace.module.scss';

export default function ItemTitleWrapper({ wspace }: { wspace: string }) {
  return (
    <div className={styles.itemTitleContainer__wrapper}>
      <div className={styles.itemLetter}>{wspace.charAt(0).toUpperCase()}</div>
      <h3 className={styles.itemTitle}>{wspace}</h3>
    </div>
  );
}
