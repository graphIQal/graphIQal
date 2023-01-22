import React, { useState } from 'react';
import { useMutation } from 'urql';
import IconCircleButton from '../components/molecules/IconCircleButton';
import NodeCircle from '../components/molecules/NodeCircle';
import { Mutation } from '../helpers/backend/dbAccessObj';
import { CreateNode } from '../helpers/backend/nodeHelpers';
//hemingway bridge:
//create all queries/mutations for creating homeNode, adding a Node and connecting to homenode, and getting the user's nodes and displaying them
//figure out how you can put mutations in different functions while not violating rules of hooks
//work on navigation to document view from home page
const HomeNode: React.FC = () => {
  const createNode = CreateNode('1');
  return (
    <div>
      <div className='flex flex-row justify-items-stretch'>
        <h1>My Nodes</h1>
        <IconCircleButton onClick={createNode} />
      </div>

      <div>
        <NodeCircle text='node1' />
      </div>
    </div>
  );
};
export default HomeNode;
