import { connectedNode_type } from '@/backend/functions/node/query/useGetNodeData';
import ConnectionListItem from '../ConnectionList/ConnectionListItem';
import ConnectionSection from '../ConnectionList/ConnectionSection';
import { connectionColours } from '@/theme/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export const renderConnections = (
	connectedNodes: connectedNode_type[],
	getButtonItems: (result: any) => {
		src: string;
		onClick: () => void;
	}[]
) => {
	const items: any[] = [];

	const sectionDisplayNames: { [key: string]: string } = {
		'To-HAS': 'Parents',
		'From-HAS': 'Children',
		'To-IS': 'Is',
		'From-Is': 'Encompasses',
		'To-NEEDS': 'Needed',
		'From-NEEDS': 'Needs',
		'To-FOLLOWS': 'Followed',
		'From-FOLLOWS': 'Follows',
		'To-RELATED': 'Related',
		'From-RELATED': 'Related',
		'To-CUSTOM': 'Custom',
		'From-CUSTOM': 'Custom',
	};

	const sections: Record<string, JSX.Element[]> = {
		'To-HAS': [],
		'From-HAS': [],
		'To-IS': [],
		'From-Is': [],
		'To-NEEDS': [],
		'From-NEEDS': [],
		'To-FOLLOWS': [],
		'From-FOLLOWS': [],
		'To-RELATED': [],
		'From-RELATED': [],
		'To-CUSTOM': [],
		'From-CUSTOM': [],
	};

	connectedNodes.forEach((connectedNode, i) => {
		const connectionType = connectedNode.r.type;
		const sectionKey = `${
			connectedNode.r.fromNode ? 'From' : 'To'
		}-${connectionType}`;

		sections[sectionKey].push(
			<ConnectionListItem
				fromNode={connectedNode.r.fromNode}
				key={connectedNode.connected_node.id}
				type={connectedNode.r.type}
				title={connectedNode.connected_node.title}
				id={connectedNode.connected_node.id}
				index={i}
				buttonItems={getButtonItems(connectedNode.connected_node)}
				url={connectedNode.connected_node.url}
			/>
		);
	});

	return Object.entries(sections).map(([name, connectionItems], i) => {
		if (connectionItems.length < 1) return;

		const fromNode = name.startsWith('From-');

		return (
			<ConnectionSection
				key={name}
				colour={
					connectionColours[sectionDisplayNames[name].toUpperCase()]
				}
				title={
					<div className='flex flex-row items-center w-full ' key={i}>
						<div className='mr-2'>{sectionDisplayNames[name]}</div>
						<div className='flex flex-row items-center'>
							<div className='h-full py-2 mx-3 border-l border-base_black'></div>
							<div className='flex flex-row items-center'>
								{/* {currNode_data.n.title} */}
								{!fromNode && <ArrowLeftIcon />}
								<div className='px-1'>{name.split('-')[1]}</div>
								{fromNode && (
									<>
										<div>
											<ArrowRightIcon />
										</div>
										{/* <div className='w-3 items-center'>
                                            <CircularGraph />
                                        </div> */}
									</>
								)}
							</div>
							{/* <div className='flex justify-center items-center rounded-full text-center border-base_black border-[0.5px] mx-2'>
                                {connectionItems.length}
                            </div> */}
						</div>
					</div>
				}
			>
				{connectionItems}
			</ConnectionSection>
		);
	});
};
