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
  gap?: string;
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
  title,
  gap,
  className,
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
        title={title}
        disabled={disabled}
        onClick={onClick}
        className={`${styles[variantClass]} ${className ? className : ''} ${
          styles.formContainer__button
        } settings buttonContainer`}
      >
        {children}
      </button>
      <style jsx>{`
        .buttonContainer {
          display: flex;
          gap: ${gap ? gap : '10'}px;
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
