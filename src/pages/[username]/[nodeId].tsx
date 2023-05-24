import { useRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../backend/driver/fetcher';
import {
	getNodeData,
	getNodeData_type,
} from '../../backend/functions/node/query/getNodeData';
import ViewContext, {
	MainTabProps,
} from '../../components/context/ViewContext';
import MainTabs from '../../components/organisms/Tabs/MainTabs';
import Graph2 from '../../packages/graph/Graph';

const Home: React.FC = () => {
	const [windowVar, setWindow] = useState<any>();
	const [documentVar, setDocument] = useState<any>();
	useEffect(() => {
		setWindow(window);
		setDocument(document);
	});

	const router = useRouter();

	const { username, nodeId } = router.query;

	const [currNodeId, setCurrNodeId] = useState(nodeId as string);
	const [currNode_data, setcurrNode_data] = useState<getNodeData_type>({
		n: {},
		connectedNodes: [],
	});

	const { data, error, isLoading } = useSWR(
		nodeId ? `/api/${username}/${nodeId}/document` : null,
		fetcher
	);

	useEffect(() => {
		setCurrNodeId(nodeId as string);
	}, [nodeId]);

	useEffect(() => {
		if (currNodeId) {
			getNodeData(currNodeId, username as string).then((res) => {
				if (res.length > 0) setcurrNode_data(res[0]);
			});
		}
	}, [currNodeId]);

	let newTabs: MainTabProps[] = [
		// {
		// 	label: 'Home',
		// 	viewId: '',
		// 	viewType: 'document',
		// 	component: <SplitPaneWrapper viewId={''} />,
		// },
		{
			label: 'Graph View',
			viewId: '',
			viewType: 'graph',
			component: <Graph2 viewId={''} title={'Graph View'} />,
		},
	];
	const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);

	useEffect(() => {
		if (!data) return;

		if (!isLoading) {
			if (data && Array.isArray(data)) {
				let includedIDs: { [key: string]: boolean } = {};
				data.map((record: any, index: number) => {
					if (!includedIDs[record.g.properties.id]) {
						includedIDs[record.g.properties.id] = true;

						newTabs.push({
							label: record.g.properties.title,
							viewId: record.g.properties.id,
							viewType: 'graph',
							component: (
								<Graph2
									viewId={record.g.properties.id}
									title={record.g.properties.title}
								/>
							),
						});
					}
				});
			}
		}
		setTabs(newTabs);
	}, [data]);

	const [currTab, setCurrTab] = useState(0);

	useEffect(() => {
		setCurrTab(0);
	}, [nodeId]);

	return (
		<ViewContext.Provider
			value={{
				mainViewTabs: tabs,
				setMainViewTabs: setTabs,
				username: username as string,
				nodeId: currNodeId,
				setNodeId: setCurrNodeId,
				currNode_data: currNode_data,
				setcurrNode_data: setcurrNode_data,
				currTab: currTab,
				setCurrTab: setCurrTab,
				windowVar: windowVar,
				documentVar: documentVar,
			}}
		>
			<MainTabs />
		</ViewContext.Provider>
	);
};
export default withRouter(Home);
