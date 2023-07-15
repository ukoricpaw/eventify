import Head from 'next/head';
import { wrapper } from '@/store';
import { useAppSelector } from '@/hooks/reduxHooks';
import { userSelector } from '@/store/slices/userSlice';
import AuthLayout from '@/components/GeneralComponents/AuthLayout';
import styles from '../styles/Home.module.scss';
import rightHeaderImage from '../assets/images/rightHeaderSection.png';
import Image from 'next/image';
import CompoundButton from '@/components/FormComponents/CompoundButton';
import { useRouter } from 'next/router';

export default function Home() {
  const { isAuth, userData } = useAppSelector(userSelector);
  const router = useRouter();
  const navigateToRegister = () => {
    router.push('/auth/registration');
  };

  const navigateToWspace = () => {
    router.push(`/users/${userData.id}/dashboard`);
  };

  return (
    <AuthLayout>
      <Head>
        <title>Eventify</title>
        <meta title="description" content="this is my homepage" />
      </Head>
      <header className={styles.headerSection}>
        <div className={styles.headerSection__leftContainer}>
          <h1 className={styles.leftContainer__title}>
            Добро пожаловать в <span className={styles.titleAccent}>Eventify</span> - твоё удобное приложение для
            организации и управления событиями!
          </h1>
          <CompoundButton variant="success" mt={'40'} onClick={isAuth ? navigateToWspace : navigateToRegister}>
            {isAuth ? 'Войти в систему' : 'Зарегистрироваться'}
          </CompoundButton>
        </div>
        <Image
          className={styles.rightHeaderImage}
          src={rightHeaderImage}
          priority
          width={575}
          height={572}
          alt="rightHeaderImage"
        />
      </header>
    </AuthLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  return {
    props: {},
  };
});
