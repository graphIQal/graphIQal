import { useRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcherAll } from '../../backend/driver/fetcher';
import MainTabs, {
	MainTabProps,
} from '../../components/organisms/Tabs/MainTabs';

import { ViewDataProvider } from '../../components/context/ViewContext';
import Graph from '../../packages/graph/Graph';
import SplitPaneWrapper from '../../packages/dnd-editor/Document';
import { SideBar } from '../../components/organisms/sidebar-navigator';

// ('use client');

const Home: React.FC = () => {
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
	const router = useRouter();
	const { nodeId, username } = router.query;
	const { data, error, isLoading } = useSWR(
		[nodeId ? `/api/${username}/${nodeId}/document` : null],
		fetcherAll
	);

	// if (window) {
	// const userId = localStorage.getItem('userId');

	// if (!userId) {
	// 	console.log('hmm');
	// 	router.push('/');
	// }

	// let shouldFetchUser = false;

	// if (localStorage.getItem('username') !== username || !username) {
	// 	console.log(username);
	// 	console.log(localStorage.getItem('username'));
	// 	router.push('/');
	// } else {
	// 	if (!sessionStorage.getItem('favourites')) {
	// 		shouldFetchUser = true;
	// 	}
	// }

	// const { data: user } = useSWR(
	// 	[shouldFetchUser ? `/api/general/${username}/${userId}` : null],
	// 	fetcherAll
	// );

	if (typeof window !== 'undefined') {
		console.log(localStorage.getItem('userId'));
		console.log(sessionStorage.getItem('userId'));
		console.log(!sessionStorage.getItem('favourites'));
	}

	// const { data: user, isLoading: userData } = useSWR(
	// 	[
	// 		() =>
	// 			!sessionStorage.getItem('favourites') && username
	// 				? `/api/general/user/` + localStorage.getItem('userId')
	// 				: null,
	// 	],
	// 	fetcherAll
	// );

	// if (!isLoading) {
	// 	console.log('data', data);
	// }
	// }

	const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);

	useEffect(() => {
		if (sessionStorage.getItem('favourites')) {
		} else {
			sessionStorage.setItem('favourites', '[]');
		}
	}, []);

	useEffect(() => {
		console.log('data');
		console.log(data);

		if (!data || !data[0] || data[0].err) return;

		if (!isLoading) {
			if (data[0]) {
				console.log('!isLoading data');
				console.log(data);
				let includedIDs: { [key: string]: boolean } = {};
				data[0].map((record: any, index: number) => {
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
		setTabs(newTabs);
	}, [data && data[0]]);

	return (
		<ViewDataProvider>
			<SideBar />
			<MainTabs mainViewTabs={tabs} setMainViewTabs={setTabs} />
		</ViewDataProvider>
	);
};
export default withRouter(Home);
