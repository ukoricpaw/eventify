import MainLayout from '@/components/GeneralComponents/MainLayout';
import { wrapper } from '@/store';
import { GetServerSideProps } from 'next';
import axios, { isAxiosError } from 'axios';
import nookies from 'nookies';
import { MessageType } from '@/types/wspaceTypes';
import { UserResponse } from '@/types/userTypes';

export default function WspaceInvitePage({ message }: MessageType) {
  return <MainLayout>{message}</MainLayout>;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  const { accessToken, refreshToken } = nookies.get(ctx);
  let token = accessToken;
  try {
    if (!token) {
      const tokens = await axios.get<UserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/user/refresh`, {
        headers: {
          Cookie: `refreshToken=${refreshToken ?? ''}`,
        },
      });
      token = tokens.data.accessToken;
    }
    const response = await axios.get<MessageType>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/wspace/invite/${ctx.query.link}`,
      {
        headers: {
          Cookie: `accessToken=${token}`,
        },
      },
    );
    return {
      props: {
        message: response.data.message,
      },
    };
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        props: {
          message: err.response?.data.message,
        },
      };
    } else {
      return {
        props: {
          message: 'Ошибка запроса',
        },
      };
    }
  }
});
