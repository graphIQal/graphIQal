import { useQuery, useMutation } from 'urql';

export const Query = (query: string, variables: object) => {
  //useQuery takes in an options object and returns a tuple
  //result ob:  fetching field indicates whether the hook is loading data
  //data contains the actual data from the API's result
  //error is set when either the request to the API has failed or when our API result contained some GraphQLErrors
  //reexecuteQuery is a function to trigger a query programmatically
  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
  });

  const { data, fetching, error } = result;

  if (fetching) return 'Loading...';
  if (error) return error.message;
  console.log('Data received: ' + JSON.stringify(data));

  return data;
};

export const Mutation = (mutation: string) => {
  //mutation is not automatically triggered, you must manually call the update function
  const [updateResult, update] = useMutation(mutation);

  //there are two ways of getting to the result from the updateResult function
  //you can use the updateResult from above, or you can use the promise that update returns
  update().then((result) => {
    // The result is almost identical to `updateResult` with the exception
    // of `result.fetching` not being set.
    // It is an OperationResult.
    console.log('Data updated & received: ' + JSON.stringify(result.data));
    return result;
  });
};
