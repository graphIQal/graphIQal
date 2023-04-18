import Link from 'next/link';
import View from '../src/components/layouts/View';
import Window from '../src/components/layouts/Window';
import HomeNode from '../src/pages/HomeNode';
import Document from '../src/pages/document/Document.tsx';
import SplitPaneWrapper from './SplitPaneWrapper';

export default function Home() {
	return (
		<ul>
			<li>
				<Link href='/'>Home</Link>
			</li>
			<li>
				<Link href='/SplitPaneWrapper'>Document</Link>
			</li>
			<li>
				<Link href='/graph'>Blog Post</Link>
			</li>
		</ul>
	);
}
