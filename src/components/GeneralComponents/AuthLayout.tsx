import { ReactNode } from 'react';
import NavbarHome from './NavbarHome';
import styles from '../../styles/Home.module.scss';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavbarHome />
      <main className={styles.mainHomeLayout}>
        <div className={styles.mainHomeLayout__wrapper}>{children}</div>
      </main>
    </>
  );
}
