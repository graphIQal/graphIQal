/**
 * ## Installation
 *
 * ```bash npm2yarn2pnpm
 * npm install @auth/neo4j-adapter neo4j-driver
 * ```
 *
 * @module @auth/neo4j-adapter
 */
import { type Session, isInt, integer } from 'neo4j-driver';
import { Adapter } from 'next-auth/adapters';
// import type { Adapter } from '@auth/core/adapters';

/** This is the interface of the Neo4j adapter options. The Neo4j adapter takes a {@link https://neo4j.com/docs/bolt/current/driver-api/#driver-session Neo4j session} as its only argument. */
export interface Neo4jOptions extends Session {}

/**
 * The following node labels are used.
 *
 * - User
 * - Account
 * - Session
 * - VerificationToken
 *
 * #### Relationships
 *
 * The following relationships and relationship labels are used.
 *
 * - (:User)-[:HAS_ACCOUNT]->(:Account)
 * - (:User)-[:HAS_SESSION]->(:Session)
 *
 * #### Properties
 *
 * This schema is adapted for use in Neo4J and is based upon our main [models](https://authjs.dev/reference/adapters#models). Please check there for the node properties. Relationships have no properties.
 *
 * #### Indexes
 *
 * Optimum indexes will vary on your edition of Neo4j i.e. community or enterprise, and in case you have your own additional data on the nodes. Below are basic suggested indexes.
 *
 * 1. For **both** Community Edition & Enterprise Edition create constraints and indexes
 *
 * ```cypher
 *
 * CREATE CONSTRAINT user_id_constraint IF NOT EXISTS
 * ON (u:User) ASSERT u.id IS UNIQUE;
 *
 * CREATE INDEX user_id_index IF NOT EXISTS
 * FOR (u:User) ON (u.id);
 *
 * CREATE INDEX user_email_index IF NOT EXISTS
 * FOR (u:User) ON (u.email);
 *
 * CREATE CONSTRAINT session_session_token_constraint IF NOT EXISTS
 * ON (s:Session) ASSERT s.sessionToken IS UNIQUE;
 *
 * CREATE INDEX session_session_token_index IF NOT EXISTS
 * FOR (s:Session) ON (s.sessionToken);
 * ```
 *
 * 2.a. For Community Edition **only** create single-property indexes
 *
 * ```cypher
 * CREATE INDEX account_provider_index IF NOT EXISTS
 * FOR (a:Account) ON (a.provider);
 *
 * CREATE INDEX account_provider_account_id_index IF NOT EXISTS
 * FOR (a:Account) ON (a.providerAccountId);
 *
 * CREATE INDEX verification_token_identifier_index IF NOT EXISTS
 * FOR (v:VerificationToken) ON (v.identifier);
 *
 * CREATE INDEX verification_token_token_index IF NOT EXISTS
 * FOR (v:VerificationToken) ON (v.token);
 * ```
 *
 * 2.b. For Enterprise Edition **only** create composite node key constraints and indexes
 *
 * ```cypher
 * CREATE CONSTRAINT account_provider_composite_constraint IF NOT EXISTS
 * ON (a:Account) ASSERT (a.provider, a.providerAccountId) IS NODE KEY;
 *
 * CREATE INDEX account_provider_composite_index IF NOT EXISTS
 * FOR (a:Account) ON (a.provider, a.providerAccountId);
 *
 * CREATE CONSTRAINT verification_token_composite_constraint IF NOT EXISTS
 * ON (v:VerificationToken) ASSERT (v.identifier, v.token) IS NODE KEY;
 *
 * CREATE INDEX verification_token_composite_index IF NOT EXISTS
 * FOR (v:VerificationToken) ON (v.identifier, v.token);
 * ```
 */
export function Neo4jAdapter(session: Session): Adapter {
	const { read, write } = client(session);

	return {
		async createUser(data) {
			console.log('create User');
			const homelessnodeId = crypto.randomUUID();
			const homenodeId = crypto.randomUUID();
			const favouritesId = crypto.randomUUID();

			const document = `[{"type":"block","id":"9d67707d-d70a-4b27-8aa1-e6efdaa900f5","children":[{"type":"p","id":"daf56f00-46e6-4f75-9114-25d6d6b87b6c","children":[{"text":"Hi! Jesse & Isabelle here, welcome to graphIQal!","bold":true},{"text":" "}]}]},{"type":"block","children":[{"type":"p","id":"d4e42f0d-14a5-4896-9295-e6842778ecf1","children":[{"text":""}]}],"id":"138dff5b-238b-4f3e-b75c-2daabeb038bf"},{"type":"block","children":[{"type":"p","id":"c9f286dc-2d49-4945-ab9c-7ca523e08c55","children":[{"text":"We hope graphIQal will improve your life, and we're so excited for you to join the community! "}]}],"id":"e3c2a7e7-c8ca-4bca-af72-e13609ddb3ae"},{"type":"block","children":[{"type":"p","id":"28318bfa-aa54-4a13-afa2-1991c8b0d383","children":[{"text":""}]}],"id":"a3df39e1-274c-4544-8dde-e994ba9f71f3"},{"type":"block","children":[{"type":"p","id":"b4e67215-d12c-4c50-acb8-29a47a381411","children":[{"text":"Give us your direct feedback and what you want, and we'll respond with a timeframe for incorporating it! ","bold":true}]}],"id":"01274b85-bae6-497e-a639-1267496f5ace"},{"type":"block","children":[{"type":"li","id":"2913aee2-31c5-4560-bf0f-0a55ee29229c","children":[{"text":"Link for that"}]}],"id":"15caf697-9948-4c2b-b2b3-80dfb29c4db1"},{"type":"block","children":[{"type":"p","id":"11de475f-c44b-43fc-8620-d7e329f89fb8","children":[{"text":""}]}],"id":"b80767fa-ce8b-472f-93b3-638345a57ca5"},{"type":"block","children":[{"type":"p","id":"fb0426be-6ae2-4f39-bf1c-13a43844de56","children":[{"text":"How do you use graphIQal? ","bold":true}]}],"id":"fd289304-aa57-42e7-b80e-ed1d7180cc2e"},{"type":"block","children":[{"type":"li","id":"c7ea7127-7d27-4274-adab-d525d44d1c6d","children":[{"text":"Link One"}]},{"type":"block","children":[{"type":"action_item","id":"d23cfd5c-0020-4da7-a441-996a0394433f","children":[{"text":"Add Linking to text lmao"}],"checked":false}],"id":"239c9018-3661-408a-aca4-309ede73a885"}],"id":"5fa04fea-d067-482e-9480-126f971ccd48"},{"type":"block","children":[{"type":"li","id":"1618021e-2bca-498f-a95b-3b922c4d6522","children":[{"text":"Link two "}]}],"id":"832bfe4b-b8dc-4512-8009-e5b330e7b14f"},{"type":"block","children":[{"type":"p","id":"75c7004b-5388-4c4b-aab2-d0b9e5f5dc04","children":[{"text":""}]}],"id":"4e5ce1cd-cfa0-434f-bd1e-45657c363c46"},{"type":"block","children":[{"type":"p","id":"a0f8ce52-0c3d-4452-8478-816f367143a8","children":[{"text":"Learn more about why we created graphIQal ","bold":true}]}],"id":"45a783c9-3353-4b03-aeed-87bee8d66e1f"},{"type":"block","children":[{"type":"li","id":"6db8f43c-7b70-45c3-835b-b9ee6000d2e4","children":[{"text":"Link one"}]}],"id":"87d52ecf-330a-42d6-9a99-225aabc07f12"},{"type":"block","children":[{"type":"li","id":"4ffc17d9-c4a0-4e5e-b917-4bd146c7a80f","children":[{"text":"Link two "}]}],"id":"08fb1175-90a3-4312-91e2-10a4bb09582a"},{"type":"block","children":[{"type":"p","id":"55a8a164-534c-423f-a1ed-2474d94349d8","children":[{"text":""}]}],"id":"9e674720-6025-4042-9c44-29f89b2d19af"},{"type":"block","children":[{"type":"p","id":"1e7115f0-5aaa-4e53-9684-fe6e6686b547","children":[{"text":"Give us feedback! ","bold":true}]}],"id":"cfb977b3-cd34-448f-bc4d-f56476150f2b"},{"type":"block","children":[{"type":"li","id":"cb4b8539-3a37-4035-8868-01db1094e515","children":[{"text":"Feedback Link"}]}],"id":"f96f059b-f72f-4c7a-8104-3dfc4635950e"},{"type":"block","children":[{"type":"li","id":"9cc02540-782a-4be6-9ce5-58120f4c2afa","children":[{"text":"Social Link "}]}],"id":"93354b60-80ce-49f0-ab4a-2ba052c624d4"},{"type":"block","children":[{"type":"li","id":"236f0ffc-281f-4bc0-bd30-712ae298d88e","children":[{"text":""}]}],"id":"72ad6efa-7839-499c-8cb1-c97c5f79cbb1"},{"type":"block","children":[{"type":"p","id":"b5bf6714-2a95-444d-b820-b94699e61b1a","children":[{"text":"","bold":true}]}],"id":"64719a39-2732-4ee2-aaa9-3b27a90d4799"},{"type":"block","children":[{"type":"p","id":"ab230c57-330a-4544-b575-189ef801d962","children":[{"text":""}]}],"id":"8551ec8e-1563-4f60-8bda-b2e175ddfcc0"}]`;

			const user = {
				id: crypto.randomUUID(),
				...data,
				homenodeId,
				homelessnodeId,
				favouritesId,
				document,
			};

			const homenodeName = user.name
				? user.name + "'s Home Node"
				: 'Home Node';
			const homelessnodeName = 'Homeless Nodes';

			await write(
				`CREATE (u:User $data)

                CREATE (n:Node {title: "${homenodeName}"})
				SET n.id = "${homenodeId}", n.document = $data.document
                MERGE (u)-[r:HAS]->(n)

                CREATE (h:Node {title: "${homelessnodeName}"})
                SET h.id = "${homelessnodeId}"
                MERGE (n)-[:RELATED]-(h)

                CREATE (f:Node {title: "Favourites"})
                SET f.id = "${favouritesId}", f.favourites = []
                MERGE (f)-[:HAS]->(n)
				MERGE (f)-[:HAS]->(h)

                MERGE (b:BLOCK_ELEMENT {type: "block", id: randomUuid()})
                MERGE (n)-[:NEXT_BLOCK]->(b)

                MERGE (p:BLOCK_INLINE {type: "p", id: randomUuid(), children: ["{text: ''}"]})
                MERGE (b)-[:BLOCK_CHILD]->(p)

                MERGE (g:GRAPH_VIEW {title: "Graph View"})<-[:VIEW]-(n)
                ON CREATE SET g.id = randomUuid()
                RETURN u, n, b
            `,
				user
			);

			return user;
		},

		async getUser(id) {
			console.log('getUser');
			return await read(`MATCH (u:User { id: $id }) RETURN u{.*}`, {
				id,
			});
		},

		async getUserByEmail(email) {
			console.log('getuserbyemail');
			return await read(`MATCH (u:User { email: $email }) RETURN u{.*}`, {
				email,
			});
		},

		async getUserByAccount(provider_providerAccountId) {
			console.log('getuserbyaccount');
			return await read(
				`MATCH (u:User)-[:HAS_ACCOUNT]->(a:Account {
                    provider: $provider,
                    providerAccountId: $providerAccountId
                })
                RETURN u{.*}`,
				provider_providerAccountId
			);
		},

		async updateUser(data) {
			console.log('updateUser');
			return (
				await write(
					`MATCH (u:User { id: $data.id })
                    SET u += $data
                    RETURN u{.*}`,
					data
				)
			).u;
		},

		async deleteUser(id) {
			// return await write(
			// 	`MATCH (u:User { id: $data.id })
			// 	WITH u, u{.*} AS properties
			// 	DETACH DELETE u
			// 	RETURN properties`,
			// 	{ id }
			// );
		},

		async linkAccount(data) {
			console.log('link account attempted');
			console.log('data');
			console.log(data);
			const { userId, ...a } = data;
			console.log(
				await write(
					`MATCH (u:User { id: $data.userId })
                MERGE (a:Account {
                providerAccountId: $data.a.providerAccountId,
                provider: $data.a.provider
                }) 
                SET a += $data.a
                MERGE (u)-[:HAS_ACCOUNT]->(a)`,
					{ userId, a }
				)
			);
			return data;
		},

		async unlinkAccount(provider_providerAccountId) {
			return await write(
				`MATCH (u:User)-[:HAS_ACCOUNT]->(a:Account {
                providerAccountId: $data.providerAccountId,
                provider: $data.provider
                })
                WITH u, a, properties(a) AS properties
                DETACH DELETE a
                RETURN properties { .*, userId: u.id }`,
				provider_providerAccountId
			);
		},

		async createSession(data) {
			console.log('create session');
			console.log(data);
			const { userId, ...s } = format.to(data);
			console.log(
				await write(
					`MATCH (u:User { id: $data.userId })
                CREATE (s:Session)
                SET s = $data.s
                CREATE (u)-[:HAS_SESSION]->(s)`,
					{ userId, s }
				)
			);
			return data;
		},

		async getSessionAndUser(sessionToken) {
			console.log('getsessionanduser');
			const result = await write(
				`OPTIONAL MATCH (u:User)-[:HAS_SESSION]->(s:Session { sessionToken: $data.sessionToken })
                WHERE s.expires <= datetime($data.now)
                DETACH DELETE s
                WITH count(s) AS c
                MATCH (u:User)-[:HAS_SESSION]->(s:Session { sessionToken: $data.sessionToken })
                RETURN s { .*, userId: u.id } AS session, u{.*} AS user`,
				{ sessionToken, now: new Date().toISOString() }
			);

			console.log(result);

			if (!result?.session || !result?.user) return null;

			console.log('getsession and user return');
			console.log({ session: result.session, user: result.user });

			return {
				session: format.from<any>(result.session),
				user: format.from<any>(result.user),
			};
		},

		async updateSession(data) {
			console.log('updateSession');
			return await write(
				`MATCH (u:User)-[:HAS_SESSION]->(s:Session { sessionToken: $data.sessionToken })
                SET s += $data
                RETURN s { .*, userId: u.id }`,
				data
			);
		},

		async deleteSession(sessionToken) {
			return await write(
				`MATCH (u:User)-[:HAS_SESSION]->(s:Session { sessionToken: $data.sessionToken })
         WITH u, s, properties(s) AS properties
         DETACH DELETE s
         RETURN properties { .*, userId: u.id }`,
				{ sessionToken }
			);
		},

		async createVerificationToken(data) {
			console.log('create verification token ');
			await write(
				`MERGE (v:VerificationToken {
           identifier: $data.identifier,
           token: $data.token
         })
         SET v = $data`,
				data
			);
			return data;
		},

		async useVerificationToken(data) {
			console.log('use verification token ');
			const result = await write(
				`MATCH (v:VerificationToken {
           identifier: $data.identifier,
           token: $data.token
         })
         WITH v, properties(v) as properties
         DETACH DELETE v
         RETURN properties`,
				data
			);
			return format.from<any>(result?.properties);
		},
	};
}

// https://github.com/honeinc/is-iso-date/blob/master/index.js
const isoDateRE =
	/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

function isDate(value: any) {
	return value && isoDateRE.test(value) && !isNaN(Date.parse(value));
}

export const format = {
	/** Takes a plain old JavaScript object and turns it into a Neo4j compatible object */
	to(object: Record<string, any>) {
		const newObject: Record<string, unknown> = {};
		for (const key in object) {
			const value = object[key];
			if (value instanceof Date) newObject[key] = value.toISOString();
			else newObject[key] = value;
		}
		return newObject;
	},
	/** Takes a Neo4j object and returns a plain old JavaScript object */
	from<T = Record<string, unknown>>(object?: Record<string, any>): T | null {
		const newObject: Record<string, unknown> = {};
		if (!object) return null;
		for (const key in object) {
			const value = object[key];
			if (isDate(value)) {
				newObject[key] = new Date(value);
			} else if (isInt(value)) {
				if (integer.inSafeRange(value))
					newObject[key] = value.toNumber();
				else newObject[key] = value.toString();
			} else {
				newObject[key] = value;
			}
		}

		return newObject as T;
	},
};

function client(session: Session) {
	return {
		/** Reads values from the database */
		async read<T>(statement: string, values?: any): Promise<T | null> {
			const result = await session.readTransaction((tx) =>
				tx.run(statement, values)
			);

			return format.from<T>(result?.records[0]?.get(0)) ?? null;
		},

		/**
		 * Reads/writes values from/to the database.
		 * Properties are available under `$data`
		 */
		async write<T extends Record<string, any>>(
			statement: string,
			values: T
		): Promise<any> {
			const result = await session.writeTransaction((tx) =>
				tx.run(statement, { data: format.to(values) })
			);

			return format.from<T>(result?.records[0]?.toObject());
		},
	};
}
