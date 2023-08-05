import { MessageType } from '@/types/wspaceTypes';
import { $privateApi } from '../config';
import { isAxiosError } from 'axios';

interface changeDeskBackgroundIProps {
  wsId: number;
  deskId: number;
  background?: Blob;
  delete_img: boolean;
}

export default async function changeDeskBackground({
  wsId,
  deskId,
  background,
  delete_img,
}: changeDeskBackgroundIProps) {
  try {
    const formData = new FormData();
    if (delete_img) {
      formData.append('delete_img', 'true');
    } else {
      if (background) {
        formData.append('background', background);
      }
    }
    const result = await $privateApi.put<MessageType>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/wspace/desk/${wsId}/${deskId}`,
      formData,
    );
    return result.data.message;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data.message;
    }
    return 'Ошибка при изменении изображения';
  }
}
