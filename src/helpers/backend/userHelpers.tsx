import { useQuery } from 'urql';
import { graphql } from '../../gql/gql';
import { GetCurrentUserQueryQuery } from '../../gql/graphql';

//Method to get the current user's information from their ID (statically passed in for now, because we're dealing with one user)
export const GetCurrentUser = (id: string, go: boolean) => {
  const getCurrentUserQueryDocument = graphql(`
    query getCurrentUserQuery($id: ID) {
      users(where: { id: $id }) {
        id
        metadata {
          name
        }
      }
    }
  `);

  const [{ data }] = useQuery<GetCurrentUserQueryQuery>({
    query: getCurrentUserQueryDocument,
    variables: { id },
  });

  return { execute: () => null, data: data };
};
