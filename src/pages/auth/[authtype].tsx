import CompoundButton from '@/components/FormComponents/CompoundButton';
import CompoundInput from '@/components/FormComponents/CompoundInput';
import CompoundLabel from '@/components/FormComponents/CompoundLabel';
import Container from '@/components/FormComponents/Container';
import FormGroup from '@/components/FormComponents/FormGroup';
import Head from 'next/head';
import { useState, useCallback, ChangeEvent, MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import fetchUserThunk from '@/store/thunks/fetchUserThunk';
import { UserBody } from '@/types/userTypes';
import styles from '../../styles/Form.module.scss';
import { useRouter } from 'next/router';
import { wrapper } from '@/store';
import { authError } from '@/store/slices/userSlice';
import AuthLayout from '@/components/GeneralComponents/AuthLayout';

export default function AuthPage({ isLogin }: { isLogin: boolean }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const { isError, isLoading } = useAppSelector(state => state.userReducer);
  const router = useRouter();
  const pageTitle = `${isLogin ? 'Авторизация' : 'Регистрация'} | Eventify`;

  const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [pageTitle]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userBody: UserBody = {
      password,
      email,
    };
    await dispatch(fetchUserThunk(userBody, isLogin ? 'login' : 'reg')).then(res => {
      if (typeof res === 'object') {
        router.push(`/users/${res.user.id}/dashboard`);
      }
    });
  };

  return (
    <AuthLayout>
      <div className={styles.authPage}>
        <Head>
          <title>{pageTitle}</title>
          <meta
            title="description"
            content={
              isLogin
                ? 'Войти для доступа к рабочим пространствам'
                : 'Зарегистрироваться для доступа и добавлению своих рабочих пространств'
            }
          />
        </Head>
        <FormGroup>
          <h1>{isLogin ? 'Войти' : 'Зарегистрироваться'}</h1>
          <Container>
            <CompoundLabel>Email: </CompoundLabel>
            <CompoundInput
              padding={{
                x: '20',
                y: '10',
              }}
              placeholder="Введите email"
              variant="success"
              type="email"
              value={email}
              onChange={handleEmail}
            />
          </Container>
          <Container>
            <CompoundLabel>Пароль: </CompoundLabel>
            <CompoundInput
              padding={{
                x: '20',
                y: '10',
              }}
              placeholder="Введите пароль"
              variant="success"
              type="password"
              value={password}
              onChange={handlePassword}
            />
          </Container>
          <p className={styles.authPage__errorMessage}>{isError && isError}</p>
          <CompoundButton variant="light" disabled={isLoading ? true : false} onClick={handleSubmit}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </CompoundButton>
        </FormGroup>
      </div>
    </AuthLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  const isLogin = ctx.params?.authtype === 'login' ? true : false;
  store.dispatch(authError(null));
  return {
    props: {
      isLogin,
    },
  };
});
