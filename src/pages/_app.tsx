// _app.js
/**
 * if you have any global layout in index.html file, change that to a react component
 * and use it to wrap all your pages
 */
// impoet global styles and layout (you can move global styles to /styles/ directory if you like)

import Head from 'next/head';
import React, { useEffect } from 'react';
import { useState } from 'react';

import '@/styles/globals.css';
import '../packages/resizable/resizable.css';
import '../packages/graph/graph.css';
import '../components/organisms/split-pane/pane.css';
import '../packages/editor/editor.css';

import View from '../components/layouts/View';
import Window from '../components/layouts/Window';
// import TabContext from '../components/context/ViewContext';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { usePersistentSWRCache } from '../helpers/hooks/useSWRCache';
import { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	// usePersistentSWRCache();

	return (
		<>
			<Head>
				<title>graphIQal</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
			</Head>
			<main>
				<SWRConfig>
					<SessionProvider>
						<Window>
							<View>
								<Component {...pageProps} />
								<Toaster />
							</View>
						</Window>
					</SessionProvider>
				</SWRConfig>
			</main>
		</>
	);
}
