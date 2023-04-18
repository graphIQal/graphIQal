import Link from 'next/link';

export default function Home() {
	return (
		<ul>
			<li>
				<Link href='/'>Home</Link>
			</li>
			<li>
				<Link href='/username/SplitPaneWrapper'>Document</Link>
			</li>
			<li>
				<Link href='/username/graph'>Blog Post</Link>
			</li>
		</ul>
	);
}
