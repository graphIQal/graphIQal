import { useCallback } from 'react';
import { gql, useMutation, useQuery } from 'urql';
import { Query, Mutation } from './dbAccessObj';
import { graphql } from '../../../src/gql';

export const CreateNode = (id: string): (() => string) => {
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

  const [{ fetching }, executeMutation] = useMutation(nodeMutation);
  return useCallback(() => {
    executeMutation().then(({ data }) => {
      if (fetching) {
        return;
      }
      return data & data.id;
    });
    return 'not found';
  }, [executeMutation, id]);
};

export const GetNodes = () => {
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

  const [{ data }] = useQuery<NodesQuery>({
    query: allNodesQuery,
  });

  return data?.nodeData;
};

export const GetNodeDocumentView = () => {
  const nodeID = 'e14d9ace-0a0a-4d49-8eb3-0771d5fff1d0';
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
  });
  if (fetching) {
    return '';
  }
  console.log(data?.nodeData[0].document.id);
  // return data?.nodeData[0].document.id;
};
