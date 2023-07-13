import { wrapper } from '@/store';

export default function WspacePage() {
  return <div>wspace</div>;
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  const cookieCondition = Boolean(ctx.req.cookies.accessToken) && Boolean(ctx.req.cookies.refreshToken);
  if (!cookieCondition) {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
});
