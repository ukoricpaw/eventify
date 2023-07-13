import { InputHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface InputIProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function CompoundInput({ onChange, type, value }: InputIProps) {
  return <input type={type} value={value} onChange={onChange} className={styles.formContainer__input} />;
}
