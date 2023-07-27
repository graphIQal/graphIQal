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
					<div>Your Home Node</div>
					<NodeLink
						element={{
							routeString:
								'/' +
								(session.user.name
									? session.user.name
									: 'username') +
								'/' +
								session.user?.homenodeId,
						}}
					>
						{
							<div className='truncate'>
								{connectionMap[session.user?.homenodeId].title}
							</div>
						}
					</NodeLink>
					<Divider />
					<div>Your Homeless Node</div>
					<NodeLink
						element={{
							routeString:
								'/' +
								(session.user.name
									? session.user.name
									: 'username') +
								'/' +
								session.user?.homelessnodeId,
						}}
					>
						{
							<div className='truncate'>
								{
									connectionMap[session.user.homelessnodeId]
										.title
								}
							</div>
						}
					</NodeLink>
					<Divider />
					<div>Favourites</div>
					{favData[0].n.favourites.map((nodeId: string) => {
						return (
							<NodeLink
								element={{
									routeString:
										'/' +
										(session?.user?.name
											? session?.user?.name
											: 'username') +
										'/' +
										connectionMap[nodeId].id,
								}}
							>
								<div className='truncate'>
									{connectionMap[nodeId].title}{' '}
								</div>
							</NodeLink>
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
