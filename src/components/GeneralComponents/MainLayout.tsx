import { ReactNode } from 'react';
import OwnNavbar from '@/components/GeneralComponents/OwnNavbar';
import styles from '../../styles/General.module.scss';
import CreateWspaceModalProvider from './CreateWspaceModalProvider';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <CreateWspaceModalProvider>
      <OwnNavbar />
      <main className={styles.mainContainer}>
        <div className={styles.mainWrapper}>{children}</div>
      </main>
    </CreateWspaceModalProvider>
  );
}
