// components/Breadcrumb.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface BreadcrumbLink {
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
				console.log('prevLinks', prevLinks);
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
		<nav className='text-gray-500 text-sm'>
			<ul className='flex'>
				{pastLinks.map((link, index) => (
					<li key={index}>
						{index > 0 && <span className='mx-2'>/</span>}
						{index === pastLinks.length - 1 ? (
							<span>{link.title}</span>
						) : (
							<Link href={link.path}>{link.title}</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Breadcrumb;
