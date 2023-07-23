import neo4j from 'neo4j-driver';
// import { Neo4jAdapter } from '@auth/neo4j-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { driver } from '../../../backend/driver/helpers';
import NextAuth from 'next-auth/next';
// import { Neo4jAdapter } from '@next-auth/neo4j-adapter';
import { login } from '../../../backend/functions/authentication';
import { redirect } from 'next/navigation';
import { Neo4jAdapter } from '../../../backend/driver/neo4jAuthAdapter';
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

const neo4jSession = driver.session();

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-options
export default NextAuth({
	// https://authjs.dev/reference/providers/oauth-builtin
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				console.log('credentials, ');
				console.log(credentials);

				if (!credentials) return null;

				const res = await login(
					credentials.email,
					credentials.password
				);

				console.log('result', res);

				return {
					id: '1',
					email: credentials.email,
					password: credentials.password,
				};

				// if (res.length > 0) {
				// 	router.push('/' + username + '/' + res[0].n.properties.id);
				// 	localStorage.setItem('authentication', {
				// 		id: res[0].u.properties.id,
				// 		username: res[0].u.properties.username,
				// 		time: new Date(),
				// 		homenodeId: res[0].n.properties.id,
				// 	});
				// } else {
				// 	console.log('unexisting user');
				// }
				// localStorage.setItem('user', response.data);

				// const user = {
				// 	id: '1',
				// 	name: 'J Smith',
				// 	email: 'jsmith@example.com',
				// };

				// if (user) {
				// 	// Any object returned will be saved in `user` property of the JWT
				// 	return user;
				// } else {
				// 	// If you return null then an error will be displayed advising the user to check their details.
				// 	return null;

				// 	// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				// }
			},
		}),
	],
	adapter: Neo4jAdapter(neo4jSession),
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error', // Error code passed in query string as ?error=
		verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	callbacks: {
		async signIn({ user, account, profile, email }) {
			console.log('sign in');
			console.log({ user, account, profile, email });

			return true;
			// redirect()
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			console.log('redirect');
			console.log(url, baseUrl);
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async session({ session, token, user }) {
			console.log('session');
			console.log(token);
			console.log(user);
			// Send properties to the client, like an access_token and user id from a provider.
			// session.accessToken = token.accessToken;
			session.user = user;

			// session.user.id = token.id;

			return session;
		},
	},
	events: {
		async signIn({ user, account, profile, isNewUser }) {
			console.log('signed in ');
			console.log({ user, account, profile, isNewUser });
			// redirect()
		},
		async linkAccount({ user, account, profile }) {
			console.log('linked account');
			console.log({ user, account, profile });
		},
		async createUser({ user }) {
			console.log('create User');
			console.log(user);
		},
		async updateUser({ user }) {
			console.log('create User');
			console.log(user);
		},
	},
});
