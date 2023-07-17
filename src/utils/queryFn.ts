import { $privateApi } from '@/axios/config';
import { isAxiosError } from 'axios';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

const queryFn = async (url: string, method: Method, body?: any) => {
  try {
    let response;
    switch (method) {
      case 'GET':
        response = await $privateApi.get(url);
        break;
      case 'POST':
        response = await $privateApi.post(url, body);
        break;
      case 'PUT':
        response = await $privateApi.put(url, body);
        break;
      case 'DELETE':
        response = await $privateApi.delete(url);
        break;
      default:
        response = await $privateApi.get(url);
        break;
    }
    return {
      data: response.data,
    };
  } catch (err) {
    if (isAxiosError(err)) {
      return { error: err.response?.data.message };
    }
    return { error: 'Произошла ошибка' };
  }
};

export default queryFn;
