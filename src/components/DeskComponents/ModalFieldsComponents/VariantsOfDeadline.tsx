import styles from '../../../styles/Modal.module.scss';
import { variantsOfDeadline, DeadlineType } from '@/utils/getVariantsOfDeadline';

interface VariantsOfDeadlineIProps {
  setDateByVariant: (type: DeadlineType, value: number) => void;
}

export default function VariantsOfDeadline({ setDateByVariant }: VariantsOfDeadlineIProps) {
  return (
    <ul className={styles.variantsDeadlineList}>
      {variantsOfDeadline.map((item, index) => (
        <li
          className={styles.variantsDeadlineItem}
          onClick={() => setDateByVariant(item.type, Number(item.value.split(' ')[0]))}
          key={index}
        >
          {item.value}
        </li>
      ))}
    </ul>
  );
}
