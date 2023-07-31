import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcherAll } from '../../backend/driver/fetcher';
import MainTabs, {
	MainTabProps,
} from '../../components/organisms/Tabs/MainTabs';

import { ViewDataProvider } from '../../components/context/ViewContext';
import Document from '../../packages/dnd-editor/Document';
import Graph from '../../packages/graph/Graph';

// ('use client');

const Home: React.FC = () => {
	const router = useRouter();
	const { nodeId, username } = router.query;

	const { data, error, isLoading } = useSWR(
		[nodeId ? `/api/${username}/${nodeId}/document` : null],
		fetcherAll
	);
	let newTabs: MainTabProps[] = [
		{
			title: 'Document',
			viewId: '',
			viewType: 'document',
		},
		//temp graph for offline purposes
		// {
		//   label: 'Graph View',
		//   viewId: '',
		//   viewType: 'graph',
		//   component: <Graph viewId={''} title={'Graph View'} />,
		// },
	];

	const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);

	useEffect(() => {
		if (!data || !data[0] || data[0].err) return;

		if (!isLoading) {
			if (data[0]) {
				let includedIDs: { [key: string]: boolean } = {};
				data[0].map((record: any, index: number) => {
					if (!includedIDs[record.g.properties.id]) {
						includedIDs[record.g.properties.id] = true;

						newTabs.push({
							title: record.g.properties.title,
							viewId: record.g.properties.id,
							viewType: 'graph',
						});
					}
				});
			}
		}
		setTabs(newTabs);
	}, [data && data[0]]);

	return (
		<ViewDataProvider>
			<MainTabs mainViewTabs={tabs} setMainViewTabs={setTabs} />
		</ViewDataProvider>
	);
};
export default Home;
