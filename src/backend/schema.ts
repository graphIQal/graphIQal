export const ConnectionTypes = {
	HAS: 'HAS',
	IS: 'IS',
	NEEDS: 'NEEDS',
	FOLLOWS: 'FOLLOWS',
	RELATED: 'RELATED',
	CUSTOM: 'CUSTOM',
};

export const DirectionalConnectionTypes = {
	PARENTS: 'PARENTS',
	CHILDREN: 'CHILDREN',
	IS: 'IS',
	ENCOMPASSES: 'ENCOMPASSES',
	NEEDED: 'NEEDED',
	NEEDS: 'NEEDS',
	FOLLOWED: 'FOLLOWED',
	FOLLOWS: 'FOLLOWS',
	RELATED: 'RELATED',
	CUSTOM: 'CUSTOM',
};

export type ConnectionTypes =
	| 'HAS'
	| 'IS'
	| 'NEEDS'
	| 'FOLLOWS'
	| 'RELATED'
	| 'CUSTOM';

export type DirectionalConnectionTypes =
	| 'PARENTS'
	| 'CHILDREN'
	| 'IS'
	| 'ENCOMPASSES'
	| 'NEEDED'
	| 'NEEDS'
	| 'FOLLOWED'
	| 'FOLLOWS'
	| 'RELATED'
	| 'CUSTOM';

export const getConnectionDirection = (type: DirectionalConnectionTypes) => {
	if (
		type === 'PARENTS' ||
		type === 'ENCOMPASSES' ||
		type === 'NEEDED' ||
		type === 'FOLLOWED'
	) {
		return 'from';
	} else if (
		// Has ->
		type === 'CHILDREN' ||
		// Is ->
		type === 'IS' ||
		//  Needs ->
		type === 'NEEDS' ||
		//  Follows ->
		type === 'FOLLOWS'
	) {
		return 'to';
	} else {
		return 'undirectional';
	}
};

export const convertToConnectionType = (
	type: DirectionalConnectionTypes
): ConnectionTypes => {
	const map: { [key in DirectionalConnectionTypes]: ConnectionTypes } = {
		PARENTS: 'HAS',
		CHILDREN: 'HAS',
		IS: 'IS',
		ENCOMPASSES: 'IS',
		NEEDED: 'NEEDS',
		NEEDS: 'NEEDS',
		FOLLOWED: 'FOLLOWS',
		FOLLOWS: 'FOLLOWS',
		RELATED: 'RELATED',
		CUSTOM: 'CUSTOM',
	};

	return map[type];
};

export const isTransitive = (type: ConnectionTypes): boolean => {
	return ['IS', 'HAS', 'NEEDS', 'FOLLOWS'].includes(type);
};

export type NodeDataType = {
	id: string;
	title: string;
	icon: string;
	color?: string;
	document?: string;
	inbox?: string;
	[key: string]: any;
};
