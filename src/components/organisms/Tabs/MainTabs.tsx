import Link from 'next/link';
import { Router, useRouter, withRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Tab from '../../atoms/Tab';
import { Tabs } from './Tabs';
import { useViewAPI, useViewData } from '../../context/ViewContext';
import { useGetNodeData } from '../../../backend/functions/node/query/useGetNodeData';
import IconCircleButton from '../../molecules/IconCircleButton';
import Modal from '../../layouts/Modal';
import SettingsPanel from '../Settings';
import IconButton from '../../atoms/IconButton';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcher } from '../../../backend/driver/fetcher';
import { SideBar } from '../sidebar-navigator';
import { formatNodeConnectionstoMap } from '../../../helpers/frontend/formatNodeConnectionstoMap.ts';
import { addFavourite } from '../../../backend/functions/general/favourites/add';
import { deleteFavourite } from '../../../backend/functions/general/favourites/delete';

type MainTabsProps = {
	mainViewTabs: MainTabProps[];
	setMainViewTabs: (val: MainTabProps[]) => void;
	router: Router;
};

export type MainTabProps = {
	label: string;
	viewId: string;
	viewType: 'document' | 'graph';
	component?: any;
};
const MainTabs: React.FC<MainTabsProps> = ({
	mainViewTabs,
	setMainViewTabs,
}) => {
	const {
		changeWindowVar,
		changeDocumentVar,
		changeUsername,
		changeNodeId,
		changeNodeData,
		changeCurrTab,
	} = useViewAPI();

	const { currTab } = useViewData();

	useEffect(() => {
		changeWindowVar(window);
		changeDocumentVar(document);
	}, []);

	const router = useRouter();
	const { username, nodeId, tab } = router.query;

	useEffect(() => {
		if (!tab) return;
		changeCurrTab(parseInt(router.query.tab as string));
	}, [tab]);

	useEffect(() => {
		changeUsername(username as string);
	}, [username]);

	useEffect(() => {
		changeNodeId(nodeId as string);
		changeCurrTab(0);
	}, [nodeId]);

	useEffect(() => {
		// if (router.query.tab) return;
		if (!username) return;
		if (mainViewTabs.length == 0) return;
		router.push(
			{
				pathname: '/' + username + '/' + nodeId,
				query: {
					view: mainViewTabs[0].viewType,
					viewId: mainViewTabs[0].viewId,
					tab: 0,
				},
			},
			undefined,
			{ shallow: true }
		);
	}, [nodeId, mainViewTabs]);

	// Dude this is launching like 17 times, each re-render calls it once more.
	// Maybe it doesn't matter since swr does automatic caching?
	const res = useGetNodeData(nodeId as string, 'maintab');

	useEffect(() => {
		if (res) {
			changeNodeData(res);
		}
	}, [res]);

	const { data: session, status } = useSession();

	const {
		data: favData,
		error: favError,
		isLoading: favisLoading,
	} = useSWR(
		status === 'authenticated' && session?.user?.favouritesId
			? '/api/username/' + session.user.favouritesId
			: null,
		fetcher,
		{ revalidateOnMount: false }
	);

	const connectionMap = favData
		? formatNodeConnectionstoMap(favData[0])
		: null;

	const [isSettingsOpen, setisSettingsOpen] = useState(false);

	return (
		<div className='h-screen overflow-y-auto max-h-full max-x-full overflow-x-hidden'>
			<SideBar favData={favData} connectionMap={connectionMap} />
			<Modal open={isSettingsOpen} setOpen={setisSettingsOpen}>
				<SettingsPanel />
			</Modal>
			<div className='h-10 flex flex-row bg-blue-50 w-full items-center align-middle absolute top-0 z-10 justify-between'>
				<div className='flex flex-row'>
					<IconCircleButton
						onClick={() => {
							console.log('hover on left side for favourites');
						}}
						size={35}
						src='menu'
						circle={false}
						// color={'#FFCB45'}
						selected={false}
					/>
					<IconCircleButton
						onClick={() => {
							console.log('openSettings');
							setisSettingsOpen(true);
						}}
						size={35}
						src='settings'
						circle={false}
						// color={'#FFCB45'}
						selected={false}
					/>
					<div>breadcrumb</div>
				</div>
				<div className='flex flex-row'>
					<IconCircleButton
						onClick={() => {
							// all we need to do is write a function that addes to favourites. Easy money
							if (
								nodeId &&
								session &&
								session.user &&
								nodeId !== session?.user?.homenodeId &&
								nodeId !== session?.user?.homelessnodeId
							) {
								// Not in favourites
								if (
									nodeId && connectionMap
										? (nodeId as string) in connectionMap
										: false
								) {
									deleteFavourite({
										favouritesId: session.user.favouritesId,
										nodeId: nodeId as string,
									});
									//is in favourites
								} else {
									addFavourite({
										favouritesId: session.user.favouritesId,
										nodeId: nodeId as string,
									});
								}
							}
						}}
						size={40}
						src='star'
						circle={false}
						color={'#FFCB45'}
						selected={
							nodeId && connectionMap
								? (nodeId as string) in connectionMap
								: false
						}
					/>
				</div>
			</div>
			<Tabs>
				{mainViewTabs.map((tab, index) => {
					return (
						<div key={index}>
							<Link
								href={{
									pathname: '/' + username + '/' + nodeId,
									query: {
										view: tab.viewType,
										viewId: tab.viewId,
										tab: index,
									},
								}}
							>
								<Tab
									label={tab.label}
									selected={
										mainViewTabs[currTab].viewId ===
										tab.viewId
									}
									index={index}
									currTab={currTab}
									setCurrTab={changeCurrTab}
									tabs={mainViewTabs}
									setTabs={setMainViewTabs}
									onClick={() => null}
								/>
							</Link>
						</div>
					);
				})}
			</Tabs>
			{mainViewTabs.map((tab, i) => {
				return (
					<div
						className='pt-20 h-screen'
						key={i}
						style={{
							display:
								mainViewTabs[currTab].viewId === tab.viewId
									? 'block'
									: 'none',
						}}
					>
						{tab.component}
					</div>
				);
			})}
		</div>
	);
};
export default withRouter(MainTabs);
