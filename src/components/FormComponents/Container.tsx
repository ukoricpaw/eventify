import { ReactNode } from 'react';
import styles from '../../styles/Form.module.scss';

interface ContainerIProps {
  children: ReactNode;
  display?: 'flex' | 'column';
}

export default function Container({ children, display }: ContainerIProps) {
  return (
    <div className={`${styles.form__formContainer} settingsContainer`}>
      {children}
      <style jsx>
        {`
          .settingsContainer {
            ${display && `flex-direction: ${display}; align-items: flex-start; gap: 12px`}
          }
        `}
      </style>
    </div>
  );
}
