import MainLayout from '@/components/GeneralComponents/MainLayout';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function WspaceInvitePage() {
  const { query } = useRouter();

  return <MainLayout>{query.link}</MainLayout>;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {},
  };
};
