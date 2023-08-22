import { FormHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface FormGroupIProps extends FormHTMLAttributes<HTMLFormElement> {
  gap?: string;
  width?: string;
}

export default function FormGroup({ children, gap, width }: FormGroupIProps) {
  return (
    <form style={{ gap: gap ?? '', width: width ?? 'initial' }} className={styles.form}>
      {children}
    </form>
  );
}
