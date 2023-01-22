import React from 'react';
import { gql, useQuery } from 'urql';
import { Query } from './dbAccessObj';

export const getCurrentUserQuery = gql`
  query ($id: ID) {
    users(where: { id: $id }) {
      id
      metadata {
        name
      }
    }
  }
`;

export const GetCurrentUser = (id: string): string => {
  const [result, executeQuery] = useQuery({
    query: getCurrentUserQuery,
    variables: { id },
  });

  const getUser = React.useCallback(() => {
    executeQuery();
  }, [executeQuery]);

  return result.data ? result.data['users'][0]['metadata']['name'] : '';
};
