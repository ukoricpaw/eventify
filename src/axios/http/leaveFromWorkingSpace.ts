import { isAxiosError } from 'axios';
import { $privateApi } from '../config';
import { notifyWithError, notifyWithSuccess } from '@/utils/notificationsFromToastify';
import { MessageType } from '@/types/wspaceTypes';

export default async function leaveFromWorkingSpace({ wspaceId }: { wspaceId: number }) {
  try {
    const message = await $privateApi.get<MessageType>(`/api/wspace/leave/${wspaceId}`);
    notifyWithSuccess(message.data.message);
    return message.data.message;
  } catch (err) {
    if (isAxiosError(err)) {
      notifyWithError(err.response?.data.message);
    } else {
      notifyWithError('Ошибка запроса');
    }
  }
}
