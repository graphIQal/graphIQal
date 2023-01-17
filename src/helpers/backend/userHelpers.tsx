import { useCallback } from 'react';
import { useQuery } from 'urql';
import { Query } from './dbAccessObj';

// const mapObj = (obj: string): object => {
//   let map = JSON.parse(obj);
//   return new Map(Object.entries(map));
// };

export const userQuery = (name: string): void => {
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
  return Query(userQuery, { name });
};
