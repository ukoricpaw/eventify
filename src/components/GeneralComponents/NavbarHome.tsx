import styles from '../../styles/General.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';

export default function NavbarHome() {
  const { query } = useRouter();
  const { isAuth, data } = useAppSelector(userSelector);
  const authPathnameCondition = query.authtype === 'login' || query.authtype === 'registration';
  const isLogin = query.authtype === 'login' ? '/auth/registration' : '/auth/login';
  const isUserAuth = isAuth ? `/users/${data.id}/dashboard` : '/auth/login';
  return (
    <nav className={styles.navContainer} aria-label="primary-navigation">
      <ul className={styles.navContainer__list}>
        <Link href="/">
          <li className={styles.leftListItem}>eventify</li>
        </Link>
        <Link href={authPathnameCondition ? isLogin : isUserAuth}>
          <li className={styles.rightListItem}>
            {authPathnameCondition
              ? query.authtype === 'login'
                ? 'Регистрация'
                : 'Войти'
              : 'Ваше рабочее пространство'}
          </li>
        </Link>
      </ul>
    </nav>
  );
}
