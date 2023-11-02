import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Tab from '../../atoms/Tab';
import { useViewData } from '../../context/ViewContext';
import { Tabs } from './Tabs';

import { renderConnections } from './RenderConnections';

export type SideTabPropsDoc = {
	label: string;
	viewType: 'connections' | 'shelf' | 'content';
	component: any;
};

type DocumentSideTabsInput = {
	// editorComponent: JSX.Element;
};

const DocumentSideTabs: React.FC<DocumentSideTabsInput> = (
	{
		// editorComponent,
	}
) => {
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

	useEffect(() => {
		if (!currNode_data) return;
		let newTabs = [...tabs];
		newTabs[0].component = (
			<div>
				{renderConnections(
					currNode_data.connectedNodes,
					getButtonItems
				)}
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
			component: <div></div>,
		},
		// {
		// 	label: 'Content',
		// 	viewType: 'content',
		// 	component: <EditorComponent value={[]} />,
		// },
	]);

	const [currTab, setCurrTab] = useState(0);

	return (
		<div className='z-20 w-full'>
			<div className='absolute top-0'>
				<Tabs>
					{tabs.map((tab, index) => {
						return (
							<div key={index}>
								<Tab
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
				</Tabs>
			</div>
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
