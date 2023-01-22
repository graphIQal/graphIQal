import { useCallback } from 'react';
import { gql, useMutation, useQuery } from 'urql';
import { Query, Mutation } from './dbAccessObj';

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
  //   let updateFunc = Mutation(nodeMutation);
  //   //there are two ways of getting to the result from the updateResult function
  //   //you can use the updateResult from above, or you can use the promise that update returns
  //   updateFunc().then((result) => {
  //     // The result is almost identical to `updateResult` with the exception
  //     // of `result.fetching` not being set.
  //     // It is an OperationResult.
  //     console.log('Data updated & received: ' + JSON.stringify(result.data));
  //     return result.data;
  //   });

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
  const allNodesQuery = gql`
    query {
      nodeData {
        title
        id
      }
    }
  `;

  const [result, executeQuery] = useQuery({
    query: allNodesQuery,
  });

  if (result.fetching) {
    return;
  }

  console.log('all nodes ' + result && result.data);
};
