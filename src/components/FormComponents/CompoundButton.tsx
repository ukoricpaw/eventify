import { ButtonHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface ButtonIProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CompoundButton({ onClick, children, disabled }: ButtonIProps) {
  return (
    <>
      <button disabled={disabled} onClick={onClick} className={styles.formContainer__button}>
        {children}
      </button>
      {/* <style jsx>{}</style> */}
    </>
  );
}
