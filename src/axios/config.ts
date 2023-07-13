import axios from 'axios';

const $privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const $publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let resCheck = false;

$privateApi.interceptors.response.use(
  config => {
    return config;
  },
  async err => {
    const originalConfig = err.config;
    if (err.response.status == 401 && err.config && !resCheck) {
      resCheck = true;
      try {
        await $publicApi.get('/api/user/refresh');
        return $privateApi.request(originalConfig);
      } catch (err) {
        console.log(err);
      }
    } else {
      resCheck = false;
      throw err;
    }
  },
);

export { $privateApi, $publicApi };
