import Link from 'next/link';
import { Router, useRouter, withRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Tab from '../../atoms/Tab';
import { Tabs } from './Tabs';
import { useViewAPI, useViewData } from '../../context/ViewContext';
import {
	connectedNode_type,
	useGetNodeData,
} from '../../../backend/functions/node/query/useGetNodeData';
import IconCircleButton from '../../molecules/IconCircleButton';
import Modal from '../../layouts/Modal';
import SettingsPanel from '../Settings';
import IconButton from '../../atoms/IconButton';
import { useSession } from 'next-auth/react';
import useSWR, { KeyedMutator } from 'swr';
import { fetcher, fetcherSingleReturn } from '../../../backend/driver/fetcher';
import { SideBar } from '../sidebar-navigator';
import { formatNodeConnectionstoMap } from '../../../helpers/frontend/formatNodeConnectionstoMap.ts';
import { addFavourite } from '../../../backend/functions/general/favourites/add';
import { deleteFavourite } from '../../../backend/functions/general/favourites/delete';
import { removeFromArray } from '../../../helpers/general/removeFromArray';
import Document from '../../../packages/dnd-editor/Document';
import Graph from '../../../packages/graph/Graph';

import { CircularGraph } from '@styled-icons/entypo/CircularGraph';
import LinkButton from '../../molecules/LinkButton';
import Breadcrumb from '../Breadcrumb';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type MainTabsProps = {
	mainViewTabs: MainTabProps[];
	setMainViewTabs: (val: MainTabProps[]) => void;
	mutateGraphViews: KeyedMutator<any>;
};

export type MainTabProps = {
	title: string;
	viewId: string;
	viewType: 'document' | 'graph';
};
const MainTabs: React.FC<MainTabsProps> = ({
	mainViewTabs,
	setMainViewTabs,
	mutateGraphViews,
}) => {
	const {
		changeWindowVar,
		changeDocumentVar,
		changeUsername,
		changeNodeId,
		changeCurrNodeData,
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

		// if (!viewId && !view)
		router.replace(
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
	// const res = useGetNodeData(nodeId as string, 'maintab');

	const {
		data: nodeDataSWR,
		// isLoading,
		// error,
		// mutate: SWRmutateCurrNode,
	} = useSWR(
		[nodeId ? `/api/username/${nodeId}` : null],
		fetcherSingleReturn,
		{ revalidateOnMount: true, revalidateOnFocus: true }
	);

	useEffect(() => {
		if (nodeDataSWR) {
			('changeNodeData');
			changeCurrNodeData(nodeDataSWR);
		}
	}, [nodeDataSWR]);

	const { data: session, status } = useSession();

	const {
		data: favData,
		// error: favError,
		// isLoading: favisLoading,
		mutate: mutateFav,
	} = useSWR(
		status === 'authenticated' && session?.user?.favouritesId
			? '/api/username/' + session.user.favouritesId
			: null,
		fetcherSingleReturn,
		{ revalidateOnMount: true }
	);

	const connectionMap = favData ? formatNodeConnectionstoMap(favData) : null;

	const [isSettingsOpen, setisSettingsOpen] = useState(false);

	const BarComponents = useMemo(
		() => ({
			favourite: (
				<IconCircleButton
					onClick={async () => {
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
								const newData = {
									n: {
										...favData.n,
										// DUDE WHAT THE FUCK IF I MAKE THIS LENGTH - 1 IT'S INSTANT BUT IF NOT NAH
										// okay this works idk why idk how idk what im calling it a day. 12:50AM jul 28 2023 i hate my life
										favourites: favData.n.favourites.filter(
											(id: string) =>
												id !== (nodeId as string)
										),
										// In fact, if I just copy n it's slow af.
										// This is the correct code but man idk.
										// favourites: removeFromArray(
										// 	favData.n.favourites,
										// 	nodeId
										// ),
										// WHATTT. 2 STrings. Okay, in fact, instant! 3 STRINGS AND IT"S a whole second????
										// I tested different strings too. 2/3 of any of these will always be fast. 3/3 always slow.
										// In fact, I tested random strings and they're fast. But these three specific strings and they're slow?
										// I've found some inconsistencies, I think i'm getting caught up in this.
										// favourites: [
										// 	'2ac3cddd-ff9b-4e97-a494-c1f076d431a6',
										// 	'7276d7d8-d1bb-4016-9f1e-2bce21d88e0f',
										// 	'8b800581-d8af-408c-9ac7-f3ca7f16ac36',
										// 	'9e0bc847-25cc-4fb7-a437-f7c956be4958',
										// ],
										// For whatever reason, (it's not rendering, or the speed of removeFromArray. Tested w/ whatever)
										// Inputting favourites here makes the re-render hella slow, like a whole second later.
									},
									connectedNodes: removeFromArray(
										favData.connectedNodes,
										nodeId,
										(node: connectedNode_type) =>
											node.connected_node.id === nodeId
									),
								};

								await mutateFav(
									deleteFavourite({
										favouritesId: session.user.favouritesId,
										nodeId: nodeId as string,
									}),
									{
										optimisticData: newData,
										populateCache: false,
									}
								);
							} else {
								const newData = {
									n: {
										...favData.n,
										favourites: [
											...favData.n.favourites,
											nodeId,
										],
									},
									connectedNodes: [
										...favData.connectedNodes,
										{
											r: { type: 'HAS' },
											connected_node: nodeDataSWR.n,
										},
									],
								};

								await mutateFav(
									addFavourite({
										favouritesId: session.user.favouritesId,
										nodeId: nodeId as string,
									}),
									{
										optimisticData: newData,
										populateCache: false,
									}
								);
							}
						}
					}}
					size={30}
					src='star'
					circle={false}
					color={'#FFCB45'}
					selected={
						nodeId && connectionMap
							? (nodeId as string) in connectionMap
							: false
					}
					hoverText='Favourite this node'
				/>
			),
			favouriteBar: (
				<IconCircleButton
					onClick={() => {
						console.log('hover on left side for favourites');
					}}
					hoverText='Mouse to the left of the window for the favourites sidebar'
					size={30}
					src='menu'
					circle={false}
					selected={false}
				/>
			),
			settings: (
				<IconCircleButton
					onClick={() => {
						setisSettingsOpen(true);
					}}
					hoverText='Settings'
					size={40}
					src='settings'
					circle={false}
					// color={'#FFCB45'}
					selected={false}
				/>
			),
			breadcrumb: nodeDataSWR && (
				<>
					<Breadcrumb
						getNodeTitle={() => nodeDataSWR.n.title}
						getNodeIcon={() => nodeDataSWR.n.icon}
					/>
				</>
			),
		}),
		[nodeId, favData, connectionMap]
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='h-screen overflow-y-hidden max-h-screen max-x-full overflow-x-hidden'>
				<SideBar favData={favData} connectionMap={connectionMap} />
				<Modal open={isSettingsOpen} setOpen={setisSettingsOpen}>
					<SettingsPanel />
				</Modal>
				<div className='w-screen h-10 bg-blue-50'>
					<Tabs mutateGraphViews={mutateGraphViews}>
						{mainViewTabs.map((tab, index) => {
							if (index === 0 && nodeDataSWR)
								tab.title = nodeDataSWR.n.title;
							return (
								<div key={index}>
									<Link
										href={{
											pathname:
												'/' + username + '/' + nodeId,
											query: {
												view: tab.viewType,
												viewId: tab.viewId,
												tab: index,
											},
										}}
										shallow={true}
									>
										<Tab
											label={tab.title}
											id={tab.viewId}
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
											viewType={tab.viewType}
										/>
									</Link>
								</div>
							);
						})}
					</Tabs>
				</div>
				{mainViewTabs.map((tab, i) => {
					return (
						<div
							className=' h-screen pb-10'
							key={i}
							style={{
								display:
									mainViewTabs[currTab].viewId === tab.viewId
										? 'block'
										: 'none',
							}}
						>
							{tab.viewType === 'document' ? (
								// Add the information from the bar, and inside the component we can render custom data HOLY SHIT YES.
								<Document
									viewId={tab.viewId}
									barComponents={BarComponents}
								></Document>
							) : (
								<Graph
									viewId={tab.viewId}
									title={tab.title}
									barComponents={BarComponents}
								/>
							)}
						</div>
					);
				})}
			</div>
		</DndProvider>
	);
};
export default MainTabs;
