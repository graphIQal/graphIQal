import { useCallback } from 'react';
import { useQuery } from 'urql';
import { Query } from './dbAccessObj';

export const userQuery = (name: string): string => {
  const userQuery = `
  query ($name : ID) {
    users(where: {id: $name}) {
      id
      metadata {
        name
      }
    }
  }
`;
  const user = Query(userQuery, { name });
  return user['users'][0]['metadata']['name'];
};
