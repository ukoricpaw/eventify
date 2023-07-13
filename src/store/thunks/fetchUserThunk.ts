import { AppDispatch } from '..';
import { isAxiosError } from 'axios';
import { authError, authLoading, authSuccess } from '../slices/userSlice';
import { $publicApi } from '@/axios/config';
import { UserBody, UserResponse } from '@/types/userTypes';

export default function fetchUserThunk(body: UserBody, authType: 'login' | 'reg') {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authLoading());
      let result;
      if (authType === 'login') {
        result = await $publicApi.post<UserResponse>('/api/user/login', body);
      } else {
        result = await $publicApi.post<UserResponse>('/api/user/registration', body);
      }
      dispatch(authSuccess(result.data.user));
      return 'submitted';
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(authError(err.response?.data.message));
      }
      dispatch(authError('Произошла ошибка'));
    }
  };
}
