import { ReactNode } from 'react';
import styles from '../../styles/Form.module.scss';

interface ContainerIProps {
  children: ReactNode;
  display?: 'row' | 'column';
  spaceBetween?: boolean;
  alignItems?: 'flex-start' | 'center';
}

export default function Container({ children, display, spaceBetween, alignItems }: ContainerIProps) {
  return (
    <div className={`${styles.form__formContainer} settingsContainer`}>
      {children}
      <style jsx>
        {`
          .settingsContainer {
            ${display &&
            `flex-direction: ${display}; align-items: ${alignItems ?? 'flex-start'};
            ${spaceBetween ? 'justify-content: space-between; gap: 0;' : 'gap: 12px;'}

            `}
          }
        `}
      </style>
    </div>
  );
}
