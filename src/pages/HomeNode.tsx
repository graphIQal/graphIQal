import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateNode, GetNodes } from '../backend/api/nodeAPI';
import { GetCurrentUser } from '../backend/api/userAPI';
import IconCircleButton from '../components/molecules/IconCircleButton';
import NodeCircle from '../components/molecules/NodeCircle';
// import { CreateNode, GetNodes } from '../helpers/backend/nodeHelpers';

const HomeNode: React.FC = () => {
	let navigate = useNavigate();

	const nodes = GetNodes(true).data?.nodeData;
	let user = GetCurrentUser(
		'8f94b276-711d-4eeb-9348-c73f55a98459',
		true
	).data;
	const createNode = CreateNode();

	return (
		<div>
			<p>{'Hello ' + user?.users[0].metadata?.name}</p>
			<div className='flex flex-row justify-items-stretch w-xxl h-xxl'>
				<h1>My Nodes</h1>
				<IconCircleButton onClick={createNode} />
			</div>

			<div>
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
			</div>
		</div>
	);
};
export default HomeNode;
