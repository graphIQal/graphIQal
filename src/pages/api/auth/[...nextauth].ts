// import { Neo4jAdapter } from '@auth/neo4j-adapter';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { driver, read } from '../../../backend/driver/helpers';
// import { Neo4jAdapter } from '@next-auth/neo4j-adapter';
import { DefaultSession } from 'next-auth';
import { Neo4jAdapter } from '../../../backend/driver/neo4jAuthAdapter';
import {
	compareHashPassword,
	hashPassword,
} from '../../../backend/functions/authentication';
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

const neo4jSession = driver.session();

declare module 'next-auth' {
	interface User {
		homelessnodeId: string;
		homenodeId: string;
		favourites: string[];
	}

	interface Session extends DefaultSession {
		user?: User;
	}

	interface JWT {
		user?: User;
	}
}

// declare module "next-auth/jwt" {
// 	interface JWT {
// 	  role?: Role;
// 	  subscribed: boolean;
// 	}
//   }

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

				const params = {
					email: credentials.email,
				};

				// Basically, if these credentials exist -> Signin. Do I have to manage a token? Let's try.

				const cypher: string = `
					MATCH (u:User {
						email: $email
					})
					MATCH (u)-[r:HAS]->(n)
					RETURN u,r,n;
					`;

				const res: any = await read(cypher, params);

				if (
					res.length > 0 &&
					compareHashPassword(
						credentials.password,
						res[0].u.properties.password
					).success
				) {
					console.log('res', res[0].u.properties);
					return res[0].u.properties;
				} else {
					// Signup flow -> Probably from signup.
					return null;
				}
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
		async jwt({ token, user, account, profile }) {
			console.log('jwt');
			console.log(token);
			console.log(user);

			token = { ...token, ...user };
			return token;
		},
		async signIn({ user, account, profile, email }) {
			console.log('sign in');
			console.log({ user, account, profile, email });

			return true;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			// console.log('redirect');
			// // console.log(url, baseUrl);
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async session({ session, token, user }) {
			console.log('session');
			console.log(session);
			console.log(token);
			console.log(user);

			// Send properties to the client, like an access_token and user id from a provider.
			// session.accessToken = token.accessToken;
			session.user = { ...session.user, ...token, ...user };
			token = { ...token, ...user };

			console.log('new session');
			console.log(session);
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
	session: {
		strategy: 'jwt',
		maxAge: 60 * 24 * 60 * 60, // 30 days
		updateAge: 24 * 60 * 60, // 24 hours
	},
});
