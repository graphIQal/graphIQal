import React, { useContext, useEffect, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import Graph from '../../../packages/graph/components/GraphPage';
import { Tab } from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';
import SearchBar from '../SearchBar';
import router from 'next/router';

export type SideTabProps = {
	label: string;
	viewType: 'connections' | 'content' | 'shelf';
	component: any;
};

const GraphSideTabs: React.FC<{ nodeInFocus_data: any }> = ({
	nodeInFocus_data,
}) => {
	const { username } = useContext(ViewContext) as ViewContextInterface;
	const renderConnections = (nodeInFocus_data: any) => {
		return (
			<div>
				{nodeInFocus_data.connectedNodes.map(
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
		let newTabs = [...tabs];
		newTabs[0].component = renderConnections(nodeInFocus_data);
		setTabs(newTabs);
	}, [nodeInFocus_data]);

	const [tabs, setTabs] = useState<SideTabProps[]>([
		{
			label: 'Connections',
			viewType: 'connections',
			// component: <EditorComponent textIn={renderConnections()} />,
			component: <div>{renderConnections(nodeInFocus_data)}</div>,
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
