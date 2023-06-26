import { fetcher, fetcherAll } from '../../../driver/fetcher';
import useSWR from 'swr';

export type getNodeData_type = {
  n: { [key: string]: string };
  connectedNodes: connectedNode_type[];
};

export type connectedNode_type = {
  r: { type: string; [key: string]: string };
  connected_node: { [key: string]: string };
};

export const useGetNodeData = (nodeId: string, username: string) => {
  const { data: res, isLoading } = useSWR(
    [nodeId ? `/api/${username}/${nodeId}` : null],
    fetcherAll
  );
  // const res = await fetch(`/api/${username}/${nodeId}`)
  // 	.then((res) => {
  // 		return res.json();
  // 	})
  // 	.then((json) => {
  // 		return json;
  // 	});

  const result = res && res[0] ? res[0][0] : null;

  return { result, isLoading };
};
