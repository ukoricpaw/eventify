import { toast } from 'react-toastify';

export const notifyWithError = (message: string) => toast.error(message, { delay: 1000 });
export const notifyWithSuccess = (message: string) => toast.success(message, { pauseOnHover: false });
