import React from 'react';
import { gql, useQuery } from 'urql';
import { Query } from './dbAccessObj';

export const GetCurrentUser = (id: string) => {
  const getCurrentUserQuery = gql`
    query ($id: ID) {
      users(where: { id: $id }) {
        id
        metadata {
          name
        }
      }
    }
  `;

  interface UserQuery {
    users: {
      id: string;
      metadata: {
        name: string;
      };
    }[];
  }
  const [result, executeQuery] = useQuery<UserQuery>({
    query: getCurrentUserQuery,
    variables: { id },
  });

  return result.data ? result.data.users[0] : null;
};
