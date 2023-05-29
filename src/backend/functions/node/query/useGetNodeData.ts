import { fetcher } from '../../../driver/fetcher';
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
  const { data: res } = useSWR(
    nodeId ? `/api/${username}/${nodeId}` : null,
    fetcher
  );
  // const res = await fetch(`/api/${username}/${nodeId}`)
  // 	.then((res) => {
  // 		return res.json();
  // 	})
  // 	.then((json) => {
  // 		return json;
  // 	});

  return res ? res[0] : null;
};
