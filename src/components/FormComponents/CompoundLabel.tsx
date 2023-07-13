import { LabelHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface LabelIProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function CompoundLabel({ children, htmlFor }: LabelIProps) {
  return (
    <label htmlFor={htmlFor} className={styles.formContainer__label}>
      {children}
    </label>
  );
}
