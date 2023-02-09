const { gql, ApolloServer } = require('apollo-server');
const { Neo4jGraphQL } = require('@neo4j/graphql');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const typeDefs = gql`
	union CustomElementChildren = CustomText | Block

	type CustomText {
		text: String
		bold: Boolean
		italics: Boolean
		text_type: String
	}

	type Block {
		format: String
		type: String
		children: [CustomElementChildren!]!
			@relationship(type: "NESTED_IN", direction: IN)
		id: ID! @id
	}

	type ConnectionData {
		id: ID! @id
		title: String
		content: [Block!]!
		nodes: [String!]!
		connection_type: String
	}

	type DocumentView {
		id: ID! @id
		node: String
		elements: [String!]!
	}

	type GraphView {
		node: String
		title: String
		elements: [GraphViewElement!]!
			@relationship(type: "DISPLAYS", direction: OUT)
	}

	type GraphViewElement {
		id: ID! @id
		graphNode: GraphNode
	}

	type GraphNode {
		index: Int
		x: Float
		y: Float
		size: [Float!]!
		type: String
	}

	union ViewType = DocumentView | GraphView

	type NodeData {
		title: String
		id: ID! @id
		blocks: [BlockElement!]!
			@relationship(type: "CONTAINS_BLOCK", direction: OUT)
		connections: [ConnectionElement!]!
			@relationship(type: "HAS_CONNECTION", direction: OUT)
		document: DocumentView @relationship(type: "MAIN_DOC", direction: OUT)
		navigation: [ViewType!]! @relationship(type: "HAS_VIEW", direction: OUT)
	}

	type BlockElement {
		id: ID! @id
		block: Block @relationship(type: "HAS_METADATA", direction: OUT)
	}

	type ConnectionElement {
		id: ID! @id
		connection: ConnectionData
			@relationship(type: "HAS_DATA", direction: OUT)
	}

	type User {
		id: ID! @id
		name: String
		email: String
		home_node: NodeData @relationship(type: "HOME_VIEW", direction: OUT)
		homeless_node: NodeData
			@relationship(type: "HOMELESS_VIEW", direction: OUT)
	}
`;

const typeDefs2 = gql`
	type User {
		id: ID! @id
		name: String!
		email: String!
		username: String!
		home_node: Node!
		homeless_node: Node!
	}

	type Node {
		id: ID! @id
		blocks: [Block!]!
		title: String
	}

	type Block {
		id: ID! @id
		type: String
		children: [BlockChildren!]!
	}

	type CustomText {
		text: string
		bold: Boolean
		italics: Boolean
		underline: Boolean
	}

	union BlockChildren = CustomText | Block
`;

const driver = neo4j.driver(
	process.env.NEO4J_URI,
	neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
	const server = new ApolloServer({
		schema: schema,
	});

	server.listen().then(({ url }) => {
		console.log(`GraphQL server ready on ${url}`);
	});
});
