import { InputHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface InputIProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: 'dark' | 'light' | 'success';
  padding?: {
    y?: string;
    x?: string;
  };
}

export default function CompoundInput({ padding, variant, onChange, placeholder, type, value, children }: InputIProps) {
  let inputStyles = ['formContainer__inputContainer-light', 'formContainer__input-light'];

  switch (variant) {
    case 'dark':
      inputStyles = ['formContainer__inputContainer-dark', 'formContainer__input-dark'];
      break;
    case 'success':
      inputStyles = ['formContainer__inputContainer-success', 'formContainer__input-success'];
      break;
    default:
      inputStyles = ['formContainer__inputContainer-light', 'formContainer__input-light'];
      break;
  }

  return (
    <div className={`${styles[inputStyles[0]]} ${styles.formContainer__inputContainer} settings`}>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles[inputStyles[1]]} inputSettings`}
      />
      <style jsx>{`
        .settings {
          padding: ${padding ? (padding.y ? padding.y : '18') : '18'}px
            ${padding ? (padding.x ? padding.x : '35') : '35'}px;
        }

        .inputSettings {
          flex: 1;
        }
      `}</style>
      {children}
    </div>
  );
}
