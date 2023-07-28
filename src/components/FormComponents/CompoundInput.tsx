import { InputHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';
import { forwardRef } from 'react';

interface InputIProps extends InputHTMLAttributes<HTMLInputElement> {
  variant: 'dark' | 'light' | 'success';
  padding?: {
    y?: string;
    x?: string;
  };
  width?: string;
  noBrTop?: boolean;
  noBrBottom?: boolean;
  focus?: boolean;
}

export default forwardRef<HTMLInputElement, InputIProps>(function CompoundInput(
  { width, padding, variant, onChange, placeholder, type, value, children, noBrTop, noBrBottom, focus },
  ref,
) {
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
        ref={ref}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles[inputStyles[1]]} inputSettings`}
      />
      <style jsx>{`
        .settings {
          border-top-left-radius: ${noBrTop ? '0' : '10px'};
          border-top-right-radius: ${noBrTop ? '0' : '10px'};
          border-bottom-left-radius: ${noBrBottom ? '0' : '10px'};
          border-bottom-right-radius: ${noBrBottom ? '0' : '10px'};
          padding: ${padding ? (padding.y ? padding.y : '18') : '18'}px
            ${padding ? (padding.x ? padding.x : '35') : '35'}px;
          ${width ? `width: ${width}` : ''}
        }

        .inputSettings {
          flex: 1;
        }

        ${focus && '.inputSettings:focus {border: 1px solid #4eca9d;border-radius: 5px;padding: 5px;}'}
      `}</style>
      {children}
    </div>
  );
});
