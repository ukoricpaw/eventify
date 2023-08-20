import { isAxiosError } from 'axios';
import { $privateApi } from '../config';
import { MessageType } from '@/types/wspaceTypes';
import { notifyWithSuccess } from '@/utils/notificationsFromToastify';

export default async function changeRole(wspaceId: number, roleId: number, userId: number) {
  const body = {
    roleId,
    userId,
  };
  try {
    const result = await $privateApi.post<MessageType>(`/api/wspace/permission/${wspaceId}`, body);
    notifyWithSuccess(result.data.message);
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err.response?.data.message);
      return;
    } else {
      console.log(err);
    }
  }
}
