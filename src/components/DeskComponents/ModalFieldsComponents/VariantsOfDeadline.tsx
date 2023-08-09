import styles from '../../../styles/Desk.module.scss';
import { variantsOfDeadline, DeadlineType } from '@/utils/getVariantsOfDeadline';

interface VariantsOfDeadlineIProps {
  setDateByVariant: (type: DeadlineType, value: number) => void;
}

export default function VariantsOfDeadline({ setDateByVariant }: VariantsOfDeadlineIProps) {
  return (
    <ul className={styles.variantsDeadlineList}>
      {variantsOfDeadline.map((item, index) => (
        <li className={styles.variantsDeadlineItem} onClick={() => setDateByVariant(item.type, item.value)} key={index}>
          {item.value} {item.inLocale}
        </li>
      ))}
    </ul>
  );
}
