import { ReactNode } from 'react';
import OwnNavbar from '@/components/GeneralComponents/OwnNavbar';
import styles from '../../styles/General.module.scss';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OwnNavbar />
      <main className={styles.mainContainer}>
        <div className={styles.mainWrapper}>{children}</div>
      </main>
    </>
  );
}
