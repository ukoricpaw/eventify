import { ButtonHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';
interface ButtonIProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'light' | 'success' | 'dark';
  mt?: string;
  padding?: {
    y?: string;
    x?: string;
  };
  size?: string;
  width?: string;
}

export default function CompoundButton({
  width,
  size,
  mt,
  padding,
  variant,
  onClick,
  children,
  disabled,
}: ButtonIProps) {
  let variantClass = 'formContainer__button-light';

  switch (variant) {
    case 'light':
      variantClass = 'formContainer__button-light';
      break;
    case 'dark':
      variantClass = 'formContainer__button-dark';
      break;
    case 'success':
      variantClass = 'formContainer__button-success';
      break;
    default:
      variantClass = 'formContainer__button-success';
      break;
  }

  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${styles[variantClass]} ${styles.formContainer__button} settings buttonContainer`}
      >
        {children}
      </button>
      <style jsx>{`
        .buttonContainer {
          display: flex;
          gap: 10px;
          align-items: center;
          ${width && `width: ${width};`}
        }
        .settings {
          justify-content: center;
          padding: ${padding ? (padding.y ? padding.y : '18') : '18'}px
            ${padding ? (padding.x ? padding.x : '35') : '35'}px;
          ${mt && `margin-top: ${mt}px;`}
          ${size && `font-size: ${size}px;`}
        }
      `}</style>
    </>
  );
}
