import { LabelHTMLAttributes } from 'react';
import styles from '../../styles/Form.module.scss';

interface LabelIProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: string;
}

export default function CompoundLabel({ children, htmlFor, size }: LabelIProps) {
  return (
    <label htmlFor={htmlFor} className={`${styles.formContainer__label} labelSettings`}>
      {children}
      <style jsx>
        {`
          .labelSettings {
            ${size && `font-size: ${size}`}
          }
        `}
      </style>
    </label>
  );
}
