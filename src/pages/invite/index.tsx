import MainLayout from '@/components/GeneralComponents/MainLayout';
import { GetServerSideProps } from 'next';

export default function WspaceInvitePage() {
  return <MainLayout>Hello</MainLayout>;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {},
  };
};
