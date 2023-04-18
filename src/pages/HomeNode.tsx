import React from 'react';
import IconCircleButton from '../components/molecules/IconCircleButton';
import NodeCircle from '../components/molecules/NodeCircle';
// import { CreateNode, GetNodes } from '../helpers/backend/nodeHelpers';

const HomeNode: React.FC = () => {
	return (
		<div>
			<p>hello</p>
			{/* <p>{'Hello ' + user?.users[0].metadata?.name}</p>
		<div className='flex flex-row justify-items-stretch w-xxl h-xxl'>
			<h1>My Nodes</h1>
			<IconCircleButton onClick={createNode} />
		</div> */}

			{/* <div>
				{nodes?.map((node, i) => (
					<NodeCircle
						text={node.id}
						key={i}
						onClick={() => {
							navigate('/document/' + node.id, {
								state: { document: node },
							});
						}}
					/>
				))}
			</div> */}
		</div>
	);
};
export default HomeNode;
