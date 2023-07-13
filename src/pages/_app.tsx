import type { AppProps } from 'next/app';
import '../styles/global.scss';
import { wrapper } from '@/store';
import { Provider } from 'react-redux';
import nookies from 'nookies';
import checkAuthThunk from '@/store/thunks/checkAuthThunk';
function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ctx => {
  let pageProps = {};
  const { accessToken } = nookies.get(ctx.ctx, { path: '/' });
  if (!accessToken) {
    await store.dispatch(checkAuthThunk(ctx.ctx.req?.headers?.cookie as string)).then(res => {
      if (typeof res === 'object') {
        nookies.set(ctx.ctx, 'refreshToken', res.refreshToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          httpOnly: true,
        });
        nookies.set(ctx.ctx, 'accessToken', res.accessToken, {
          maxAge: 60 * 10,
          path: '/',
          httpOnly: true,
        });
      }
    });
  }
  if (ctx.Component.getInitialProps) {
    pageProps = await ctx.Component.getInitialProps(ctx.ctx);
  }
  return {
    pageProps,
  };
});

export default App;
