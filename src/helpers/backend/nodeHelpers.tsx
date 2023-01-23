import { useCallback } from 'react';
import { gql, OperationContext, useMutation, useQuery } from 'urql';
import { Query, Mutation } from './dbAccessObj';
import { graphql } from '../../../src/gql';

export const CreateNode = () => {
  const nodeMutation = `
  mutation {
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

  const [{ fetching, data }, executeMutation] = useMutation(nodeMutation);
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

export const GetNodes = (go: boolean) => {
  const allNodesQuery = /* GraphQL */ `
    query {
      nodeData {
        title
        id
      }
    }
  `;

  interface NodesQuery {
    nodeData: {
      title: string;
      id: string;
    }[];
  }

  const [{ data }, executeQuery] = useQuery<NodesQuery>({
    query: allNodesQuery,
    pause: !go,
  });

  return { execute: executeQuery, data: data };
};

export const GetNodeDocumentView = (nodeID: string) => {
  interface DocumentQuery {
    nodeData: {
      document: {
        id: string;
        elements: [string];
      };
    }[];
  }
  const getNodeDocumentViewQuery = gql`
    query ($id: ID) {
      nodeData(where: { id: $id }) {
        document {
          id
          elements
        }
      }
    }
  `;

  const [{ data, fetching }, executeQuery] = useQuery<DocumentQuery>({
    query: getNodeDocumentViewQuery,
    variables: { id: nodeID },
    pause: nodeID === '',
  });

  return { execute: executeQuery, data: data, fetching: fetching };
};
