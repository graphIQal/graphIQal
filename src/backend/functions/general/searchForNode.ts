import useSWR from 'swr';
import { fetcher } from '../../driver/fetcher';

export const useSearchForNode = (username: string, titleToSearch: string) => {
  const { data: res } = useSWR(
    `/api/general/search?username=${username}&search=${titleToSearch}`,
    fetcher
  );
  // const res = await fetch(
  //   `/api/general/search?username=${username}&search=${titleToSearch}`
  // ).then(async (res) => {
  //   const json = await res.json().then((json) => {
  //     console.log('Json ' + json);
  //     return json;
  //   });
  // });
  return res;
};
