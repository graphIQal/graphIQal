import { useQuery, useMutation } from 'urql';
import React from 'react';

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
  return React.useCallback(() => {
    reexecuteQuery();
  }, [reexecuteQuery]);
  // if (fetching) return 'Loading...';

  // if (error) return error.message;
  // console.log('Data received: ' + JSON.stringify(data));
  // return data;
};

export const Mutation = (mutation: string) => {
  console.log('here2');
  //mutation is not automatically triggered, you must manually call the update function
  const [updateResult, update] = useMutation(mutation);
  return update;
};
