import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import AuthLayout from './AuthLayout';
import Head from 'next/head';

export default function Error({ error }: { error: FetchBaseQueryError | string }) {
  return (
    <AuthLayout>
      <Head>
        <title>Ошибка запроса | Eventify</title>
        <meta title="description" content="Страница недоступна" />
      </Head>
      <div>Ошибка: {typeof error === 'string' ? 'Ошибка запроса' : error.status}</div>
    </AuthLayout>
  );
}
