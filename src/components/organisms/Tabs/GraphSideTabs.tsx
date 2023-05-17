import React, { useContext, useEffect, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import Graph from '../../../packages/graph/components/GraphPage';
import { Tab } from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';
import SearchBar from '../SearchBar';
import router from 'next/router';
import GraphViewContext, {
	GraphViewContextInterface,
} from '../../../packages/graph/context/GraphViewContext';
import { SidePanel } from '../../layouts/SidePanel';

import {
	connectedNode_type,
	getNodeData_type,
} from '../../../backend/functions/node/query/getNodeData';

export type SideTabProps = {
	label: string;
	viewType: 'connections' | 'content' | 'shelf';
	component: any;
};

const GraphSideTabs: React.FC<{ nodeInFocus_data: getNodeData_type }> = ({
	nodeInFocus_data,
}) => {
	const { username, currNode_data, nodeId } = useContext(
		ViewContext
	) as ViewContextInterface;

	console.log(nodeInFocus_data);
	console.log(nodeInFocus_data);

	const renderConnections = (connectedNodes: connectedNode_type[]) => {
		return (
			<div>
				{connectedNodes.map(
					({ rel, connected_node }: any, i: number) => (
						<div
							onClick={() => {
								router.push(
									`/${username}/${connected_node.id}`,
									undefined
								);
							}}
							key={i}
						>
							{'Connection ' +
								(i + 1) +
								' : ' +
								connected_node.title}
						</div>
					)
				)}
			</div>
		);

		// {nodeInFocus_data
		//   ? nodeInFocus_data.map((el) => (
		//       <TextButton
		//         key={el.c.id}
		//         text={el.c.title}
		//         onClick={() => {
		//           router.push(
		//             `/${username}/${el.c.id}`,
		//             undefined
		//           );
		//         }}
		//       />
		//     ))
		//   : null}
	};

	useEffect(() => {
		console.log('nodeInFocus_data');
		console.log(nodeInFocus_data);
		let newTabs = [...tabs];
		newTabs[0].component = (
			<SidePanel
				title={'All Connections for ' + nodeInFocus_data.n.title}
			>
				{renderConnections(nodeInFocus_data.connectedNodes)}
			</SidePanel>
		);

		const mainNodeConnections = {};

		console.log('currNode_data');
		console.log(currNode_data);

		currNode_data.connectedNodes.map((connection) => {
			(mainNodeConnections as any)[connection.connected_node.id] =
				connection;
		});

		newTabs[1].component = (
			<SidePanel
				title={
					'Focused Connections between ' +
					nodeId +
					' and ' +
					nodeInFocus_data.n.title
				}
			>
				{renderConnections(
					nodeInFocus_data.connectedNodes.filter(
						({ r, connected_node }: any) =>
							connected_node.id in mainNodeConnections
					)
				)}
			</SidePanel>
		);

		setTabs(newTabs);
	}, [nodeInFocus_data, currNode_data]);

	const [tabs, setTabs] = useState<SideTabProps[]>([
		{
			label: 'Connections',
			viewType: 'connections',
			// component: <EditorComponent textIn={renderConnections()} />,
			component: (
				<div>{renderConnections(nodeInFocus_data.connectedNodes)}</div>
			),
		},
		{
			label: 'Content',
			viewType: 'content',
			component: <EditorComponent textIn={'content'} />,
		},
		{
			label: 'Shelf',
			viewType: 'shelf',
			component: <div />,
		},
	]);

	const [currTab, setCurrTab] = useState(0);

	return (
		<>
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
							display: i == currTab ? 'block' : 'none',
						}}
					>
						{tab.component}
					</div>
				);
			})}
		</>
	);
};
export default GraphSideTabs;
