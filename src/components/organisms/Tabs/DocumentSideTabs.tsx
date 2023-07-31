import React, { useEffect, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import ShelfEditor from '../../../packages/shelf-editor/ShelfEditor';
import Tab from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ConnectionListItem from '../ConnectionListItem';
import { connectedNode_type } from '../../../backend/functions/node/query/useGetNodeData';
import { useViewData } from '../../context/ViewContext';
import { SelectableList } from '../../templates/SelectableList';
import { useRouter } from 'next/router';
import { Divider } from '../split-pane/SplitPane';

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
		const relationshipOrder = [
			'HAS',
			'IS',
			'NEEDS',
			'FOLLOWS',
			'RELATED',
			'CUSTOM',
		];

		connectedNodes
			.sort((a, b) => {
				const relationshipOrderComparison =
					relationshipOrder.indexOf(a.r.type) -
					relationshipOrder.indexOf(b.r.type);

				return a.r.fromNode === false
					? -1 // Sort false `fromNode` values before positive `fromNode` values
					: b.r.fromNode === false
					? 1 // Sort positive `fromNode` values after false `fromNode` values
					: relationshipOrderComparison !== 0
					? relationshipOrderComparison // If `fromNode` values are the same, sort by relationship order
					: 0;
			})
			.map((connectedNode: connectedNode_type, i: number) => {
				items.push(
					<ConnectionListItem
						fromNode={connectedNode.r.fromNode}
						key={i}
						type={connectedNode.r.type}
						title={connectedNode.connected_node.title}
						id={connectedNode.connected_node.id}
						index={i}
						buttonItems={getButtonItems(
							connectedNode.connected_node
						)}
						url={connectedNode.connected_node.url}
					/>
				);
			});
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
