import React, { useContext, useEffect, useRef, useState } from 'react';
import MainTabs from '../../components/organisms/Tabs/MainTabs';
import ViewContext, {
	ViewContextInterface,
	MainTabProps,
} from '../../components/context/ViewContext';
import { useRouter, withRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../backend/driver/fetcher';
import {
	getNodeData,
	getNodeData_type,
} from '../../backend/functions/node/query/getNodeData';
import SearchBar from '../../components/organisms/SearchBar';
import Graph from '../../packages/graph/Graph';
import SplitPaneWrapper from '../../packages/dnd-editor/Document';

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

	// useEffect(() => {
	//   if (nodeId) {
	//     fetch(`/api/${username}/${nodeId}/document`)
	//       .then((res) => res.json())
	//       .then((data) => {
	//         if (data) {
	//           let includedIDs: { [key: string]: boolean } = {};
	//           data.map((record: any, index: number) => {
	//             if (!includedIDs[record.g.properties.id]) {
	//               includedIDs[record.g.properties.id] = true;

	//               newTabs.push({
	//                 label: record.g.properties.title,
	//                 viewId: record.g.properties.id,
	//                 viewType: 'graph',
	//                 component: (
	//                   <Graph2
	//                     viewId={record.g.properties.id}
	//                     title={record.g.properties.title}
	//                   />
	//                 ),
	//               });
	//             }
	//           });
	//         }
	//       });
	//   }
	//   setTabs(newTabs);
	// }, []);

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
		{
			label: 'Home',
			viewId: '',
			viewType: 'document',
			component: <SplitPaneWrapper viewId={''} />,
		},
		//temp
		// {
		//   label: 'Graph View',
		//   viewId: '',
		//   viewType: 'graph',
		//   component: <Graph2 viewId={''} title={'Graph View'} />,
		// },
	];
	const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);

	useEffect(() => {
		if (!data) return;

		if (!isLoading) {
			if (data) {
				let includedIDs: { [key: string]: boolean } = {};
				data.map((record: any, index: number) => {
					if (!includedIDs[record.g.properties.id]) {
						includedIDs[record.g.properties.id] = true;

						newTabs.push({
							label: record.g.properties.title,
							viewId: record.g.properties.id,
							viewType: 'graph',
							component: (
								<Graph
									viewId={record.g.properties.id}
									title={record.g.properties.title}
								/>
							),
						});
					}
				});
			}
		}
		console.log('changing tabs');
		setTabs(newTabs);
	}, [data]);

	const [currTab, setCurrTab] = useState(0);

	useEffect(() => {
		setCurrTab(0);
	}, [nodeId]);

	const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

	return (
		// <NavigationContext.Provider value={}>
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
				showSearchBar: showSearchBar,
				setShowSearchBar: setShowSearchBar,
			}}
		>
			<MainTabs />
		</ViewContext.Provider>
		// </NavigationContext.Provider>
	);
};
export default withRouter(Home);
