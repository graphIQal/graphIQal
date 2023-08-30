import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { SidePanel } from '../../templates/SidePanel';

import { getNodeData_type } from '../../../backend/functions/node/query/useGetNodeData';
import { addExistingNodeToGraph } from '../../../helpers/frontend/addExistingNodeToGraph';
import {
	useGraphViewAPI,
	useGraphViewData,
} from '../../../packages/graph/context/GraphViewContext';
import { useViewData } from '../../context/ViewContext';
import { SelectableList } from '../../templates/SelectableList';
import { renderConnections } from './RenderConnections';
import { SideTabs } from './SideTabs';
import SideTab from '@/components/atoms/SideTab';

export type SideTabProps = {
	label: string;
	viewType: 'connections' | 'content' | 'shelf';
	component: any;
};

const GraphSideTabs: React.FC<{ nodeInFocus_data: getNodeData_type }> = ({
	nodeInFocus_data,
}) => {
	const { username, currNode_data, nodeId } = useViewData();
	const { nodeData_Graph, nodeVisualData_Graph, addAction, nodeInFocusId } =
		useGraphViewData();
	const {
		changeNodeData_Graph,
		changeVisualData_Graph,
		changeAlert,
		changeNodeInFocusId,
	} = useGraphViewAPI();

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
				//this button should add the selected node to the graph
				src: 'plus',
				onClick: () => {
					addExistingNodeToGraph(
						{
							nodeData_Graph,
							nodeVisualData_Graph,
							changeNodeData_Graph,
							changeVisualData_Graph,
							changeAlert,
							addAction,
						},
						username,
						{
							id: result.id,
							title: result.title,
						}
					);
				},
			},
			{
				//this button should put the selected node in focus
				src: 'spotlight',
				onClick: () => {
					changeNodeInFocusId(result.id);
				},
			},
		];
	};

	useEffect(() => {
		if (!nodeInFocus_data) return;
		let newTabs = [...tabs];
		newTabs[0].component = (
			<SidePanel title={nodeInFocus_data.n.title}>
				<SelectableList
					onEnter={() => null}
					listItems={renderConnections(
						nodeInFocus_data.connectedNodes,
						getButtonItems
					)}
				/>
			</SidePanel>
		);

		const mainNodeConnections = {};

		currNode_data.connectedNodes.map((connection: any) => {
			(mainNodeConnections as any)[connection.connected_node.id] =
				connection;
		});

		newTabs[1].component = (
			<SidePanel
				title={
					'Focused Connections between ' +
					currNode_data.n.title +
					' and ' +
					nodeInFocus_data.n.title
				}
			>
				<SelectableList
					onEnter={() => null}
					listItems={renderConnections(
						nodeInFocus_data.connectedNodes.filter(
							({ r, connected_node }: any) =>
								connected_node.id in mainNodeConnections
						),
						getButtonItems
					)}
				/>
			</SidePanel>
		);

		setTabs(newTabs);
	}, [nodeInFocus_data, currNode_data, nodeData_Graph, nodeInFocusId]);

	const [tabs, setTabs] = useState<SideTabProps[]>([
		{
			label: 'All Connections',
			viewType: 'connections',
			// component: <EditorComponent textIn={renderConnections()} />,
			component: <div></div>,
		},
		{
			label: 'Focused Connections',
			viewType: 'content',
			component: <h3>text</h3>,
		},
		// {
		//   label: 'Shelf',
		//   viewType: 'shelf',
		//   component: <div />,
		// },
	]);

	const [currTab, setCurrTab] = useState(0);

	return (
		<>
			<SideTabs>
				{tabs.map((tab, index) => {
					return (
						<div key={index}>
							<SideTab
								title={tab.label}
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
			</SideTabs>

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
