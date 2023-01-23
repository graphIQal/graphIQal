import React, { useEffect, useState } from 'react';
import { gql, OperationContext, useMutation, useQuery } from 'urql';
import IconCircleButton from '../components/molecules/IconCircleButton';
import NodeCircle from '../components/molecules/NodeCircle';
import { Mutation } from '../helpers/backend/dbAccessObj';
import {
  CreateNode,
  GetNodes,
  GetNodeDocumentView,
} from '../helpers/backend/nodeHelpers';
import { GetCurrentUser } from '../helpers/backend/userHelpers';
//hemingway bridge:
//figure out how to call query on click urql
//get document data and navigate to document view
const HomeNode: React.FC = () => {
  const [currNode, setCurrNode] = useState('');

  const nodes = GetNodes(true).data?.nodeData;
  let user = GetCurrentUser('8f94b276-711d-4eeb-9348-c73f55a98459', true).data
    .data?.users[0];
  const createNode = CreateNode();

  const nodeDocQuery = GetNodeDocumentView(currNode);
  console.log(nodeDocQuery.data);

  return (
    <div>
      <p>{'Hello ' + user?.metadata.name}</p>
      <div className='flex flex-row justify-items-stretch'>
        <h1>My Nodes</h1>
        <IconCircleButton onClick={createNode} />
      </div>

      <div>
        {nodes?.map((node, i) => (
          <NodeCircle
            text={node.id}
            key={i}
            onClick={() => {
              setCurrNode(node.id);
              nodeDocQuery.execute();
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default HomeNode;
