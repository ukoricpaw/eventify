import { FormHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface FormGroupIProps extends FormHTMLAttributes<HTMLFormElement> {}

export default function FormGroup({ children }: FormGroupIProps) {
  return <form className={styles.form}>{children}</form>;
}
