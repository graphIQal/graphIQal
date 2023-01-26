import { useCallback } from 'react';
import { gql, useMutation, useQuery } from 'urql';
import {
  CreateNodeDataMutationResponse,
  GetAllNodesQueryQuery,
  GetDocViewQueryQuery,
} from '../../gql/graphql';
//All queries will return an object that contains the 'execute' function (that can be called onClick), and the 'data' object (that contains the data returned)
//All mutations will return just a callback method that executes the mutation

//Method for creating a new node with an empty title, returns the node's ID
export const CreateNode = () => {
  const createNodeDocument = `
  mutation createNode {
	createNodeData(input: {
    title: ""

		document: {
			create: {
				node: {node: "", elements:[]}
			}
		}
	}) 
  {
    nodeData 
     {
      id
    }
  }
}
`;

  const [{ fetching }, executeMutation] =
    useMutation<CreateNodeDataMutationResponse>(createNodeDocument);
  return useCallback(() => {
    executeMutation().then(({ data }) => {
      if (fetching) {
        return;
      }
      return data;
    });
    return 'not found';
  }, [executeMutation]);
};

//Method to get ALL nodes (since right now we're only dealing with one user)
export const GetNodes = (go: boolean) => {
  const getAllNodesQueryDocument = /* GraphQL */ `
    query getAllNodesQuery {
      nodeData {
        title
        id
      }
    }
  `;

  const [{ data }, executeQuery] = useQuery<GetAllNodesQueryQuery>({
    query: getAllNodesQueryDocument,
    pause: !go,
  });

  return { execute: executeQuery, data: data };
};

//Method for getting the document view information of a node with a specific ID
export const GetNodeDocumentView = (nodeID: string) => {
  const getDocViewQueryDocument = gql`
    query getDocViewQuery($id: ID) {
      nodeData(where: { id: $id }) {
        document {
          id
          elements
        }
      }
    }
  `;

  const [{ data, fetching }, executeQuery] = useQuery<GetDocViewQueryQuery>({
    query: getDocViewQueryDocument,
    variables: { id: nodeID },
    pause: nodeID === '',
  });

  return { execute: executeQuery, data: data, fetching: fetching };
};
