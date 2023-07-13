import Head from 'next/head';
import Link from 'next/link';
import { wrapper } from '@/store';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Eventify</title>
        <meta title="description" content="this is my hompage" />
      </Head>
      <Link href={'/auth/login'}>Hello</Link>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  return {
    props: {},
  };
});
