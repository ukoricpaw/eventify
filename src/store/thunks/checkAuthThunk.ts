import { isAxiosError } from 'axios';
import { AppDispatch } from '..';
import { authError, authLoading, authSuccess } from '../slices/userSlice';
import { $publicApi } from '@/axios/config';
import { UserResponse } from '@/types/userTypes';

export default function checkAuthThunk(cookies: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authLoading());
      const results = await $publicApi.get<UserResponse>('/api/user/refresh', {
        withCredentials: true,
        headers: {
          Cookie: cookies,
        },
      });
      dispatch(authSuccess(results.data.user));
      return results.data;
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(authError(err.response?.data.message));
        return;
      }
      dispatch(authError('Произошла ошибка'));
    }
  };
}
