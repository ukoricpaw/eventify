import { FormHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface FormGroupIProps extends FormHTMLAttributes<HTMLFormElement> {
  gap?: string;
}

export default function FormGroup({ children, gap }: FormGroupIProps) {
  return (
    <form style={gap ? { gap: gap } : {}} className={styles.form}>
      {children}
    </form>
  );
}
