// _document.js
/**
 * It is important to note here that we will add Head component to every page
 * for fields such as title and description. Only the global tags go here.
 */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				{/* All your global head tags such as meta, link, etc. will go here*/}
				<meta charset='utf-8' />
				<link rel='icon' href='%PUBLIC_URL%/favicon.ico' />

				<meta name='theme-color' content='#000000' />
				<meta
					name='description'
					content='Web site created using create-react-app'
				/>
				<link rel='apple-touch-icon' href='%PUBLIC_URL%/logo192.png' />
				{/* <!--
                manifest.json provides metadata used when your web app is installed on a
                user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
                --> */}
				<link rel='manifest' href='%PUBLIC_URL%/manifest.json' />
				{/* <!--
                Notice the use of %PUBLIC_URL% in the tags above.
                It will be replaced with the URL of the `public` folder during the build.
                Only files inside the `public` folder can be referenced from the HTML.

                Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
                work correctly both with client-side routing and a non-root public URL.
                Learn how to configure a non-root public URL by running `npm run build`.
                --> */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossorigin
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
