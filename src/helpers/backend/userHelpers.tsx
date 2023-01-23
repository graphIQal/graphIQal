import React from 'react';
import { gql, useQuery } from 'urql';
import { Query } from './dbAccessObj';

//Method to get the current user's information from their ID (statically passed in for now, because we're dealing with one user)
export const GetCurrentUser = (id: string, go: boolean) => {
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
    pause: !go,
  });

  return { execute: executeQuery, data: result };
};
