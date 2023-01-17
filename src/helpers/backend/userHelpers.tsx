import { useCallback } from 'react';
import { useQuery } from 'urql';
import { Query } from './dbAccessObj';

export const getCurrentUser = (id: string): string => {
  const userQuery = `
  query ($id : ID) {
    users(where: {id: $id}) {
      id
      metadata {
        name
      }
    }
  }
`;
  let user = Query(userQuery, { id });
  if (user == 'Loading...') {
    return 'Loading';
  }
  return user['users'][0]['metadata']['name'];
};
