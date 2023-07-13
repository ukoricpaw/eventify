import CompoundButton from '@/components/FormComponents/CompoundButton';
import CompoundInput from '@/components/FormComponents/CompoundInput';
import CompoundLabel from '@/components/FormComponents/CompoundLabel';
import Container from '@/components/FormComponents/Container';
import FormGroup from '@/components/FormComponents/FormGroup';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState, ChangeEvent, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import fetchUserThunk from '@/store/thunks/fetchUserThunk';
import { UserBody } from '@/types/userTypes';
import styles from '../../styles/Form.module.scss';
import { useRouter } from 'next/router';
import { wrapper } from '@/store';
import { authError } from '@/store/slices/userSlice';

export default function AuthPage({ isLogin }: { isLogin: boolean }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const { isError, isLoading } = useAppSelector(state => state.userReducer);
  const router = useRouter();
  const pageTitle = `${isLogin ? 'Авторизация' : 'Регистрация'} | Eventify`;

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userBody: UserBody = {
      password,
      email,
    };
    await dispatch(fetchUserThunk(userBody, isLogin ? 'login' : 'reg')).then(res => {
      if (typeof res === 'string') {
        router.push('/');
      }
    });
  };

  return (
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
          <CompoundInput type="email" value={email} onChange={handleEmail} />
        </Container>
        <Container>
          <CompoundLabel>Пароль: </CompoundLabel>
          <CompoundInput type="password" value={password} onChange={handlePassword} />
        </Container>
        <p className={styles.authPage__errorMessage}>{isError && isError}</p>
        <CompoundButton disabled={isLoading ? true : false} onClick={handleSubmit}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </CompoundButton>
      </FormGroup>
    </div>
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
