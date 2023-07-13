import { ReactNode } from 'react';
import styles from '../../styles/Form.module.scss';

export default function Container({ children }: { children: ReactNode }) {
  return <div className={styles.form__formContainer}>{children}</div>;
}
