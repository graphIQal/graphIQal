import React, { useEffect, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import ShelfEditor from '../../../packages/shelf-editor/ShelfEditor';
import Tab from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ConnectionListItem from '../ConnectionList/ConnectionListItem';
import { connectedNode_type } from '../../../backend/functions/node/query/useGetNodeData';
import { useViewData } from '../../context/ViewContext';
import { SelectableList } from '../../templates/SelectableList';
import { useRouter } from 'next/router';
import { Divider } from '../split-pane/SplitPane';
import ConnectionSection from '../ConnectionList/ConnectionSection';
import { CircularGraph } from '@styled-icons/entypo/CircularGraph';

import { ArrowLeftIcon, ArrowRightIcon, DiscIcon } from '@radix-ui/react-icons';
import { connectionColours } from '@/theme/colors';

export type SideTabPropsDoc = {
	label: string;
	viewType: 'connections' | 'shelf' | 'content';
	component: any;
};

type DocumentSideTabsInput = {
	editorComponent: JSX.Element;
};

const DocumentSideTabs: React.FC<DocumentSideTabsInput> = ({
	editorComponent,
}) => {
	const { username, currNode_data, nodeId } = useViewData();
	const router = useRouter();

	const getButtonItems = (result: any) => {
		return [
			{
				//this button should navigate to the views of the clicked node
				src: 'navigation',
				onClick: () => {
					router.push(`/${username}/${result.id}`, undefined);
				},
			},
			{
				//this button should navigate to the views of the clicked node
				src: 'plus',
				onClick: () => {
					router.push(`/${username}/${result.id}`, undefined);
				},
			},
		];
	};

	const renderConnections = (connectedNodes: connectedNode_type[]) => {
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
					colour={connectionColours[sectionDisplayNames[name]]}
					title={
						<div
							className='flex flex-row items-center w-full '
							key={i}
						>
							<div className='mr-2'>
								{sectionDisplayNames[name]}
							</div>
							<div className='flex flex-row items-center'>
								<div className='h-full py-2 mx-3 border-l border-base_black'></div>
								<div className='flex flex-row items-center'>
									{/* {currNode_data.n.title} */}
									{!fromNode && <ArrowLeftIcon />}
									<div className='px-1'>
										{name.split('-')[1]}
									</div>
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

		// connectedNodes
		// 	.sort((a, b) => {
		// 		const relationshipOrderComparison =
		// 			relationshipOrder.indexOf(a.r.type) -
		// 			relationshipOrder.indexOf(b.r.type);

		// 		return a.r.fromNode === false
		// 			? -1 // Sort false `fromNode` values before positive `fromNode` values
		// 			: b.r.fromNode === false
		// 			? 1 // Sort positive `fromNode` values after false `fromNode` values
		// 			: relationshipOrderComparison !== 0
		// 			? relationshipOrderComparison // If `fromNode` values are the same, sort by relationship order
		// 			: 0;
		// 	})
		// 	.map((connectedNode: connectedNode_type, i: number) => {
		// 		items.push(
		// 			<ConnectionListItem
		// 				fromNode={connectedNode.r.fromNode}
		// 				key={i}
		// 				type={connectedNode.r.type}
		// 				title={connectedNode.connected_node.title}
		// 				id={connectedNode.connected_node.id}
		// 				index={i}
		// 				buttonItems={getButtonItems(
		// 					connectedNode.connected_node
		// 				)}
		// 				url={connectedNode.connected_node.url}
		// 			/>
		// 		);
		// 	});
		return items;
	};

	useEffect(() => {
		if (!currNode_data) return;
		let newTabs = [...tabs];
		newTabs[0].component = (
			<div>
				{renderConnections(currNode_data.connectedNodes)}
				{/* <Divider className='separator-row' /> */}
				{/* <div className='py-4 px-2 '>
					<div className='ml-[14px]'>
						<h2 className='font-bold ml-1 text-md'>Shelf</h2>
					</div> */}
				{/* <ShelfEditor /> */}
				{/* {editorComponent} */}
				{/* </div> */}
			</div>
		);

		const mainNodeConnections = {};

		currNode_data.connectedNodes.map((connection: any) => {
			(mainNodeConnections as any)[connection.connected_node.id] =
				connection;
		});

		setTabs(newTabs);
	}, [currNode_data]);

	const [tabs, setTabs] = useState<SideTabPropsDoc[]>([
		{
			label: 'Connections',
			viewType: 'connections',
			component: <div>{editorComponent}</div>,
		},
		// {
		// 	label: 'Content',
		// 	viewType: 'content',
		// 	component: <EditorComponent value={[]} />,
		// },
	]);

	const [currTab, setCurrTab] = useState(0);

	return (
		<div className='z-20 w-fit'>
			<Tabs>
				{tabs.map((tab, index) => {
					return (
						<div key={index}>
							<Tab
								label={tab.label}
								selected={index == currTab}
								index={index}
								currTab={currTab}
								setCurrTab={setCurrTab}
								tabs={tabs}
								setTabs={setTabs}
							/>
						</div>
					);
				})}
			</Tabs>
			{tabs.map((tab, i) => {
				return (
					<div
						key={i}
						style={{
							display: currTab == i ? 'block' : 'none',
						}}
					>
						{tab.component}
					</div>
				);
			})}
		</div>
	);
};
export default DocumentSideTabs;
