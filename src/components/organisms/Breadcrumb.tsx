// components/Breadcrumb.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CircularGraph } from '@styled-icons/entypo/CircularGraph';
import LinkButton from '../molecules/LinkButton';

interface BreadcrumbLink {
	icon?: JSX.Element;
	title: string;
	path: string;
}

const Breadcrumb: React.FC<{
	getNodeTitle: () => string;
}> = ({ getNodeTitle }) => {
	const router = useRouter();
	const [pastLinks, setPastLinks] = useState<BreadcrumbLink[]>([]);

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			setPastLinks((prevLinks) => {
				const newTitle = getNodeTitle();
				if (
					prevLinks.length > 0 &&
					prevLinks[prevLinks.length - 1].title === newTitle
				)
					return prevLinks;

				// Keep the past 3 links in the array
				const updatedLinks = [
					...prevLinks,
					{ title: getNodeTitle(), path: url },
				];
				return updatedLinks.slice(-3);
			});
		};

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.asPath]);

	return (
		<nav className='text-gray-500 text-sm flex flex-row'>
			{pastLinks.map((link, index) => (
				<div key={index}>
					{index > 0 && <span className='mx-2'>/</span>}
					<LinkButton onClick={() => router.push(link.path)}>
						<div className='flex flex-row gap-x-1 align-center items-center'>
							{<CircularGraph size='1em' />}
							{link.title}
						</div>
					</LinkButton>
				</div>
			))}
		</nav>
	);
};

export default Breadcrumb;
