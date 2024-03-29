import React, { useEffect, useState } from 'react';
import { NodeLink } from '../../packages/editor/Elements/Elements';
import { signOut, useSession } from 'next-auth/react';
import Divider from '../atoms/Divider';
import TextButton from '../molecules/TextButton';
import { Router, useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../backend/driver/fetcher';
import { useViewData } from '../context/ViewContext';
import {
	connectionMapType,
	formatNodeConnectionstoMap,
} from '../../helpers/frontend/formatNodeConnectionstoMap.ts';
import { connectedNode_type } from '../../backend/functions/node/query/useGetNodeData';

export const SideBar: React.FC<{
	favData: any;
	connectionMap: connectionMapType | null;
}> = ({ connectionMap, favData }) => {
	const { data: session, status } = useSession();

	const router = useRouter();

	if (status === 'authenticated' && session?.user && connectionMap) {
		return (
			<div className='bg-secondary_white  w-52 -translate-x-48 hover:translate-x-0 rounded-r-md border-r-[0.5px] border-y-[0.5px] p-6 border-lining transition-all z-50 opacity-0 hover:opacity-100 absolute left-0 ease-in-out justify-self-center self-center top-1/2 -translate-y-1/2 h-[60vh] hover:h-[80vh]'>
				<div>
					<div>🏠 Your Home Node</div>
					<NodeLink
						element={{
							routeString:
								'/' +
								(session.user.name
									? session.user.name
									: 'username') +
								'/' +
								session.user?.homenodeId,
							icon: connectionMap[session.user?.homenodeId].icon,
						}}
					>
						{
							<span className='truncate'>
								{connectionMap[session.user?.homenodeId].title}
							</span>
						}
					</NodeLink>
					<Divider />
					<div>🏚 Homeless Nodes</div>
					<NodeLink
						element={{
							routeString:
								'/' +
								(session.user.name
									? session.user.name
									: 'username') +
								'/' +
								session.user?.homelessnodeId,
							icon: connectionMap[session.user.homelessnodeId]
								.icon,
						}}
					>
						{
							<span className='truncate'>
								{
									connectionMap[session.user.homelessnodeId]
										.title
								}
							</span>
						}
					</NodeLink>
					<Divider />
					<div>⭐️ Favourites</div>
					{favData.n.favourites.map((nodeId: string) => {
						return (
							<div className='my-1'>
								<NodeLink
									key={nodeId}
									element={{
										routeString:
											'/' +
											(session?.user?.name
												? session?.user?.name
												: 'username') +
											'/' +
											connectionMap[nodeId].id,
										icon: connectionMap[nodeId].icon,
									}}
								>
									<span className='truncate'>
										{connectionMap[nodeId].title}
									</span>
								</NodeLink>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div className='bg-secondary_white  w-60 -translate-x-48 hover:translate-x-0 rounded-r-md border-r-[0.5px] border-y-[0.5px] p-6 border-lining transition-all z-50 opacity-0 hover:opacity-100 absolute left-0 ease-in-out justify-self-center self-center top-1/2 -translate-y-1/2 h-[80vh]'>
			<div>
				<div className='font-bold'>You're not logged in.</div>
				<div>Login to unlock favourites</div>
				<Divider />
				<TextButton
					text={'Login'}
					onClick={() => router.push('/auth/signin')}
				></TextButton>
			</div>
		</div>
	);
};
