import useSWR from 'swr';
import { fetcher } from '../driver/fetcher';

export const useSuspenseSWR = (key: string | null) => {
  let promise: any;
  try {
    return useSWR(key, fetcher, { suspense: true });
  } catch (err: any) {
    if (err.then) {
      err.then((e: any) => (promise = e));
    } else {
      throw err;
    }
  }
  const handler = {
    get() {
      throw promise;
    },
  };

  const proxedData: any = new Proxy({}, handler);

  return {
    data: proxedData,
    error: null,
    isLoading: true,
  };
};
