// _app.js
/**
 * if you have any global layout in index.html file, change that to a react component
 * and use it to wrap all your pages
 */
// impoet global styles and layout (you can move global styles to /styles/ directory if you like)

import Head from 'next/head';
import '../src/App.css';
import '../src/components/molecules/molecules.css';
import '../src/components/organisms/split-pane/pane.css';
import '../src/packages/editor/editor.css';

import View from '../src/components/layouts/View';
import Window from '../src/components/layouts/Window';
import HomeNode from '../src/pages/HomeNode';
import Document from '../src/pages/document/Document.tsx';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>graphIQal</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
			</Head>
			<Window>
				<View>
					<HomeNode />
				</View>
			</Window>
		</>
	);
}
