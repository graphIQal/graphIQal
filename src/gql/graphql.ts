/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Block = {
  __typename?: 'Block';
  children: Array<CustomElementChildren>;
  childrenConnection: BlockChildrenConnection;
  format?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
};


export type BlockChildrenArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<CustomElementChildrenWhere>;
};


export type BlockChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BlockChildrenConnectionWhere>;
};

export type BlockAggregateSelection = {
  __typename?: 'BlockAggregateSelection';
  count: Scalars['Int'];
  format: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  type: StringAggregateSelectionNullable;
};

export type BlockChildrenBlockConnectFieldInput = {
  connect?: InputMaybe<Array<BlockConnectInput>>;
  where?: InputMaybe<BlockConnectWhere>;
};

export type BlockChildrenBlockConnectOrCreateFieldInput = {
  onCreate: BlockChildrenBlockConnectOrCreateFieldInputOnCreate;
  where: BlockConnectOrCreateWhere;
};

export type BlockChildrenBlockConnectOrCreateFieldInputOnCreate = {
  node: BlockOnCreateInput;
};

export type BlockChildrenBlockConnectionWhere = {
  AND?: InputMaybe<Array<BlockChildrenBlockConnectionWhere>>;
  OR?: InputMaybe<Array<BlockChildrenBlockConnectionWhere>>;
  node?: InputMaybe<BlockWhere>;
  node_NOT?: InputMaybe<BlockWhere>;
};

export type BlockChildrenBlockCreateFieldInput = {
  node: BlockCreateInput;
};

export type BlockChildrenBlockDeleteFieldInput = {
  delete?: InputMaybe<BlockDeleteInput>;
  where?: InputMaybe<BlockChildrenBlockConnectionWhere>;
};

export type BlockChildrenBlockDisconnectFieldInput = {
  disconnect?: InputMaybe<BlockDisconnectInput>;
  where?: InputMaybe<BlockChildrenBlockConnectionWhere>;
};

export type BlockChildrenBlockFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenBlockConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<BlockChildrenBlockConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenBlockCreateFieldInput>>;
};

export type BlockChildrenBlockUpdateConnectionInput = {
  node?: InputMaybe<BlockUpdateInput>;
};

export type BlockChildrenBlockUpdateFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenBlockConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<BlockChildrenBlockConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenBlockCreateFieldInput>>;
  delete?: InputMaybe<Array<BlockChildrenBlockDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<BlockChildrenBlockDisconnectFieldInput>>;
  update?: InputMaybe<BlockChildrenBlockUpdateConnectionInput>;
  where?: InputMaybe<BlockChildrenBlockConnectionWhere>;
};

export type BlockChildrenConnectInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockConnectFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextConnectFieldInput>>;
};

export type BlockChildrenConnectOrCreateInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockConnectOrCreateFieldInput>>;
};

export type BlockChildrenConnection = {
  __typename?: 'BlockChildrenConnection';
  edges: Array<BlockChildrenRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockChildrenConnectionWhere = {
  Block?: InputMaybe<BlockChildrenBlockConnectionWhere>;
  CustomText?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenCreateFieldInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockCreateFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextCreateFieldInput>>;
};

export type BlockChildrenCreateInput = {
  Block?: InputMaybe<BlockChildrenBlockFieldInput>;
  CustomText?: InputMaybe<BlockChildrenCustomTextFieldInput>;
};

export type BlockChildrenCustomTextConnectFieldInput = {
  where?: InputMaybe<CustomTextConnectWhere>;
};

export type BlockChildrenCustomTextConnectionWhere = {
  AND?: InputMaybe<Array<BlockChildrenCustomTextConnectionWhere>>;
  OR?: InputMaybe<Array<BlockChildrenCustomTextConnectionWhere>>;
  node?: InputMaybe<CustomTextWhere>;
  node_NOT?: InputMaybe<CustomTextWhere>;
};

export type BlockChildrenCustomTextCreateFieldInput = {
  node: CustomTextCreateInput;
};

export type BlockChildrenCustomTextDeleteFieldInput = {
  where?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenCustomTextDisconnectFieldInput = {
  where?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenCustomTextFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenCustomTextConnectFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenCustomTextCreateFieldInput>>;
};

export type BlockChildrenCustomTextUpdateConnectionInput = {
  node?: InputMaybe<CustomTextUpdateInput>;
};

export type BlockChildrenCustomTextUpdateFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenCustomTextConnectFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenCustomTextCreateFieldInput>>;
  delete?: InputMaybe<Array<BlockChildrenCustomTextDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<BlockChildrenCustomTextDisconnectFieldInput>>;
  update?: InputMaybe<BlockChildrenCustomTextUpdateConnectionInput>;
  where?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenDeleteInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockDeleteFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextDeleteFieldInput>>;
};

export type BlockChildrenDisconnectInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockDisconnectFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextDisconnectFieldInput>>;
};

export type BlockChildrenRelationship = {
  __typename?: 'BlockChildrenRelationship';
  cursor: Scalars['String'];
  node: CustomElementChildren;
};

export type BlockChildrenUpdateInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockUpdateFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextUpdateFieldInput>>;
};

export type BlockConnectInput = {
  children?: InputMaybe<BlockChildrenConnectInput>;
};

export type BlockConnectOrCreateInput = {
  children?: InputMaybe<BlockChildrenConnectOrCreateInput>;
};

export type BlockConnectOrCreateWhere = {
  node: BlockUniqueWhere;
};

export type BlockConnectWhere = {
  node: BlockWhere;
};

export type BlockCreateInput = {
  children?: InputMaybe<BlockChildrenCreateInput>;
  format?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type BlockDeleteInput = {
  children?: InputMaybe<BlockChildrenDeleteInput>;
};

export type BlockDisconnectInput = {
  children?: InputMaybe<BlockChildrenDisconnectInput>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String'];
  node: Block;
};

export type BlockElement = {
  __typename?: 'BlockElement';
  block?: Maybe<Block>;
  blockAggregate?: Maybe<BlockElementBlockBlockAggregationSelection>;
  blockConnection: BlockElementBlockConnection;
  id: Scalars['ID'];
};


export type BlockElementBlockArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<BlockOptions>;
  where?: InputMaybe<BlockWhere>;
};


export type BlockElementBlockAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<BlockWhere>;
};


export type BlockElementBlockConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockElementBlockConnectionSort>>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementAggregateSelection = {
  __typename?: 'BlockElementAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type BlockElementBlockAggregateInput = {
  AND?: InputMaybe<Array<BlockElementBlockAggregateInput>>;
  OR?: InputMaybe<Array<BlockElementBlockAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<BlockElementBlockNodeAggregationWhereInput>;
};

export type BlockElementBlockBlockAggregationSelection = {
  __typename?: 'BlockElementBlockBlockAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<BlockElementBlockBlockNodeAggregateSelection>;
};

export type BlockElementBlockBlockNodeAggregateSelection = {
  __typename?: 'BlockElementBlockBlockNodeAggregateSelection';
  format: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  type: StringAggregateSelectionNullable;
};

export type BlockElementBlockConnectFieldInput = {
  connect?: InputMaybe<BlockConnectInput>;
  where?: InputMaybe<BlockConnectWhere>;
};

export type BlockElementBlockConnectOrCreateFieldInput = {
  onCreate: BlockElementBlockConnectOrCreateFieldInputOnCreate;
  where: BlockConnectOrCreateWhere;
};

export type BlockElementBlockConnectOrCreateFieldInputOnCreate = {
  node: BlockOnCreateInput;
};

export type BlockElementBlockConnection = {
  __typename?: 'BlockElementBlockConnection';
  edges: Array<BlockElementBlockRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockElementBlockConnectionSort = {
  node?: InputMaybe<BlockSort>;
};

export type BlockElementBlockConnectionWhere = {
  AND?: InputMaybe<Array<BlockElementBlockConnectionWhere>>;
  OR?: InputMaybe<Array<BlockElementBlockConnectionWhere>>;
  node?: InputMaybe<BlockWhere>;
  node_NOT?: InputMaybe<BlockWhere>;
};

export type BlockElementBlockCreateFieldInput = {
  node: BlockCreateInput;
};

export type BlockElementBlockDeleteFieldInput = {
  delete?: InputMaybe<BlockDeleteInput>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementBlockDisconnectFieldInput = {
  disconnect?: InputMaybe<BlockDisconnectInput>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementBlockFieldInput = {
  connect?: InputMaybe<BlockElementBlockConnectFieldInput>;
  connectOrCreate?: InputMaybe<BlockElementBlockConnectOrCreateFieldInput>;
  create?: InputMaybe<BlockElementBlockCreateFieldInput>;
};

export type BlockElementBlockNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BlockElementBlockNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BlockElementBlockNodeAggregationWhereInput>>;
  format_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  format_EQUAL?: InputMaybe<Scalars['String']>;
  format_GT?: InputMaybe<Scalars['Int']>;
  format_GTE?: InputMaybe<Scalars['Int']>;
  format_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  format_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  format_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  format_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  format_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  format_LT?: InputMaybe<Scalars['Int']>;
  format_LTE?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type BlockElementBlockRelationship = {
  __typename?: 'BlockElementBlockRelationship';
  cursor: Scalars['String'];
  node: Block;
};

export type BlockElementBlockUpdateConnectionInput = {
  node?: InputMaybe<BlockUpdateInput>;
};

export type BlockElementBlockUpdateFieldInput = {
  connect?: InputMaybe<BlockElementBlockConnectFieldInput>;
  connectOrCreate?: InputMaybe<BlockElementBlockConnectOrCreateFieldInput>;
  create?: InputMaybe<BlockElementBlockCreateFieldInput>;
  delete?: InputMaybe<BlockElementBlockDeleteFieldInput>;
  disconnect?: InputMaybe<BlockElementBlockDisconnectFieldInput>;
  update?: InputMaybe<BlockElementBlockUpdateConnectionInput>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementConnectInput = {
  block?: InputMaybe<BlockElementBlockConnectFieldInput>;
};

export type BlockElementConnectOrCreateInput = {
  block?: InputMaybe<BlockElementBlockConnectOrCreateFieldInput>;
};

export type BlockElementConnectOrCreateWhere = {
  node: BlockElementUniqueWhere;
};

export type BlockElementConnectWhere = {
  node: BlockElementWhere;
};

export type BlockElementCreateInput = {
  block?: InputMaybe<BlockElementBlockFieldInput>;
};

export type BlockElementDeleteInput = {
  block?: InputMaybe<BlockElementBlockDeleteFieldInput>;
};

export type BlockElementDisconnectInput = {
  block?: InputMaybe<BlockElementBlockDisconnectFieldInput>;
};

export type BlockElementEdge = {
  __typename?: 'BlockElementEdge';
  cursor: Scalars['String'];
  node: BlockElement;
};

export type BlockElementOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type BlockElementOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more BlockElementSort objects to sort BlockElements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BlockElementSort>>;
};

export type BlockElementRelationInput = {
  block?: InputMaybe<BlockElementBlockCreateFieldInput>;
};

/** Fields to sort BlockElements by. The order in which sorts are applied is not guaranteed when specifying many fields in one BlockElementSort object. */
export type BlockElementSort = {
  id?: InputMaybe<SortDirection>;
};

export type BlockElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BlockElementUpdateInput = {
  block?: InputMaybe<BlockElementBlockUpdateFieldInput>;
};

export type BlockElementWhere = {
  AND?: InputMaybe<Array<BlockElementWhere>>;
  OR?: InputMaybe<Array<BlockElementWhere>>;
  block?: InputMaybe<BlockWhere>;
  blockAggregate?: InputMaybe<BlockElementBlockAggregateInput>;
  blockConnection?: InputMaybe<BlockElementBlockConnectionWhere>;
  blockConnection_NOT?: InputMaybe<BlockElementBlockConnectionWhere>;
  block_NOT?: InputMaybe<BlockWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type BlockElementsConnection = {
  __typename?: 'BlockElementsConnection';
  edges: Array<BlockElementEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockOnCreateInput = {
  format?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type BlockOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more BlockSort objects to sort Blocks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BlockSort>>;
};

export type BlockRelationInput = {
  children?: InputMaybe<BlockChildrenCreateFieldInput>;
};

/** Fields to sort Blocks by. The order in which sorts are applied is not guaranteed when specifying many fields in one BlockSort object. */
export type BlockSort = {
  format?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type BlockUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BlockUpdateInput = {
  children?: InputMaybe<BlockChildrenUpdateInput>;
  format?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type BlockWhere = {
  AND?: InputMaybe<Array<BlockWhere>>;
  OR?: InputMaybe<Array<BlockWhere>>;
  childrenConnection_ALL?: InputMaybe<BlockChildrenConnectionWhere>;
  childrenConnection_NONE?: InputMaybe<BlockChildrenConnectionWhere>;
  childrenConnection_SINGLE?: InputMaybe<BlockChildrenConnectionWhere>;
  childrenConnection_SOME?: InputMaybe<BlockChildrenConnectionWhere>;
  format?: InputMaybe<Scalars['String']>;
  format_CONTAINS?: InputMaybe<Scalars['String']>;
  format_ENDS_WITH?: InputMaybe<Scalars['String']>;
  format_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  format_NOT?: InputMaybe<Scalars['String']>;
  format_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  format_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  format_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  format_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  format_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ConnectionData = {
  __typename?: 'ConnectionData';
  connection_type?: Maybe<Scalars['String']>;
  content: Array<Block>;
  id: Scalars['ID'];
  nodes: Array<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ConnectionDataAggregateSelection = {
  __typename?: 'ConnectionDataAggregateSelection';
  connection_type: StringAggregateSelectionNullable;
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type ConnectionDataConnectOrCreateWhere = {
  node: ConnectionDataUniqueWhere;
};

export type ConnectionDataConnectWhere = {
  node: ConnectionDataWhere;
};

export type ConnectionDataConnection = {
  __typename?: 'ConnectionDataConnection';
  edges: Array<ConnectionDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ConnectionDataCreateInput = {
  connection_type?: InputMaybe<Scalars['String']>;
  nodes: Array<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConnectionDataEdge = {
  __typename?: 'ConnectionDataEdge';
  cursor: Scalars['String'];
  node: ConnectionData;
};

export type ConnectionDataOnCreateInput = {
  connection_type?: InputMaybe<Scalars['String']>;
  nodes: Array<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConnectionDataOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more ConnectionDataSort objects to sort ConnectionData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ConnectionDataSort>>;
};

/** Fields to sort ConnectionData by. The order in which sorts are applied is not guaranteed when specifying many fields in one ConnectionDataSort object. */
export type ConnectionDataSort = {
  connection_type?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type ConnectionDataUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ConnectionDataUpdateInput = {
  connection_type?: InputMaybe<Scalars['String']>;
  nodes?: InputMaybe<Array<Scalars['String']>>;
  nodes_POP?: InputMaybe<Scalars['Int']>;
  nodes_PUSH?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConnectionDataWhere = {
  AND?: InputMaybe<Array<ConnectionDataWhere>>;
  OR?: InputMaybe<Array<ConnectionDataWhere>>;
  connection_type?: InputMaybe<Scalars['String']>;
  connection_type_CONTAINS?: InputMaybe<Scalars['String']>;
  connection_type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  connection_type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  connection_type_NOT?: InputMaybe<Scalars['String']>;
  connection_type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  connection_type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  connection_type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  connection_type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  connection_type_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  nodes?: InputMaybe<Array<Scalars['String']>>;
  nodes_INCLUDES?: InputMaybe<Scalars['String']>;
  nodes_NOT?: InputMaybe<Array<Scalars['String']>>;
  nodes_NOT_INCLUDES?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_CONTAINS?: InputMaybe<Scalars['String']>;
  title_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT?: InputMaybe<Scalars['String']>;
  title_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  title_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type ConnectionElement = {
  __typename?: 'ConnectionElement';
  connection?: Maybe<ConnectionData>;
  connectionAggregate?: Maybe<ConnectionElementConnectionDataConnectionAggregationSelection>;
  connectionConnection: ConnectionElementConnectionConnection;
  id: Scalars['ID'];
};


export type ConnectionElementConnectionArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ConnectionDataOptions>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type ConnectionElementConnectionAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type ConnectionElementConnectionConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ConnectionElementConnectionConnectionSort>>;
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementAggregateSelection = {
  __typename?: 'ConnectionElementAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type ConnectionElementConnectInput = {
  connection?: InputMaybe<ConnectionElementConnectionConnectFieldInput>;
};

export type ConnectionElementConnectOrCreateInput = {
  connection?: InputMaybe<ConnectionElementConnectionConnectOrCreateFieldInput>;
};

export type ConnectionElementConnectOrCreateWhere = {
  node: ConnectionElementUniqueWhere;
};

export type ConnectionElementConnectWhere = {
  node: ConnectionElementWhere;
};

export type ConnectionElementConnectionAggregateInput = {
  AND?: InputMaybe<Array<ConnectionElementConnectionAggregateInput>>;
  OR?: InputMaybe<Array<ConnectionElementConnectionAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<ConnectionElementConnectionNodeAggregationWhereInput>;
};

export type ConnectionElementConnectionConnectFieldInput = {
  where?: InputMaybe<ConnectionDataConnectWhere>;
};

export type ConnectionElementConnectionConnectOrCreateFieldInput = {
  onCreate: ConnectionElementConnectionConnectOrCreateFieldInputOnCreate;
  where: ConnectionDataConnectOrCreateWhere;
};

export type ConnectionElementConnectionConnectOrCreateFieldInputOnCreate = {
  node: ConnectionDataOnCreateInput;
};

export type ConnectionElementConnectionConnection = {
  __typename?: 'ConnectionElementConnectionConnection';
  edges: Array<ConnectionElementConnectionRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ConnectionElementConnectionConnectionSort = {
  node?: InputMaybe<ConnectionDataSort>;
};

export type ConnectionElementConnectionConnectionWhere = {
  AND?: InputMaybe<Array<ConnectionElementConnectionConnectionWhere>>;
  OR?: InputMaybe<Array<ConnectionElementConnectionConnectionWhere>>;
  node?: InputMaybe<ConnectionDataWhere>;
  node_NOT?: InputMaybe<ConnectionDataWhere>;
};

export type ConnectionElementConnectionCreateFieldInput = {
  node: ConnectionDataCreateInput;
};

export type ConnectionElementConnectionDataConnectionAggregationSelection = {
  __typename?: 'ConnectionElementConnectionDataConnectionAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<ConnectionElementConnectionDataConnectionNodeAggregateSelection>;
};

export type ConnectionElementConnectionDataConnectionNodeAggregateSelection = {
  __typename?: 'ConnectionElementConnectionDataConnectionNodeAggregateSelection';
  connection_type: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type ConnectionElementConnectionDeleteFieldInput = {
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementConnectionDisconnectFieldInput = {
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementConnectionFieldInput = {
  connect?: InputMaybe<ConnectionElementConnectionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ConnectionElementConnectionConnectOrCreateFieldInput>;
  create?: InputMaybe<ConnectionElementConnectionCreateFieldInput>;
};

export type ConnectionElementConnectionNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ConnectionElementConnectionNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ConnectionElementConnectionNodeAggregationWhereInput>>;
  connection_type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  connection_type_EQUAL?: InputMaybe<Scalars['String']>;
  connection_type_GT?: InputMaybe<Scalars['Int']>;
  connection_type_GTE?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  connection_type_LT?: InputMaybe<Scalars['Int']>;
  connection_type_LTE?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  title_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  title_EQUAL?: InputMaybe<Scalars['String']>;
  title_GT?: InputMaybe<Scalars['Int']>;
  title_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  title_LT?: InputMaybe<Scalars['Int']>;
  title_LTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type ConnectionElementConnectionRelationship = {
  __typename?: 'ConnectionElementConnectionRelationship';
  cursor: Scalars['String'];
  node: ConnectionData;
};

export type ConnectionElementConnectionUpdateConnectionInput = {
  node?: InputMaybe<ConnectionDataUpdateInput>;
};

export type ConnectionElementConnectionUpdateFieldInput = {
  connect?: InputMaybe<ConnectionElementConnectionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ConnectionElementConnectionConnectOrCreateFieldInput>;
  create?: InputMaybe<ConnectionElementConnectionCreateFieldInput>;
  delete?: InputMaybe<ConnectionElementConnectionDeleteFieldInput>;
  disconnect?: InputMaybe<ConnectionElementConnectionDisconnectFieldInput>;
  update?: InputMaybe<ConnectionElementConnectionUpdateConnectionInput>;
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementCreateInput = {
  connection?: InputMaybe<ConnectionElementConnectionFieldInput>;
};

export type ConnectionElementDeleteInput = {
  connection?: InputMaybe<ConnectionElementConnectionDeleteFieldInput>;
};

export type ConnectionElementDisconnectInput = {
  connection?: InputMaybe<ConnectionElementConnectionDisconnectFieldInput>;
};

export type ConnectionElementEdge = {
  __typename?: 'ConnectionElementEdge';
  cursor: Scalars['String'];
  node: ConnectionElement;
};

export type ConnectionElementOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type ConnectionElementOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more ConnectionElementSort objects to sort ConnectionElements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ConnectionElementSort>>;
};

export type ConnectionElementRelationInput = {
  connection?: InputMaybe<ConnectionElementConnectionCreateFieldInput>;
};

/** Fields to sort ConnectionElements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ConnectionElementSort object. */
export type ConnectionElementSort = {
  id?: InputMaybe<SortDirection>;
};

export type ConnectionElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ConnectionElementUpdateInput = {
  connection?: InputMaybe<ConnectionElementConnectionUpdateFieldInput>;
};

export type ConnectionElementWhere = {
  AND?: InputMaybe<Array<ConnectionElementWhere>>;
  OR?: InputMaybe<Array<ConnectionElementWhere>>;
  connection?: InputMaybe<ConnectionDataWhere>;
  connectionAggregate?: InputMaybe<ConnectionElementConnectionAggregateInput>;
  connectionConnection?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
  connectionConnection_NOT?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
  connection_NOT?: InputMaybe<ConnectionDataWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type ConnectionElementsConnection = {
  __typename?: 'ConnectionElementsConnection';
  edges: Array<ConnectionElementEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CreateBlockElementsMutationResponse = {
  __typename?: 'CreateBlockElementsMutationResponse';
  blockElements: Array<BlockElement>;
  info: CreateInfo;
};

export type CreateBlocksMutationResponse = {
  __typename?: 'CreateBlocksMutationResponse';
  blocks: Array<Block>;
  info: CreateInfo;
};

export type CreateConnectionDataMutationResponse = {
  __typename?: 'CreateConnectionDataMutationResponse';
  connectionData: Array<ConnectionData>;
  info: CreateInfo;
};

export type CreateConnectionElementsMutationResponse = {
  __typename?: 'CreateConnectionElementsMutationResponse';
  connectionElements: Array<ConnectionElement>;
  info: CreateInfo;
};

export type CreateCustomTextsMutationResponse = {
  __typename?: 'CreateCustomTextsMutationResponse';
  customTexts: Array<CustomText>;
  info: CreateInfo;
};

export type CreateDocumentViewsMutationResponse = {
  __typename?: 'CreateDocumentViewsMutationResponse';
  documentViews: Array<DocumentView>;
  info: CreateInfo;
};

export type CreateGraphNodesMutationResponse = {
  __typename?: 'CreateGraphNodesMutationResponse';
  graphNodes: Array<GraphNode>;
  info: CreateInfo;
};

export type CreateGraphViewElementsMutationResponse = {
  __typename?: 'CreateGraphViewElementsMutationResponse';
  graphViewElements: Array<GraphViewElement>;
  info: CreateInfo;
};

export type CreateGraphViewsMutationResponse = {
  __typename?: 'CreateGraphViewsMutationResponse';
  graphViews: Array<GraphView>;
  info: CreateInfo;
};

export type CreateInfo = {
  __typename?: 'CreateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
};

export type CreateNodeDataMutationResponse = {
  __typename?: 'CreateNodeDataMutationResponse';
  info: CreateInfo;
  nodeData: Array<NodeData>;
};

export type CreateUserMetadataMutationResponse = {
  __typename?: 'CreateUserMetadataMutationResponse';
  info: CreateInfo;
  userMetadata: Array<UserMetadata>;
};

export type CreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse';
  info: CreateInfo;
  users: Array<User>;
};

export type CustomElementChildren = Block | CustomText;

export type CustomElementChildrenWhere = {
  Block?: InputMaybe<BlockWhere>;
  CustomText?: InputMaybe<CustomTextWhere>;
};

export type CustomText = {
  __typename?: 'CustomText';
  bold?: Maybe<Scalars['Boolean']>;
  italics?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  text_type?: Maybe<Scalars['String']>;
};

export type CustomTextAggregateSelection = {
  __typename?: 'CustomTextAggregateSelection';
  count: Scalars['Int'];
  text: StringAggregateSelectionNullable;
  text_type: StringAggregateSelectionNullable;
};

export type CustomTextConnectWhere = {
  node: CustomTextWhere;
};

export type CustomTextCreateInput = {
  bold?: InputMaybe<Scalars['Boolean']>;
  italics?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
  text_type?: InputMaybe<Scalars['String']>;
};

export type CustomTextEdge = {
  __typename?: 'CustomTextEdge';
  cursor: Scalars['String'];
  node: CustomText;
};

export type CustomTextOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more CustomTextSort objects to sort CustomTexts by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CustomTextSort>>;
};

/** Fields to sort CustomTexts by. The order in which sorts are applied is not guaranteed when specifying many fields in one CustomTextSort object. */
export type CustomTextSort = {
  bold?: InputMaybe<SortDirection>;
  italics?: InputMaybe<SortDirection>;
  text?: InputMaybe<SortDirection>;
  text_type?: InputMaybe<SortDirection>;
};

export type CustomTextUpdateInput = {
  bold?: InputMaybe<Scalars['Boolean']>;
  italics?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
  text_type?: InputMaybe<Scalars['String']>;
};

export type CustomTextWhere = {
  AND?: InputMaybe<Array<CustomTextWhere>>;
  OR?: InputMaybe<Array<CustomTextWhere>>;
  bold?: InputMaybe<Scalars['Boolean']>;
  bold_NOT?: InputMaybe<Scalars['Boolean']>;
  italics?: InputMaybe<Scalars['Boolean']>;
  italics_NOT?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
  text_CONTAINS?: InputMaybe<Scalars['String']>;
  text_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_NOT?: InputMaybe<Scalars['String']>;
  text_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  text_STARTS_WITH?: InputMaybe<Scalars['String']>;
  text_type?: InputMaybe<Scalars['String']>;
  text_type_CONTAINS?: InputMaybe<Scalars['String']>;
  text_type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_type_NOT?: InputMaybe<Scalars['String']>;
  text_type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  text_type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  text_type_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type CustomTextsConnection = {
  __typename?: 'CustomTextsConnection';
  edges: Array<CustomTextEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesDeleted: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type DocumentView = {
  __typename?: 'DocumentView';
  elements: Array<Scalars['String']>;
  id: Scalars['ID'];
  node?: Maybe<Scalars['String']>;
};

export type DocumentViewAggregateSelection = {
  __typename?: 'DocumentViewAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
  node: StringAggregateSelectionNullable;
};

export type DocumentViewConnectOrCreateWhere = {
  node: DocumentViewUniqueWhere;
};

export type DocumentViewConnectWhere = {
  node: DocumentViewWhere;
};

export type DocumentViewCreateInput = {
  elements: Array<Scalars['String']>;
  node?: InputMaybe<Scalars['String']>;
};

export type DocumentViewEdge = {
  __typename?: 'DocumentViewEdge';
  cursor: Scalars['String'];
  node: DocumentView;
};

export type DocumentViewOnCreateInput = {
  elements: Array<Scalars['String']>;
  node?: InputMaybe<Scalars['String']>;
};

export type DocumentViewOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more DocumentViewSort objects to sort DocumentViews by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DocumentViewSort>>;
};

/** Fields to sort DocumentViews by. The order in which sorts are applied is not guaranteed when specifying many fields in one DocumentViewSort object. */
export type DocumentViewSort = {
  id?: InputMaybe<SortDirection>;
  node?: InputMaybe<SortDirection>;
};

export type DocumentViewUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type DocumentViewUpdateInput = {
  elements?: InputMaybe<Array<Scalars['String']>>;
  elements_POP?: InputMaybe<Scalars['Int']>;
  elements_PUSH?: InputMaybe<Array<Scalars['String']>>;
  node?: InputMaybe<Scalars['String']>;
};

export type DocumentViewWhere = {
  AND?: InputMaybe<Array<DocumentViewWhere>>;
  OR?: InputMaybe<Array<DocumentViewWhere>>;
  elements?: InputMaybe<Array<Scalars['String']>>;
  elements_INCLUDES?: InputMaybe<Scalars['String']>;
  elements_NOT?: InputMaybe<Array<Scalars['String']>>;
  elements_NOT_INCLUDES?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  node?: InputMaybe<Scalars['String']>;
  node_CONTAINS?: InputMaybe<Scalars['String']>;
  node_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT?: InputMaybe<Scalars['String']>;
  node_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  node_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  node_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type DocumentViewsConnection = {
  __typename?: 'DocumentViewsConnection';
  edges: Array<DocumentViewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type FloatAggregateSelectionNullable = {
  __typename?: 'FloatAggregateSelectionNullable';
  average?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

export type GraphNode = {
  __typename?: 'GraphNode';
  index?: Maybe<Scalars['Int']>;
  size: Array<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type GraphNodeAggregateSelection = {
  __typename?: 'GraphNodeAggregateSelection';
  count: Scalars['Int'];
  index: IntAggregateSelectionNullable;
  type: StringAggregateSelectionNullable;
  x: FloatAggregateSelectionNullable;
  y: FloatAggregateSelectionNullable;
};

export type GraphNodeCreateInput = {
  index?: InputMaybe<Scalars['Int']>;
  size: Array<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
};

export type GraphNodeEdge = {
  __typename?: 'GraphNodeEdge';
  cursor: Scalars['String'];
  node: GraphNode;
};

export type GraphNodeOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GraphNodeSort objects to sort GraphNodes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GraphNodeSort>>;
};

/** Fields to sort GraphNodes by. The order in which sorts are applied is not guaranteed when specifying many fields in one GraphNodeSort object. */
export type GraphNodeSort = {
  index?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
  x?: InputMaybe<SortDirection>;
  y?: InputMaybe<SortDirection>;
};

export type GraphNodeUpdateInput = {
  index?: InputMaybe<Scalars['Int']>;
  index_DECREMENT?: InputMaybe<Scalars['Int']>;
  index_INCREMENT?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Array<Scalars['Float']>>;
  size_POP?: InputMaybe<Scalars['Int']>;
  size_PUSH?: InputMaybe<Array<Scalars['Float']>>;
  type?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['Float']>;
  x_ADD?: InputMaybe<Scalars['Float']>;
  x_DIVIDE?: InputMaybe<Scalars['Float']>;
  x_MULTIPLY?: InputMaybe<Scalars['Float']>;
  x_SUBTRACT?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
  y_ADD?: InputMaybe<Scalars['Float']>;
  y_DIVIDE?: InputMaybe<Scalars['Float']>;
  y_MULTIPLY?: InputMaybe<Scalars['Float']>;
  y_SUBTRACT?: InputMaybe<Scalars['Float']>;
};

export type GraphNodeWhere = {
  AND?: InputMaybe<Array<GraphNodeWhere>>;
  OR?: InputMaybe<Array<GraphNodeWhere>>;
  index?: InputMaybe<Scalars['Int']>;
  index_GT?: InputMaybe<Scalars['Int']>;
  index_GTE?: InputMaybe<Scalars['Int']>;
  index_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  index_LT?: InputMaybe<Scalars['Int']>;
  index_LTE?: InputMaybe<Scalars['Int']>;
  index_NOT?: InputMaybe<Scalars['Int']>;
  index_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Array<Scalars['Float']>>;
  size_INCLUDES?: InputMaybe<Scalars['Float']>;
  size_NOT?: InputMaybe<Array<Scalars['Float']>>;
  size_NOT_INCLUDES?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['Float']>;
  x_GT?: InputMaybe<Scalars['Float']>;
  x_GTE?: InputMaybe<Scalars['Float']>;
  x_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  x_LT?: InputMaybe<Scalars['Float']>;
  x_LTE?: InputMaybe<Scalars['Float']>;
  x_NOT?: InputMaybe<Scalars['Float']>;
  x_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  y?: InputMaybe<Scalars['Float']>;
  y_GT?: InputMaybe<Scalars['Float']>;
  y_GTE?: InputMaybe<Scalars['Float']>;
  y_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  y_LT?: InputMaybe<Scalars['Float']>;
  y_LTE?: InputMaybe<Scalars['Float']>;
  y_NOT?: InputMaybe<Scalars['Float']>;
  y_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type GraphNodesConnection = {
  __typename?: 'GraphNodesConnection';
  edges: Array<GraphNodeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GraphView = {
  __typename?: 'GraphView';
  elements: Array<GraphViewElement>;
  elementsAggregate?: Maybe<GraphViewGraphViewElementElementsAggregationSelection>;
  elementsConnection: GraphViewElementsConnection;
  node?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type GraphViewElementsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GraphViewElementOptions>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type GraphViewElementsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type GraphViewElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GraphViewElementsConnectionSort>>;
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewAggregateSelection = {
  __typename?: 'GraphViewAggregateSelection';
  count: Scalars['Int'];
  node: StringAggregateSelectionNullable;
  title: StringAggregateSelectionNullable;
};

export type GraphViewConnectInput = {
  elements?: InputMaybe<Array<GraphViewElementsConnectFieldInput>>;
};

export type GraphViewConnectOrCreateInput = {
  elements?: InputMaybe<Array<GraphViewElementsConnectOrCreateFieldInput>>;
};

export type GraphViewConnectWhere = {
  node: GraphViewWhere;
};

export type GraphViewCreateInput = {
  elements?: InputMaybe<GraphViewElementsFieldInput>;
  node?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type GraphViewDeleteInput = {
  elements?: InputMaybe<Array<GraphViewElementsDeleteFieldInput>>;
};

export type GraphViewDisconnectInput = {
  elements?: InputMaybe<Array<GraphViewElementsDisconnectFieldInput>>;
};

export type GraphViewEdge = {
  __typename?: 'GraphViewEdge';
  cursor: Scalars['String'];
  node: GraphView;
};

export type GraphViewElement = {
  __typename?: 'GraphViewElement';
  graphNode?: Maybe<GraphNode>;
  id: Scalars['ID'];
};

export type GraphViewElementAggregateSelection = {
  __typename?: 'GraphViewElementAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type GraphViewElementConnectOrCreateWhere = {
  node: GraphViewElementUniqueWhere;
};

export type GraphViewElementConnectWhere = {
  node: GraphViewElementWhere;
};

export type GraphViewElementCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type GraphViewElementEdge = {
  __typename?: 'GraphViewElementEdge';
  cursor: Scalars['String'];
  node: GraphViewElement;
};

export type GraphViewElementOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type GraphViewElementOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GraphViewElementSort objects to sort GraphViewElements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GraphViewElementSort>>;
};

/** Fields to sort GraphViewElements by. The order in which sorts are applied is not guaranteed when specifying many fields in one GraphViewElementSort object. */
export type GraphViewElementSort = {
  id?: InputMaybe<SortDirection>;
};

export type GraphViewElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type GraphViewElementUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type GraphViewElementWhere = {
  AND?: InputMaybe<Array<GraphViewElementWhere>>;
  OR?: InputMaybe<Array<GraphViewElementWhere>>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type GraphViewElementsAggregateInput = {
  AND?: InputMaybe<Array<GraphViewElementsAggregateInput>>;
  OR?: InputMaybe<Array<GraphViewElementsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GraphViewElementsNodeAggregationWhereInput>;
};

export type GraphViewElementsConnectFieldInput = {
  where?: InputMaybe<GraphViewElementConnectWhere>;
};

export type GraphViewElementsConnectOrCreateFieldInput = {
  onCreate: GraphViewElementsConnectOrCreateFieldInputOnCreate;
  where: GraphViewElementConnectOrCreateWhere;
};

export type GraphViewElementsConnectOrCreateFieldInputOnCreate = {
  node: GraphViewElementOnCreateInput;
};

export type GraphViewElementsConnection = {
  __typename?: 'GraphViewElementsConnection';
  edges: Array<GraphViewElementsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GraphViewElementsConnectionSort = {
  node?: InputMaybe<GraphViewElementSort>;
};

export type GraphViewElementsConnectionWhere = {
  AND?: InputMaybe<Array<GraphViewElementsConnectionWhere>>;
  OR?: InputMaybe<Array<GraphViewElementsConnectionWhere>>;
  node?: InputMaybe<GraphViewElementWhere>;
  node_NOT?: InputMaybe<GraphViewElementWhere>;
};

export type GraphViewElementsCreateFieldInput = {
  node: GraphViewElementCreateInput;
};

export type GraphViewElementsDeleteFieldInput = {
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewElementsDisconnectFieldInput = {
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewElementsFieldInput = {
  connect?: InputMaybe<Array<GraphViewElementsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<GraphViewElementsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<GraphViewElementsCreateFieldInput>>;
};

export type GraphViewElementsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GraphViewElementsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GraphViewElementsNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
};

export type GraphViewElementsRelationship = {
  __typename?: 'GraphViewElementsRelationship';
  cursor: Scalars['String'];
  node: GraphViewElement;
};

export type GraphViewElementsUpdateConnectionInput = {
  node?: InputMaybe<GraphViewElementUpdateInput>;
};

export type GraphViewElementsUpdateFieldInput = {
  connect?: InputMaybe<Array<GraphViewElementsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<GraphViewElementsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<GraphViewElementsCreateFieldInput>>;
  delete?: InputMaybe<Array<GraphViewElementsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<GraphViewElementsDisconnectFieldInput>>;
  update?: InputMaybe<GraphViewElementsUpdateConnectionInput>;
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewGraphViewElementElementsAggregationSelection = {
  __typename?: 'GraphViewGraphViewElementElementsAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<GraphViewGraphViewElementElementsNodeAggregateSelection>;
};

export type GraphViewGraphViewElementElementsNodeAggregateSelection = {
  __typename?: 'GraphViewGraphViewElementElementsNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
};

export type GraphViewOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GraphViewSort objects to sort GraphViews by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GraphViewSort>>;
};

export type GraphViewRelationInput = {
  elements?: InputMaybe<Array<GraphViewElementsCreateFieldInput>>;
};

/** Fields to sort GraphViews by. The order in which sorts are applied is not guaranteed when specifying many fields in one GraphViewSort object. */
export type GraphViewSort = {
  node?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type GraphViewUpdateInput = {
  elements?: InputMaybe<Array<GraphViewElementsUpdateFieldInput>>;
  node?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type GraphViewWhere = {
  AND?: InputMaybe<Array<GraphViewWhere>>;
  OR?: InputMaybe<Array<GraphViewWhere>>;
  elementsAggregate?: InputMaybe<GraphViewElementsAggregateInput>;
  elementsConnection_ALL?: InputMaybe<GraphViewElementsConnectionWhere>;
  elementsConnection_NONE?: InputMaybe<GraphViewElementsConnectionWhere>;
  elementsConnection_SINGLE?: InputMaybe<GraphViewElementsConnectionWhere>;
  elementsConnection_SOME?: InputMaybe<GraphViewElementsConnectionWhere>;
  /** Return GraphViews where all of the related GraphViewElements match this filter */
  elements_ALL?: InputMaybe<GraphViewElementWhere>;
  /** Return GraphViews where none of the related GraphViewElements match this filter */
  elements_NONE?: InputMaybe<GraphViewElementWhere>;
  /** Return GraphViews where one of the related GraphViewElements match this filter */
  elements_SINGLE?: InputMaybe<GraphViewElementWhere>;
  /** Return GraphViews where some of the related GraphViewElements match this filter */
  elements_SOME?: InputMaybe<GraphViewElementWhere>;
  node?: InputMaybe<Scalars['String']>;
  node_CONTAINS?: InputMaybe<Scalars['String']>;
  node_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT?: InputMaybe<Scalars['String']>;
  node_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  node_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  node_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_CONTAINS?: InputMaybe<Scalars['String']>;
  title_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT?: InputMaybe<Scalars['String']>;
  title_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  title_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type GraphViewsConnection = {
  __typename?: 'GraphViewsConnection';
  edges: Array<GraphViewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type IdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable';
  longest: Scalars['ID'];
  shortest: Scalars['ID'];
};

export type IntAggregateSelectionNullable = {
  __typename?: 'IntAggregateSelectionNullable';
  average?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  sum?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlockElements: CreateBlockElementsMutationResponse;
  createBlocks: CreateBlocksMutationResponse;
  createConnectionData: CreateConnectionDataMutationResponse;
  createConnectionElements: CreateConnectionElementsMutationResponse;
  createCustomTexts: CreateCustomTextsMutationResponse;
  createDocumentViews: CreateDocumentViewsMutationResponse;
  createGraphNodes: CreateGraphNodesMutationResponse;
  createGraphViewElements: CreateGraphViewElementsMutationResponse;
  createGraphViews: CreateGraphViewsMutationResponse;
  createNodeData: CreateNodeDataMutationResponse;
  createUserMetadata: CreateUserMetadataMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteBlockElements: DeleteInfo;
  deleteBlocks: DeleteInfo;
  deleteConnectionData: DeleteInfo;
  deleteConnectionElements: DeleteInfo;
  deleteCustomTexts: DeleteInfo;
  deleteDocumentViews: DeleteInfo;
  deleteGraphNodes: DeleteInfo;
  deleteGraphViewElements: DeleteInfo;
  deleteGraphViews: DeleteInfo;
  deleteNodeData: DeleteInfo;
  deleteUserMetadata: DeleteInfo;
  deleteUsers: DeleteInfo;
  updateBlockElements: UpdateBlockElementsMutationResponse;
  updateBlocks: UpdateBlocksMutationResponse;
  updateConnectionData: UpdateConnectionDataMutationResponse;
  updateConnectionElements: UpdateConnectionElementsMutationResponse;
  updateCustomTexts: UpdateCustomTextsMutationResponse;
  updateDocumentViews: UpdateDocumentViewsMutationResponse;
  updateGraphNodes: UpdateGraphNodesMutationResponse;
  updateGraphViewElements: UpdateGraphViewElementsMutationResponse;
  updateGraphViews: UpdateGraphViewsMutationResponse;
  updateNodeData: UpdateNodeDataMutationResponse;
  updateUserMetadata: UpdateUserMetadataMutationResponse;
  updateUsers: UpdateUsersMutationResponse;
};


export type MutationCreateBlockElementsArgs = {
  input: Array<BlockElementCreateInput>;
};


export type MutationCreateBlocksArgs = {
  input: Array<BlockCreateInput>;
};


export type MutationCreateConnectionDataArgs = {
  input: Array<ConnectionDataCreateInput>;
};


export type MutationCreateConnectionElementsArgs = {
  input: Array<ConnectionElementCreateInput>;
};


export type MutationCreateCustomTextsArgs = {
  input: Array<CustomTextCreateInput>;
};


export type MutationCreateDocumentViewsArgs = {
  input: Array<DocumentViewCreateInput>;
};


export type MutationCreateGraphNodesArgs = {
  input: Array<GraphNodeCreateInput>;
};


export type MutationCreateGraphViewElementsArgs = {
  input: Array<GraphViewElementCreateInput>;
};


export type MutationCreateGraphViewsArgs = {
  input: Array<GraphViewCreateInput>;
};


export type MutationCreateNodeDataArgs = {
  input: Array<NodeDataCreateInput>;
};


export type MutationCreateUserMetadataArgs = {
  input: Array<UserMetadataCreateInput>;
};


export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};


export type MutationDeleteBlockElementsArgs = {
  delete?: InputMaybe<BlockElementDeleteInput>;
  where?: InputMaybe<BlockElementWhere>;
};


export type MutationDeleteBlocksArgs = {
  delete?: InputMaybe<BlockDeleteInput>;
  where?: InputMaybe<BlockWhere>;
};


export type MutationDeleteConnectionDataArgs = {
  where?: InputMaybe<ConnectionDataWhere>;
};


export type MutationDeleteConnectionElementsArgs = {
  delete?: InputMaybe<ConnectionElementDeleteInput>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type MutationDeleteCustomTextsArgs = {
  where?: InputMaybe<CustomTextWhere>;
};


export type MutationDeleteDocumentViewsArgs = {
  where?: InputMaybe<DocumentViewWhere>;
};


export type MutationDeleteGraphNodesArgs = {
  where?: InputMaybe<GraphNodeWhere>;
};


export type MutationDeleteGraphViewElementsArgs = {
  where?: InputMaybe<GraphViewElementWhere>;
};


export type MutationDeleteGraphViewsArgs = {
  delete?: InputMaybe<GraphViewDeleteInput>;
  where?: InputMaybe<GraphViewWhere>;
};


export type MutationDeleteNodeDataArgs = {
  delete?: InputMaybe<NodeDataDeleteInput>;
  where?: InputMaybe<NodeDataWhere>;
};


export type MutationDeleteUserMetadataArgs = {
  where?: InputMaybe<UserMetadataWhere>;
};


export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationUpdateBlockElementsArgs = {
  connect?: InputMaybe<BlockElementConnectInput>;
  connectOrCreate?: InputMaybe<BlockElementConnectOrCreateInput>;
  create?: InputMaybe<BlockElementRelationInput>;
  delete?: InputMaybe<BlockElementDeleteInput>;
  disconnect?: InputMaybe<BlockElementDisconnectInput>;
  update?: InputMaybe<BlockElementUpdateInput>;
  where?: InputMaybe<BlockElementWhere>;
};


export type MutationUpdateBlocksArgs = {
  connect?: InputMaybe<BlockConnectInput>;
  connectOrCreate?: InputMaybe<BlockConnectOrCreateInput>;
  create?: InputMaybe<BlockRelationInput>;
  delete?: InputMaybe<BlockDeleteInput>;
  disconnect?: InputMaybe<BlockDisconnectInput>;
  update?: InputMaybe<BlockUpdateInput>;
  where?: InputMaybe<BlockWhere>;
};


export type MutationUpdateConnectionDataArgs = {
  update?: InputMaybe<ConnectionDataUpdateInput>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type MutationUpdateConnectionElementsArgs = {
  connect?: InputMaybe<ConnectionElementConnectInput>;
  connectOrCreate?: InputMaybe<ConnectionElementConnectOrCreateInput>;
  create?: InputMaybe<ConnectionElementRelationInput>;
  delete?: InputMaybe<ConnectionElementDeleteInput>;
  disconnect?: InputMaybe<ConnectionElementDisconnectInput>;
  update?: InputMaybe<ConnectionElementUpdateInput>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type MutationUpdateCustomTextsArgs = {
  update?: InputMaybe<CustomTextUpdateInput>;
  where?: InputMaybe<CustomTextWhere>;
};


export type MutationUpdateDocumentViewsArgs = {
  update?: InputMaybe<DocumentViewUpdateInput>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type MutationUpdateGraphNodesArgs = {
  update?: InputMaybe<GraphNodeUpdateInput>;
  where?: InputMaybe<GraphNodeWhere>;
};


export type MutationUpdateGraphViewElementsArgs = {
  update?: InputMaybe<GraphViewElementUpdateInput>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type MutationUpdateGraphViewsArgs = {
  connect?: InputMaybe<GraphViewConnectInput>;
  connectOrCreate?: InputMaybe<GraphViewConnectOrCreateInput>;
  create?: InputMaybe<GraphViewRelationInput>;
  delete?: InputMaybe<GraphViewDeleteInput>;
  disconnect?: InputMaybe<GraphViewDisconnectInput>;
  update?: InputMaybe<GraphViewUpdateInput>;
  where?: InputMaybe<GraphViewWhere>;
};


export type MutationUpdateNodeDataArgs = {
  connect?: InputMaybe<NodeDataConnectInput>;
  connectOrCreate?: InputMaybe<NodeDataConnectOrCreateInput>;
  create?: InputMaybe<NodeDataRelationInput>;
  delete?: InputMaybe<NodeDataDeleteInput>;
  disconnect?: InputMaybe<NodeDataDisconnectInput>;
  update?: InputMaybe<NodeDataUpdateInput>;
  where?: InputMaybe<NodeDataWhere>;
};


export type MutationUpdateUserMetadataArgs = {
  update?: InputMaybe<UserMetadataUpdateInput>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type MutationUpdateUsersArgs = {
  connect?: InputMaybe<UserConnectInput>;
  connectOrCreate?: InputMaybe<UserConnectOrCreateInput>;
  create?: InputMaybe<UserRelationInput>;
  delete?: InputMaybe<UserDeleteInput>;
  disconnect?: InputMaybe<UserDisconnectInput>;
  update?: InputMaybe<UserUpdateInput>;
  where?: InputMaybe<UserWhere>;
};

export type NodeData = {
  __typename?: 'NodeData';
  blocks: Array<BlockElement>;
  blocksAggregate?: Maybe<NodeDataBlockElementBlocksAggregationSelection>;
  blocksConnection: NodeDataBlocksConnection;
  connections: Array<ConnectionElement>;
  connectionsAggregate?: Maybe<NodeDataConnectionElementConnectionsAggregationSelection>;
  connectionsConnection: NodeDataConnectionsConnection;
  document?: Maybe<DocumentView>;
  documentAggregate?: Maybe<NodeDataDocumentViewDocumentAggregationSelection>;
  documentConnection: NodeDataDocumentConnection;
  id: Scalars['ID'];
  navigation: Array<ViewType>;
  navigationConnection: NodeDataNavigationConnection;
  title?: Maybe<Scalars['String']>;
};


export type NodeDataBlocksArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<BlockElementOptions>;
  where?: InputMaybe<BlockElementWhere>;
};


export type NodeDataBlocksAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<BlockElementWhere>;
};


export type NodeDataBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<NodeDataBlocksConnectionSort>>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};


export type NodeDataConnectionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ConnectionElementOptions>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type NodeDataConnectionsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type NodeDataConnectionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<NodeDataConnectionsConnectionSort>>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};


export type NodeDataDocumentArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<DocumentViewOptions>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type NodeDataDocumentAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type NodeDataDocumentConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<NodeDataDocumentConnectionSort>>;
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};


export type NodeDataNavigationArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<ViewTypeWhere>;
};


export type NodeDataNavigationConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NodeDataNavigationConnectionWhere>;
};

export type NodeDataAggregateSelection = {
  __typename?: 'NodeDataAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type NodeDataBlockElementBlocksAggregationSelection = {
  __typename?: 'NodeDataBlockElementBlocksAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<NodeDataBlockElementBlocksNodeAggregateSelection>;
};

export type NodeDataBlockElementBlocksNodeAggregateSelection = {
  __typename?: 'NodeDataBlockElementBlocksNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
};

export type NodeDataBlocksAggregateInput = {
  AND?: InputMaybe<Array<NodeDataBlocksAggregateInput>>;
  OR?: InputMaybe<Array<NodeDataBlocksAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<NodeDataBlocksNodeAggregationWhereInput>;
};

export type NodeDataBlocksConnectFieldInput = {
  connect?: InputMaybe<Array<BlockElementConnectInput>>;
  where?: InputMaybe<BlockElementConnectWhere>;
};

export type NodeDataBlocksConnectOrCreateFieldInput = {
  onCreate: NodeDataBlocksConnectOrCreateFieldInputOnCreate;
  where: BlockElementConnectOrCreateWhere;
};

export type NodeDataBlocksConnectOrCreateFieldInputOnCreate = {
  node: BlockElementOnCreateInput;
};

export type NodeDataBlocksConnection = {
  __typename?: 'NodeDataBlocksConnection';
  edges: Array<NodeDataBlocksRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataBlocksConnectionSort = {
  node?: InputMaybe<BlockElementSort>;
};

export type NodeDataBlocksConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataBlocksConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataBlocksConnectionWhere>>;
  node?: InputMaybe<BlockElementWhere>;
  node_NOT?: InputMaybe<BlockElementWhere>;
};

export type NodeDataBlocksCreateFieldInput = {
  node: BlockElementCreateInput;
};

export type NodeDataBlocksDeleteFieldInput = {
  delete?: InputMaybe<BlockElementDeleteInput>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};

export type NodeDataBlocksDisconnectFieldInput = {
  disconnect?: InputMaybe<BlockElementDisconnectInput>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};

export type NodeDataBlocksFieldInput = {
  connect?: InputMaybe<Array<NodeDataBlocksConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataBlocksConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataBlocksCreateFieldInput>>;
};

export type NodeDataBlocksNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeDataBlocksNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NodeDataBlocksNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
};

export type NodeDataBlocksRelationship = {
  __typename?: 'NodeDataBlocksRelationship';
  cursor: Scalars['String'];
  node: BlockElement;
};

export type NodeDataBlocksUpdateConnectionInput = {
  node?: InputMaybe<BlockElementUpdateInput>;
};

export type NodeDataBlocksUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataBlocksConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataBlocksConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataBlocksCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataBlocksDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataBlocksDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataBlocksUpdateConnectionInput>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};

export type NodeDataConnectInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksConnectFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsConnectFieldInput>>;
  document?: InputMaybe<NodeDataDocumentConnectFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationConnectInput>;
};

export type NodeDataConnectOrCreateInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksConnectOrCreateFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsConnectOrCreateFieldInput>>;
  document?: InputMaybe<NodeDataDocumentConnectOrCreateFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationConnectOrCreateInput>;
};

export type NodeDataConnectOrCreateWhere = {
  node: NodeDataUniqueWhere;
};

export type NodeDataConnectWhere = {
  node: NodeDataWhere;
};

export type NodeDataConnection = {
  __typename?: 'NodeDataConnection';
  edges: Array<NodeDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataConnectionElementConnectionsAggregationSelection = {
  __typename?: 'NodeDataConnectionElementConnectionsAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<NodeDataConnectionElementConnectionsNodeAggregateSelection>;
};

export type NodeDataConnectionElementConnectionsNodeAggregateSelection = {
  __typename?: 'NodeDataConnectionElementConnectionsNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
};

export type NodeDataConnectionsAggregateInput = {
  AND?: InputMaybe<Array<NodeDataConnectionsAggregateInput>>;
  OR?: InputMaybe<Array<NodeDataConnectionsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<NodeDataConnectionsNodeAggregationWhereInput>;
};

export type NodeDataConnectionsConnectFieldInput = {
  connect?: InputMaybe<Array<ConnectionElementConnectInput>>;
  where?: InputMaybe<ConnectionElementConnectWhere>;
};

export type NodeDataConnectionsConnectOrCreateFieldInput = {
  onCreate: NodeDataConnectionsConnectOrCreateFieldInputOnCreate;
  where: ConnectionElementConnectOrCreateWhere;
};

export type NodeDataConnectionsConnectOrCreateFieldInputOnCreate = {
  node: ConnectionElementOnCreateInput;
};

export type NodeDataConnectionsConnection = {
  __typename?: 'NodeDataConnectionsConnection';
  edges: Array<NodeDataConnectionsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataConnectionsConnectionSort = {
  node?: InputMaybe<ConnectionElementSort>;
};

export type NodeDataConnectionsConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataConnectionsConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataConnectionsConnectionWhere>>;
  node?: InputMaybe<ConnectionElementWhere>;
  node_NOT?: InputMaybe<ConnectionElementWhere>;
};

export type NodeDataConnectionsCreateFieldInput = {
  node: ConnectionElementCreateInput;
};

export type NodeDataConnectionsDeleteFieldInput = {
  delete?: InputMaybe<ConnectionElementDeleteInput>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};

export type NodeDataConnectionsDisconnectFieldInput = {
  disconnect?: InputMaybe<ConnectionElementDisconnectInput>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};

export type NodeDataConnectionsFieldInput = {
  connect?: InputMaybe<Array<NodeDataConnectionsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataConnectionsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataConnectionsCreateFieldInput>>;
};

export type NodeDataConnectionsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeDataConnectionsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NodeDataConnectionsNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
};

export type NodeDataConnectionsRelationship = {
  __typename?: 'NodeDataConnectionsRelationship';
  cursor: Scalars['String'];
  node: ConnectionElement;
};

export type NodeDataConnectionsUpdateConnectionInput = {
  node?: InputMaybe<ConnectionElementUpdateInput>;
};

export type NodeDataConnectionsUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataConnectionsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataConnectionsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataConnectionsCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataConnectionsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataConnectionsDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataConnectionsUpdateConnectionInput>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};

export type NodeDataCreateInput = {
  blocks?: InputMaybe<NodeDataBlocksFieldInput>;
  connections?: InputMaybe<NodeDataConnectionsFieldInput>;
  document?: InputMaybe<NodeDataDocumentFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationCreateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type NodeDataDeleteInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksDeleteFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsDeleteFieldInput>>;
  document?: InputMaybe<NodeDataDocumentDeleteFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationDeleteInput>;
};

export type NodeDataDisconnectInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksDisconnectFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsDisconnectFieldInput>>;
  document?: InputMaybe<NodeDataDocumentDisconnectFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationDisconnectInput>;
};

export type NodeDataDocumentAggregateInput = {
  AND?: InputMaybe<Array<NodeDataDocumentAggregateInput>>;
  OR?: InputMaybe<Array<NodeDataDocumentAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<NodeDataDocumentNodeAggregationWhereInput>;
};

export type NodeDataDocumentConnectFieldInput = {
  where?: InputMaybe<DocumentViewConnectWhere>;
};

export type NodeDataDocumentConnectOrCreateFieldInput = {
  onCreate: NodeDataDocumentConnectOrCreateFieldInputOnCreate;
  where: DocumentViewConnectOrCreateWhere;
};

export type NodeDataDocumentConnectOrCreateFieldInputOnCreate = {
  node: DocumentViewOnCreateInput;
};

export type NodeDataDocumentConnection = {
  __typename?: 'NodeDataDocumentConnection';
  edges: Array<NodeDataDocumentRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataDocumentConnectionSort = {
  node?: InputMaybe<DocumentViewSort>;
};

export type NodeDataDocumentConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataDocumentConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataDocumentConnectionWhere>>;
  node?: InputMaybe<DocumentViewWhere>;
  node_NOT?: InputMaybe<DocumentViewWhere>;
};

export type NodeDataDocumentCreateFieldInput = {
  node: DocumentViewCreateInput;
};

export type NodeDataDocumentDeleteFieldInput = {
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};

export type NodeDataDocumentDisconnectFieldInput = {
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};

export type NodeDataDocumentFieldInput = {
  connect?: InputMaybe<NodeDataDocumentConnectFieldInput>;
  connectOrCreate?: InputMaybe<NodeDataDocumentConnectOrCreateFieldInput>;
  create?: InputMaybe<NodeDataDocumentCreateFieldInput>;
};

export type NodeDataDocumentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeDataDocumentNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NodeDataDocumentNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  node_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  node_EQUAL?: InputMaybe<Scalars['String']>;
  node_GT?: InputMaybe<Scalars['Int']>;
  node_GTE?: InputMaybe<Scalars['Int']>;
  node_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  node_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  node_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  node_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  node_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  node_LT?: InputMaybe<Scalars['Int']>;
  node_LTE?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type NodeDataDocumentRelationship = {
  __typename?: 'NodeDataDocumentRelationship';
  cursor: Scalars['String'];
  node: DocumentView;
};

export type NodeDataDocumentUpdateConnectionInput = {
  node?: InputMaybe<DocumentViewUpdateInput>;
};

export type NodeDataDocumentUpdateFieldInput = {
  connect?: InputMaybe<NodeDataDocumentConnectFieldInput>;
  connectOrCreate?: InputMaybe<NodeDataDocumentConnectOrCreateFieldInput>;
  create?: InputMaybe<NodeDataDocumentCreateFieldInput>;
  delete?: InputMaybe<NodeDataDocumentDeleteFieldInput>;
  disconnect?: InputMaybe<NodeDataDocumentDisconnectFieldInput>;
  update?: InputMaybe<NodeDataDocumentUpdateConnectionInput>;
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};

export type NodeDataDocumentViewDocumentAggregationSelection = {
  __typename?: 'NodeDataDocumentViewDocumentAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<NodeDataDocumentViewDocumentNodeAggregateSelection>;
};

export type NodeDataDocumentViewDocumentNodeAggregateSelection = {
  __typename?: 'NodeDataDocumentViewDocumentNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
  node: StringAggregateSelectionNullable;
};

export type NodeDataEdge = {
  __typename?: 'NodeDataEdge';
  cursor: Scalars['String'];
  node: NodeData;
};

export type NodeDataNavigationConnectInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewConnectFieldInput>>;
};

export type NodeDataNavigationConnectOrCreateInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectOrCreateFieldInput>>;
};

export type NodeDataNavigationConnection = {
  __typename?: 'NodeDataNavigationConnection';
  edges: Array<NodeDataNavigationRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataNavigationConnectionWhere = {
  DocumentView?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
  GraphView?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationCreateFieldInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewCreateFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewCreateFieldInput>>;
};

export type NodeDataNavigationCreateInput = {
  DocumentView?: InputMaybe<NodeDataNavigationDocumentViewFieldInput>;
  GraphView?: InputMaybe<NodeDataNavigationGraphViewFieldInput>;
};

export type NodeDataNavigationDeleteInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewDeleteFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewDeleteFieldInput>>;
};

export type NodeDataNavigationDisconnectInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewDisconnectFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewDisconnectFieldInput>>;
};

export type NodeDataNavigationDocumentViewConnectFieldInput = {
  where?: InputMaybe<DocumentViewConnectWhere>;
};

export type NodeDataNavigationDocumentViewConnectOrCreateFieldInput = {
  onCreate: NodeDataNavigationDocumentViewConnectOrCreateFieldInputOnCreate;
  where: DocumentViewConnectOrCreateWhere;
};

export type NodeDataNavigationDocumentViewConnectOrCreateFieldInputOnCreate = {
  node: DocumentViewOnCreateInput;
};

export type NodeDataNavigationDocumentViewConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectionWhere>>;
  node?: InputMaybe<DocumentViewWhere>;
  node_NOT?: InputMaybe<DocumentViewWhere>;
};

export type NodeDataNavigationDocumentViewCreateFieldInput = {
  node: DocumentViewCreateInput;
};

export type NodeDataNavigationDocumentViewDeleteFieldInput = {
  where?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
};

export type NodeDataNavigationDocumentViewDisconnectFieldInput = {
  where?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
};

export type NodeDataNavigationDocumentViewFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationDocumentViewCreateFieldInput>>;
};

export type NodeDataNavigationDocumentViewUpdateConnectionInput = {
  node?: InputMaybe<DocumentViewUpdateInput>;
};

export type NodeDataNavigationDocumentViewUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationDocumentViewCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataNavigationDocumentViewDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataNavigationDocumentViewDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataNavigationDocumentViewUpdateConnectionInput>;
  where?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
};

export type NodeDataNavigationGraphViewConnectFieldInput = {
  connect?: InputMaybe<Array<GraphViewConnectInput>>;
  where?: InputMaybe<GraphViewConnectWhere>;
};

export type NodeDataNavigationGraphViewConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataNavigationGraphViewConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataNavigationGraphViewConnectionWhere>>;
  node?: InputMaybe<GraphViewWhere>;
  node_NOT?: InputMaybe<GraphViewWhere>;
};

export type NodeDataNavigationGraphViewCreateFieldInput = {
  node: GraphViewCreateInput;
};

export type NodeDataNavigationGraphViewDeleteFieldInput = {
  delete?: InputMaybe<GraphViewDeleteInput>;
  where?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationGraphViewDisconnectFieldInput = {
  disconnect?: InputMaybe<GraphViewDisconnectInput>;
  where?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationGraphViewFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationGraphViewConnectFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationGraphViewCreateFieldInput>>;
};

export type NodeDataNavigationGraphViewUpdateConnectionInput = {
  node?: InputMaybe<GraphViewUpdateInput>;
};

export type NodeDataNavigationGraphViewUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationGraphViewConnectFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationGraphViewCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataNavigationGraphViewDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataNavigationGraphViewDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataNavigationGraphViewUpdateConnectionInput>;
  where?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationRelationship = {
  __typename?: 'NodeDataNavigationRelationship';
  cursor: Scalars['String'];
  node: ViewType;
};

export type NodeDataNavigationUpdateInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewUpdateFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewUpdateFieldInput>>;
};

export type NodeDataOnCreateInput = {
  title?: InputMaybe<Scalars['String']>;
};

export type NodeDataOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more NodeDataSort objects to sort NodeData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<NodeDataSort>>;
};

export type NodeDataRelationInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksCreateFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsCreateFieldInput>>;
  document?: InputMaybe<NodeDataDocumentCreateFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationCreateFieldInput>;
};

/** Fields to sort NodeData by. The order in which sorts are applied is not guaranteed when specifying many fields in one NodeDataSort object. */
export type NodeDataSort = {
  id?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type NodeDataUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type NodeDataUpdateInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksUpdateFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsUpdateFieldInput>>;
  document?: InputMaybe<NodeDataDocumentUpdateFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationUpdateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type NodeDataWhere = {
  AND?: InputMaybe<Array<NodeDataWhere>>;
  OR?: InputMaybe<Array<NodeDataWhere>>;
  blocksAggregate?: InputMaybe<NodeDataBlocksAggregateInput>;
  blocksConnection_ALL?: InputMaybe<NodeDataBlocksConnectionWhere>;
  blocksConnection_NONE?: InputMaybe<NodeDataBlocksConnectionWhere>;
  blocksConnection_SINGLE?: InputMaybe<NodeDataBlocksConnectionWhere>;
  blocksConnection_SOME?: InputMaybe<NodeDataBlocksConnectionWhere>;
  /** Return NodeData where all of the related BlockElements match this filter */
  blocks_ALL?: InputMaybe<BlockElementWhere>;
  /** Return NodeData where none of the related BlockElements match this filter */
  blocks_NONE?: InputMaybe<BlockElementWhere>;
  /** Return NodeData where one of the related BlockElements match this filter */
  blocks_SINGLE?: InputMaybe<BlockElementWhere>;
  /** Return NodeData where some of the related BlockElements match this filter */
  blocks_SOME?: InputMaybe<BlockElementWhere>;
  connectionsAggregate?: InputMaybe<NodeDataConnectionsAggregateInput>;
  connectionsConnection_ALL?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  connectionsConnection_NONE?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  connectionsConnection_SINGLE?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  connectionsConnection_SOME?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  /** Return NodeData where all of the related ConnectionElements match this filter */
  connections_ALL?: InputMaybe<ConnectionElementWhere>;
  /** Return NodeData where none of the related ConnectionElements match this filter */
  connections_NONE?: InputMaybe<ConnectionElementWhere>;
  /** Return NodeData where one of the related ConnectionElements match this filter */
  connections_SINGLE?: InputMaybe<ConnectionElementWhere>;
  /** Return NodeData where some of the related ConnectionElements match this filter */
  connections_SOME?: InputMaybe<ConnectionElementWhere>;
  document?: InputMaybe<DocumentViewWhere>;
  documentAggregate?: InputMaybe<NodeDataDocumentAggregateInput>;
  documentConnection?: InputMaybe<NodeDataDocumentConnectionWhere>;
  documentConnection_NOT?: InputMaybe<NodeDataDocumentConnectionWhere>;
  document_NOT?: InputMaybe<DocumentViewWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  navigationConnection_ALL?: InputMaybe<NodeDataNavigationConnectionWhere>;
  navigationConnection_NONE?: InputMaybe<NodeDataNavigationConnectionWhere>;
  navigationConnection_SINGLE?: InputMaybe<NodeDataNavigationConnectionWhere>;
  navigationConnection_SOME?: InputMaybe<NodeDataNavigationConnectionWhere>;
  title?: InputMaybe<Scalars['String']>;
  title_CONTAINS?: InputMaybe<Scalars['String']>;
  title_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT?: InputMaybe<Scalars['String']>;
  title_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  title_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  blockElements: Array<BlockElement>;
  blockElementsAggregate: BlockElementAggregateSelection;
  blockElementsConnection: BlockElementsConnection;
  blocks: Array<Block>;
  blocksAggregate: BlockAggregateSelection;
  blocksConnection: BlocksConnection;
  connectionData: Array<ConnectionData>;
  connectionDataAggregate: ConnectionDataAggregateSelection;
  connectionDataConnection: ConnectionDataConnection;
  connectionElements: Array<ConnectionElement>;
  connectionElementsAggregate: ConnectionElementAggregateSelection;
  connectionElementsConnection: ConnectionElementsConnection;
  customTexts: Array<CustomText>;
  customTextsAggregate: CustomTextAggregateSelection;
  customTextsConnection: CustomTextsConnection;
  documentViews: Array<DocumentView>;
  documentViewsAggregate: DocumentViewAggregateSelection;
  documentViewsConnection: DocumentViewsConnection;
  graphNodes: Array<GraphNode>;
  graphNodesAggregate: GraphNodeAggregateSelection;
  graphNodesConnection: GraphNodesConnection;
  graphViewElements: Array<GraphViewElement>;
  graphViewElementsAggregate: GraphViewElementAggregateSelection;
  graphViewElementsConnection: GraphViewElementsConnection;
  graphViews: Array<GraphView>;
  graphViewsAggregate: GraphViewAggregateSelection;
  graphViewsConnection: GraphViewsConnection;
  nodeData: Array<NodeData>;
  nodeDataAggregate: NodeDataAggregateSelection;
  nodeDataConnection: NodeDataConnection;
  userMetadata: Array<UserMetadata>;
  userMetadataAggregate: UserMetadataAggregateSelection;
  userMetadataConnection: UserMetadataConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
};


export type QueryBlockElementsArgs = {
  options?: InputMaybe<BlockElementOptions>;
  where?: InputMaybe<BlockElementWhere>;
};


export type QueryBlockElementsAggregateArgs = {
  where?: InputMaybe<BlockElementWhere>;
};


export type QueryBlockElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<BlockElementSort>>>;
  where?: InputMaybe<BlockElementWhere>;
};


export type QueryBlocksArgs = {
  options?: InputMaybe<BlockOptions>;
  where?: InputMaybe<BlockWhere>;
};


export type QueryBlocksAggregateArgs = {
  where?: InputMaybe<BlockWhere>;
};


export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<BlockSort>>>;
  where?: InputMaybe<BlockWhere>;
};


export type QueryConnectionDataArgs = {
  options?: InputMaybe<ConnectionDataOptions>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type QueryConnectionDataAggregateArgs = {
  where?: InputMaybe<ConnectionDataWhere>;
};


export type QueryConnectionDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<ConnectionDataSort>>>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type QueryConnectionElementsArgs = {
  options?: InputMaybe<ConnectionElementOptions>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type QueryConnectionElementsAggregateArgs = {
  where?: InputMaybe<ConnectionElementWhere>;
};


export type QueryConnectionElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<ConnectionElementSort>>>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type QueryCustomTextsArgs = {
  options?: InputMaybe<CustomTextOptions>;
  where?: InputMaybe<CustomTextWhere>;
};


export type QueryCustomTextsAggregateArgs = {
  where?: InputMaybe<CustomTextWhere>;
};


export type QueryCustomTextsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<CustomTextSort>>>;
  where?: InputMaybe<CustomTextWhere>;
};


export type QueryDocumentViewsArgs = {
  options?: InputMaybe<DocumentViewOptions>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type QueryDocumentViewsAggregateArgs = {
  where?: InputMaybe<DocumentViewWhere>;
};


export type QueryDocumentViewsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<DocumentViewSort>>>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type QueryGraphNodesArgs = {
  options?: InputMaybe<GraphNodeOptions>;
  where?: InputMaybe<GraphNodeWhere>;
};


export type QueryGraphNodesAggregateArgs = {
  where?: InputMaybe<GraphNodeWhere>;
};


export type QueryGraphNodesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GraphNodeSort>>>;
  where?: InputMaybe<GraphNodeWhere>;
};


export type QueryGraphViewElementsArgs = {
  options?: InputMaybe<GraphViewElementOptions>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type QueryGraphViewElementsAggregateArgs = {
  where?: InputMaybe<GraphViewElementWhere>;
};


export type QueryGraphViewElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GraphViewElementSort>>>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type QueryGraphViewsArgs = {
  options?: InputMaybe<GraphViewOptions>;
  where?: InputMaybe<GraphViewWhere>;
};


export type QueryGraphViewsAggregateArgs = {
  where?: InputMaybe<GraphViewWhere>;
};


export type QueryGraphViewsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GraphViewSort>>>;
  where?: InputMaybe<GraphViewWhere>;
};


export type QueryNodeDataArgs = {
  options?: InputMaybe<NodeDataOptions>;
  where?: InputMaybe<NodeDataWhere>;
};


export type QueryNodeDataAggregateArgs = {
  where?: InputMaybe<NodeDataWhere>;
};


export type QueryNodeDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<NodeDataSort>>>;
  where?: InputMaybe<NodeDataWhere>;
};


export type QueryUserMetadataArgs = {
  options?: InputMaybe<UserMetadataOptions>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type QueryUserMetadataAggregateArgs = {
  where?: InputMaybe<UserMetadataWhere>;
};


export type QueryUserMetadataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<UserMetadataSort>>>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  where?: InputMaybe<UserWhere>;
};

export type QueryOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type StringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable';
  longest?: Maybe<Scalars['String']>;
  shortest?: Maybe<Scalars['String']>;
};

export type UpdateBlockElementsMutationResponse = {
  __typename?: 'UpdateBlockElementsMutationResponse';
  blockElements: Array<BlockElement>;
  info: UpdateInfo;
};

export type UpdateBlocksMutationResponse = {
  __typename?: 'UpdateBlocksMutationResponse';
  blocks: Array<Block>;
  info: UpdateInfo;
};

export type UpdateConnectionDataMutationResponse = {
  __typename?: 'UpdateConnectionDataMutationResponse';
  connectionData: Array<ConnectionData>;
  info: UpdateInfo;
};

export type UpdateConnectionElementsMutationResponse = {
  __typename?: 'UpdateConnectionElementsMutationResponse';
  connectionElements: Array<ConnectionElement>;
  info: UpdateInfo;
};

export type UpdateCustomTextsMutationResponse = {
  __typename?: 'UpdateCustomTextsMutationResponse';
  customTexts: Array<CustomText>;
  info: UpdateInfo;
};

export type UpdateDocumentViewsMutationResponse = {
  __typename?: 'UpdateDocumentViewsMutationResponse';
  documentViews: Array<DocumentView>;
  info: UpdateInfo;
};

export type UpdateGraphNodesMutationResponse = {
  __typename?: 'UpdateGraphNodesMutationResponse';
  graphNodes: Array<GraphNode>;
  info: UpdateInfo;
};

export type UpdateGraphViewElementsMutationResponse = {
  __typename?: 'UpdateGraphViewElementsMutationResponse';
  graphViewElements: Array<GraphViewElement>;
  info: UpdateInfo;
};

export type UpdateGraphViewsMutationResponse = {
  __typename?: 'UpdateGraphViewsMutationResponse';
  graphViews: Array<GraphView>;
  info: UpdateInfo;
};

export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  nodesDeleted: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type UpdateNodeDataMutationResponse = {
  __typename?: 'UpdateNodeDataMutationResponse';
  info: UpdateInfo;
  nodeData: Array<NodeData>;
};

export type UpdateUserMetadataMutationResponse = {
  __typename?: 'UpdateUserMetadataMutationResponse';
  info: UpdateInfo;
  userMetadata: Array<UserMetadata>;
};

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse';
  info: UpdateInfo;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  home_node?: Maybe<NodeData>;
  home_nodeAggregate?: Maybe<UserNodeDataHome_NodeAggregationSelection>;
  home_nodeConnection: UserHome_NodeConnection;
  homeless_node?: Maybe<NodeData>;
  homeless_nodeAggregate?: Maybe<UserNodeDataHomeless_NodeAggregationSelection>;
  homeless_nodeConnection: UserHomeless_NodeConnection;
  id: Scalars['ID'];
  metadata?: Maybe<UserMetadata>;
  metadataAggregate?: Maybe<UserUserMetadataMetadataAggregationSelection>;
  metadataConnection: UserMetadataConnection;
};


export type UserHome_NodeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<NodeDataOptions>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHome_NodeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHome_NodeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserHome_NodeConnectionSort>>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};


export type UserHomeless_NodeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<NodeDataOptions>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHomeless_NodeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHomeless_NodeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserHomeless_NodeConnectionSort>>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};


export type UserMetadataArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserMetadataOptions>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type UserMetadataAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type UserMetadataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserMetadataConnectionSort>>;
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type UserConnectInput = {
  home_node?: InputMaybe<UserHome_NodeConnectFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeConnectFieldInput>;
  metadata?: InputMaybe<UserMetadataConnectFieldInput>;
};

export type UserConnectOrCreateInput = {
  home_node?: InputMaybe<UserHome_NodeConnectOrCreateFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeConnectOrCreateFieldInput>;
  metadata?: InputMaybe<UserMetadataConnectOrCreateFieldInput>;
};

export type UserCreateInput = {
  home_node?: InputMaybe<UserHome_NodeFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeFieldInput>;
  metadata?: InputMaybe<UserMetadataFieldInput>;
};

export type UserDeleteInput = {
  home_node?: InputMaybe<UserHome_NodeDeleteFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeDeleteFieldInput>;
  metadata?: InputMaybe<UserMetadataDeleteFieldInput>;
};

export type UserDisconnectInput = {
  home_node?: InputMaybe<UserHome_NodeDisconnectFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeDisconnectFieldInput>;
  metadata?: InputMaybe<UserMetadataDisconnectFieldInput>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserHome_NodeAggregateInput = {
  AND?: InputMaybe<Array<UserHome_NodeAggregateInput>>;
  OR?: InputMaybe<Array<UserHome_NodeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserHome_NodeNodeAggregationWhereInput>;
};

export type UserHome_NodeConnectFieldInput = {
  connect?: InputMaybe<NodeDataConnectInput>;
  where?: InputMaybe<NodeDataConnectWhere>;
};

export type UserHome_NodeConnectOrCreateFieldInput = {
  onCreate: UserHome_NodeConnectOrCreateFieldInputOnCreate;
  where: NodeDataConnectOrCreateWhere;
};

export type UserHome_NodeConnectOrCreateFieldInputOnCreate = {
  node: NodeDataOnCreateInput;
};

export type UserHome_NodeConnection = {
  __typename?: 'UserHome_nodeConnection';
  edges: Array<UserHome_NodeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserHome_NodeConnectionSort = {
  node?: InputMaybe<NodeDataSort>;
};

export type UserHome_NodeConnectionWhere = {
  AND?: InputMaybe<Array<UserHome_NodeConnectionWhere>>;
  OR?: InputMaybe<Array<UserHome_NodeConnectionWhere>>;
  node?: InputMaybe<NodeDataWhere>;
  node_NOT?: InputMaybe<NodeDataWhere>;
};

export type UserHome_NodeCreateFieldInput = {
  node: NodeDataCreateInput;
};

export type UserHome_NodeDeleteFieldInput = {
  delete?: InputMaybe<NodeDataDeleteInput>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};

export type UserHome_NodeDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeDataDisconnectInput>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};

export type UserHome_NodeFieldInput = {
  connect?: InputMaybe<UserHome_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHome_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHome_NodeCreateFieldInput>;
};

export type UserHome_NodeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserHome_NodeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserHome_NodeNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  title_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  title_EQUAL?: InputMaybe<Scalars['String']>;
  title_GT?: InputMaybe<Scalars['Int']>;
  title_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  title_LT?: InputMaybe<Scalars['Int']>;
  title_LTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserHome_NodeRelationship = {
  __typename?: 'UserHome_nodeRelationship';
  cursor: Scalars['String'];
  node: NodeData;
};

export type UserHome_NodeUpdateConnectionInput = {
  node?: InputMaybe<NodeDataUpdateInput>;
};

export type UserHome_NodeUpdateFieldInput = {
  connect?: InputMaybe<UserHome_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHome_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHome_NodeCreateFieldInput>;
  delete?: InputMaybe<UserHome_NodeDeleteFieldInput>;
  disconnect?: InputMaybe<UserHome_NodeDisconnectFieldInput>;
  update?: InputMaybe<UserHome_NodeUpdateConnectionInput>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};

export type UserHomeless_NodeAggregateInput = {
  AND?: InputMaybe<Array<UserHomeless_NodeAggregateInput>>;
  OR?: InputMaybe<Array<UserHomeless_NodeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserHomeless_NodeNodeAggregationWhereInput>;
};

export type UserHomeless_NodeConnectFieldInput = {
  connect?: InputMaybe<NodeDataConnectInput>;
  where?: InputMaybe<NodeDataConnectWhere>;
};

export type UserHomeless_NodeConnectOrCreateFieldInput = {
  onCreate: UserHomeless_NodeConnectOrCreateFieldInputOnCreate;
  where: NodeDataConnectOrCreateWhere;
};

export type UserHomeless_NodeConnectOrCreateFieldInputOnCreate = {
  node: NodeDataOnCreateInput;
};

export type UserHomeless_NodeConnection = {
  __typename?: 'UserHomeless_nodeConnection';
  edges: Array<UserHomeless_NodeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserHomeless_NodeConnectionSort = {
  node?: InputMaybe<NodeDataSort>;
};

export type UserHomeless_NodeConnectionWhere = {
  AND?: InputMaybe<Array<UserHomeless_NodeConnectionWhere>>;
  OR?: InputMaybe<Array<UserHomeless_NodeConnectionWhere>>;
  node?: InputMaybe<NodeDataWhere>;
  node_NOT?: InputMaybe<NodeDataWhere>;
};

export type UserHomeless_NodeCreateFieldInput = {
  node: NodeDataCreateInput;
};

export type UserHomeless_NodeDeleteFieldInput = {
  delete?: InputMaybe<NodeDataDeleteInput>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};

export type UserHomeless_NodeDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeDataDisconnectInput>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};

export type UserHomeless_NodeFieldInput = {
  connect?: InputMaybe<UserHomeless_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHomeless_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHomeless_NodeCreateFieldInput>;
};

export type UserHomeless_NodeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserHomeless_NodeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserHomeless_NodeNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  title_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  title_EQUAL?: InputMaybe<Scalars['String']>;
  title_GT?: InputMaybe<Scalars['Int']>;
  title_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  title_LT?: InputMaybe<Scalars['Int']>;
  title_LTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserHomeless_NodeRelationship = {
  __typename?: 'UserHomeless_nodeRelationship';
  cursor: Scalars['String'];
  node: NodeData;
};

export type UserHomeless_NodeUpdateConnectionInput = {
  node?: InputMaybe<NodeDataUpdateInput>;
};

export type UserHomeless_NodeUpdateFieldInput = {
  connect?: InputMaybe<UserHomeless_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHomeless_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHomeless_NodeCreateFieldInput>;
  delete?: InputMaybe<UserHomeless_NodeDeleteFieldInput>;
  disconnect?: InputMaybe<UserHomeless_NodeDisconnectFieldInput>;
  update?: InputMaybe<UserHomeless_NodeUpdateConnectionInput>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};

export type UserMetadata = {
  __typename?: 'UserMetadata';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UserMetadataAggregateInput = {
  AND?: InputMaybe<Array<UserMetadataAggregateInput>>;
  OR?: InputMaybe<Array<UserMetadataAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserMetadataNodeAggregationWhereInput>;
};

export type UserMetadataAggregateSelection = {
  __typename?: 'UserMetadataAggregateSelection';
  count: Scalars['Int'];
  email: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
};

export type UserMetadataConnectFieldInput = {
  where?: InputMaybe<UserMetadataConnectWhere>;
};

export type UserMetadataConnectOrCreateFieldInput = {
  onCreate: UserMetadataConnectOrCreateFieldInputOnCreate;
  where: UserMetadataConnectOrCreateWhere;
};

export type UserMetadataConnectOrCreateFieldInputOnCreate = {
  node: UserMetadataOnCreateInput;
};

export type UserMetadataConnectOrCreateWhere = {
  node: UserMetadataUniqueWhere;
};

export type UserMetadataConnectWhere = {
  node: UserMetadataWhere;
};

export type UserMetadataConnection = {
  __typename?: 'UserMetadataConnection';
  edges: Array<UserMetadataRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserMetadataConnectionSort = {
  node?: InputMaybe<UserMetadataSort>;
};

export type UserMetadataConnectionWhere = {
  AND?: InputMaybe<Array<UserMetadataConnectionWhere>>;
  OR?: InputMaybe<Array<UserMetadataConnectionWhere>>;
  node?: InputMaybe<UserMetadataWhere>;
  node_NOT?: InputMaybe<UserMetadataWhere>;
};

export type UserMetadataCreateFieldInput = {
  node: UserMetadataCreateInput;
};

export type UserMetadataCreateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserMetadataDeleteFieldInput = {
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserMetadataDisconnectFieldInput = {
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserMetadataEdge = {
  __typename?: 'UserMetadataEdge';
  cursor: Scalars['String'];
  node: UserMetadata;
};

export type UserMetadataFieldInput = {
  connect?: InputMaybe<UserMetadataConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserMetadataConnectOrCreateFieldInput>;
  create?: InputMaybe<UserMetadataCreateFieldInput>;
};

export type UserMetadataNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserMetadataNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserMetadataNodeAggregationWhereInput>>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  email_EQUAL?: InputMaybe<Scalars['String']>;
  email_GT?: InputMaybe<Scalars['Int']>;
  email_GTE?: InputMaybe<Scalars['Int']>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  email_LT?: InputMaybe<Scalars['Int']>;
  email_LTE?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserMetadataOnCreateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserMetadataOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserMetadataSort objects to sort UserMetadata by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserMetadataSort>>;
};

export type UserMetadataRelationship = {
  __typename?: 'UserMetadataRelationship';
  cursor: Scalars['String'];
  node: UserMetadata;
};

/** Fields to sort UserMetadata by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserMetadataSort object. */
export type UserMetadataSort = {
  email?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type UserMetadataUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type UserMetadataUpdateConnectionInput = {
  node?: InputMaybe<UserMetadataUpdateInput>;
};

export type UserMetadataUpdateFieldInput = {
  connect?: InputMaybe<UserMetadataConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserMetadataConnectOrCreateFieldInput>;
  create?: InputMaybe<UserMetadataCreateFieldInput>;
  delete?: InputMaybe<UserMetadataDeleteFieldInput>;
  disconnect?: InputMaybe<UserMetadataDisconnectFieldInput>;
  update?: InputMaybe<UserMetadataUpdateConnectionInput>;
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserMetadataUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserMetadataWhere = {
  AND?: InputMaybe<Array<UserMetadataWhere>>;
  OR?: InputMaybe<Array<UserMetadataWhere>>;
  email?: InputMaybe<Scalars['String']>;
  email_CONTAINS?: InputMaybe<Scalars['String']>;
  email_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email_NOT?: InputMaybe<Scalars['String']>;
  email_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  email_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  email_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type UserNodeDataHome_NodeAggregationSelection = {
  __typename?: 'UserNodeDataHome_nodeAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserNodeDataHome_NodeNodeAggregateSelection>;
};

export type UserNodeDataHome_NodeNodeAggregateSelection = {
  __typename?: 'UserNodeDataHome_nodeNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type UserNodeDataHomeless_NodeAggregationSelection = {
  __typename?: 'UserNodeDataHomeless_nodeAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserNodeDataHomeless_NodeNodeAggregateSelection>;
};

export type UserNodeDataHomeless_NodeNodeAggregateSelection = {
  __typename?: 'UserNodeDataHomeless_nodeNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

export type UserRelationInput = {
  home_node?: InputMaybe<UserHome_NodeCreateFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeCreateFieldInput>;
  metadata?: InputMaybe<UserMetadataCreateFieldInput>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: InputMaybe<SortDirection>;
};

export type UserUpdateInput = {
  home_node?: InputMaybe<UserHome_NodeUpdateFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeUpdateFieldInput>;
  metadata?: InputMaybe<UserMetadataUpdateFieldInput>;
};

export type UserUserMetadataMetadataAggregationSelection = {
  __typename?: 'UserUserMetadataMetadataAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserUserMetadataMetadataNodeAggregateSelection>;
};

export type UserUserMetadataMetadataNodeAggregateSelection = {
  __typename?: 'UserUserMetadataMetadataNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
};

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>;
  OR?: InputMaybe<Array<UserWhere>>;
  home_node?: InputMaybe<NodeDataWhere>;
  home_nodeAggregate?: InputMaybe<UserHome_NodeAggregateInput>;
  home_nodeConnection?: InputMaybe<UserHome_NodeConnectionWhere>;
  home_nodeConnection_NOT?: InputMaybe<UserHome_NodeConnectionWhere>;
  home_node_NOT?: InputMaybe<NodeDataWhere>;
  homeless_node?: InputMaybe<NodeDataWhere>;
  homeless_nodeAggregate?: InputMaybe<UserHomeless_NodeAggregateInput>;
  homeless_nodeConnection?: InputMaybe<UserHomeless_NodeConnectionWhere>;
  homeless_nodeConnection_NOT?: InputMaybe<UserHomeless_NodeConnectionWhere>;
  homeless_node_NOT?: InputMaybe<NodeDataWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  metadata?: InputMaybe<UserMetadataWhere>;
  metadataAggregate?: InputMaybe<UserMetadataAggregateInput>;
  metadataConnection?: InputMaybe<UserMetadataConnectionWhere>;
  metadataConnection_NOT?: InputMaybe<UserMetadataConnectionWhere>;
  metadata_NOT?: InputMaybe<UserMetadataWhere>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ViewType = DocumentView | GraphView;

export type ViewTypeWhere = {
  DocumentView?: InputMaybe<DocumentViewWhere>;
  GraphView?: InputMaybe<GraphViewWhere>;
};

export type GetAllNodesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNodesQueryQuery = { __typename?: 'Query', nodeData: Array<{ __typename?: 'NodeData', title?: string | null, id: string }> };

export type GetDocViewQueryQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetDocViewQueryQuery = { __typename?: 'Query', nodeData: Array<{ __typename?: 'NodeData', document?: { __typename?: 'DocumentView', id: string, elements: Array<string> } | null }> };

export type GetCurrentUserQueryQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetCurrentUserQueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, metadata?: { __typename?: 'UserMetadata', name?: string | null } | null }> };


export const GetAllNodesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllNodesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodeData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetAllNodesQueryQuery, GetAllNodesQueryQueryVariables>;
export const GetDocViewQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDocViewQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodeData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"elements"}}]}}]}}]}}]} as unknown as DocumentNode<GetDocViewQueryQuery, GetDocViewQueryQueryVariables>;
export const GetCurrentUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQueryQuery, GetCurrentUserQueryQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Block = {
  __typename?: 'Block';
  children: Array<CustomElementChildren>;
  childrenConnection: BlockChildrenConnection;
  format?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
};


export type BlockChildrenArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<CustomElementChildrenWhere>;
};


export type BlockChildrenConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BlockChildrenConnectionWhere>;
};

export type BlockAggregateSelection = {
  __typename?: 'BlockAggregateSelection';
  count: Scalars['Int'];
  format: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  type: StringAggregateSelectionNullable;
};

export type BlockChildrenBlockConnectFieldInput = {
  connect?: InputMaybe<Array<BlockConnectInput>>;
  where?: InputMaybe<BlockConnectWhere>;
};

export type BlockChildrenBlockConnectOrCreateFieldInput = {
  onCreate: BlockChildrenBlockConnectOrCreateFieldInputOnCreate;
  where: BlockConnectOrCreateWhere;
};

export type BlockChildrenBlockConnectOrCreateFieldInputOnCreate = {
  node: BlockOnCreateInput;
};

export type BlockChildrenBlockConnectionWhere = {
  AND?: InputMaybe<Array<BlockChildrenBlockConnectionWhere>>;
  OR?: InputMaybe<Array<BlockChildrenBlockConnectionWhere>>;
  node?: InputMaybe<BlockWhere>;
  node_NOT?: InputMaybe<BlockWhere>;
};

export type BlockChildrenBlockCreateFieldInput = {
  node: BlockCreateInput;
};

export type BlockChildrenBlockDeleteFieldInput = {
  delete?: InputMaybe<BlockDeleteInput>;
  where?: InputMaybe<BlockChildrenBlockConnectionWhere>;
};

export type BlockChildrenBlockDisconnectFieldInput = {
  disconnect?: InputMaybe<BlockDisconnectInput>;
  where?: InputMaybe<BlockChildrenBlockConnectionWhere>;
};

export type BlockChildrenBlockFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenBlockConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<BlockChildrenBlockConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenBlockCreateFieldInput>>;
};

export type BlockChildrenBlockUpdateConnectionInput = {
  node?: InputMaybe<BlockUpdateInput>;
};

export type BlockChildrenBlockUpdateFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenBlockConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<BlockChildrenBlockConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenBlockCreateFieldInput>>;
  delete?: InputMaybe<Array<BlockChildrenBlockDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<BlockChildrenBlockDisconnectFieldInput>>;
  update?: InputMaybe<BlockChildrenBlockUpdateConnectionInput>;
  where?: InputMaybe<BlockChildrenBlockConnectionWhere>;
};

export type BlockChildrenConnectInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockConnectFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextConnectFieldInput>>;
};

export type BlockChildrenConnectOrCreateInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockConnectOrCreateFieldInput>>;
};

export type BlockChildrenConnection = {
  __typename?: 'BlockChildrenConnection';
  edges: Array<BlockChildrenRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockChildrenConnectionWhere = {
  Block?: InputMaybe<BlockChildrenBlockConnectionWhere>;
  CustomText?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenCreateFieldInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockCreateFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextCreateFieldInput>>;
};

export type BlockChildrenCreateInput = {
  Block?: InputMaybe<BlockChildrenBlockFieldInput>;
  CustomText?: InputMaybe<BlockChildrenCustomTextFieldInput>;
};

export type BlockChildrenCustomTextConnectFieldInput = {
  where?: InputMaybe<CustomTextConnectWhere>;
};

export type BlockChildrenCustomTextConnectionWhere = {
  AND?: InputMaybe<Array<BlockChildrenCustomTextConnectionWhere>>;
  OR?: InputMaybe<Array<BlockChildrenCustomTextConnectionWhere>>;
  node?: InputMaybe<CustomTextWhere>;
  node_NOT?: InputMaybe<CustomTextWhere>;
};

export type BlockChildrenCustomTextCreateFieldInput = {
  node: CustomTextCreateInput;
};

export type BlockChildrenCustomTextDeleteFieldInput = {
  where?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenCustomTextDisconnectFieldInput = {
  where?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenCustomTextFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenCustomTextConnectFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenCustomTextCreateFieldInput>>;
};

export type BlockChildrenCustomTextUpdateConnectionInput = {
  node?: InputMaybe<CustomTextUpdateInput>;
};

export type BlockChildrenCustomTextUpdateFieldInput = {
  connect?: InputMaybe<Array<BlockChildrenCustomTextConnectFieldInput>>;
  create?: InputMaybe<Array<BlockChildrenCustomTextCreateFieldInput>>;
  delete?: InputMaybe<Array<BlockChildrenCustomTextDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<BlockChildrenCustomTextDisconnectFieldInput>>;
  update?: InputMaybe<BlockChildrenCustomTextUpdateConnectionInput>;
  where?: InputMaybe<BlockChildrenCustomTextConnectionWhere>;
};

export type BlockChildrenDeleteInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockDeleteFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextDeleteFieldInput>>;
};

export type BlockChildrenDisconnectInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockDisconnectFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextDisconnectFieldInput>>;
};

export type BlockChildrenRelationship = {
  __typename?: 'BlockChildrenRelationship';
  cursor: Scalars['String'];
  node: CustomElementChildren;
};

export type BlockChildrenUpdateInput = {
  Block?: InputMaybe<Array<BlockChildrenBlockUpdateFieldInput>>;
  CustomText?: InputMaybe<Array<BlockChildrenCustomTextUpdateFieldInput>>;
};

export type BlockConnectInput = {
  children?: InputMaybe<BlockChildrenConnectInput>;
};

export type BlockConnectOrCreateInput = {
  children?: InputMaybe<BlockChildrenConnectOrCreateInput>;
};

export type BlockConnectOrCreateWhere = {
  node: BlockUniqueWhere;
};

export type BlockConnectWhere = {
  node: BlockWhere;
};

export type BlockCreateInput = {
  children?: InputMaybe<BlockChildrenCreateInput>;
  format?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type BlockDeleteInput = {
  children?: InputMaybe<BlockChildrenDeleteInput>;
};

export type BlockDisconnectInput = {
  children?: InputMaybe<BlockChildrenDisconnectInput>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String'];
  node: Block;
};

export type BlockElement = {
  __typename?: 'BlockElement';
  block?: Maybe<Block>;
  blockAggregate?: Maybe<BlockElementBlockBlockAggregationSelection>;
  blockConnection: BlockElementBlockConnection;
  id: Scalars['ID'];
};


export type BlockElementBlockArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<BlockOptions>;
  where?: InputMaybe<BlockWhere>;
};


export type BlockElementBlockAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<BlockWhere>;
};


export type BlockElementBlockConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<BlockElementBlockConnectionSort>>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementAggregateSelection = {
  __typename?: 'BlockElementAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type BlockElementBlockAggregateInput = {
  AND?: InputMaybe<Array<BlockElementBlockAggregateInput>>;
  OR?: InputMaybe<Array<BlockElementBlockAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<BlockElementBlockNodeAggregationWhereInput>;
};

export type BlockElementBlockBlockAggregationSelection = {
  __typename?: 'BlockElementBlockBlockAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<BlockElementBlockBlockNodeAggregateSelection>;
};

export type BlockElementBlockBlockNodeAggregateSelection = {
  __typename?: 'BlockElementBlockBlockNodeAggregateSelection';
  format: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  type: StringAggregateSelectionNullable;
};

export type BlockElementBlockConnectFieldInput = {
  connect?: InputMaybe<BlockConnectInput>;
  where?: InputMaybe<BlockConnectWhere>;
};

export type BlockElementBlockConnectOrCreateFieldInput = {
  onCreate: BlockElementBlockConnectOrCreateFieldInputOnCreate;
  where: BlockConnectOrCreateWhere;
};

export type BlockElementBlockConnectOrCreateFieldInputOnCreate = {
  node: BlockOnCreateInput;
};

export type BlockElementBlockConnection = {
  __typename?: 'BlockElementBlockConnection';
  edges: Array<BlockElementBlockRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockElementBlockConnectionSort = {
  node?: InputMaybe<BlockSort>;
};

export type BlockElementBlockConnectionWhere = {
  AND?: InputMaybe<Array<BlockElementBlockConnectionWhere>>;
  OR?: InputMaybe<Array<BlockElementBlockConnectionWhere>>;
  node?: InputMaybe<BlockWhere>;
  node_NOT?: InputMaybe<BlockWhere>;
};

export type BlockElementBlockCreateFieldInput = {
  node: BlockCreateInput;
};

export type BlockElementBlockDeleteFieldInput = {
  delete?: InputMaybe<BlockDeleteInput>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementBlockDisconnectFieldInput = {
  disconnect?: InputMaybe<BlockDisconnectInput>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementBlockFieldInput = {
  connect?: InputMaybe<BlockElementBlockConnectFieldInput>;
  connectOrCreate?: InputMaybe<BlockElementBlockConnectOrCreateFieldInput>;
  create?: InputMaybe<BlockElementBlockCreateFieldInput>;
};

export type BlockElementBlockNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BlockElementBlockNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BlockElementBlockNodeAggregationWhereInput>>;
  format_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  format_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  format_EQUAL?: InputMaybe<Scalars['String']>;
  format_GT?: InputMaybe<Scalars['Int']>;
  format_GTE?: InputMaybe<Scalars['Int']>;
  format_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  format_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  format_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  format_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  format_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  format_LT?: InputMaybe<Scalars['Int']>;
  format_LTE?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  format_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type BlockElementBlockRelationship = {
  __typename?: 'BlockElementBlockRelationship';
  cursor: Scalars['String'];
  node: Block;
};

export type BlockElementBlockUpdateConnectionInput = {
  node?: InputMaybe<BlockUpdateInput>;
};

export type BlockElementBlockUpdateFieldInput = {
  connect?: InputMaybe<BlockElementBlockConnectFieldInput>;
  connectOrCreate?: InputMaybe<BlockElementBlockConnectOrCreateFieldInput>;
  create?: InputMaybe<BlockElementBlockCreateFieldInput>;
  delete?: InputMaybe<BlockElementBlockDeleteFieldInput>;
  disconnect?: InputMaybe<BlockElementBlockDisconnectFieldInput>;
  update?: InputMaybe<BlockElementBlockUpdateConnectionInput>;
  where?: InputMaybe<BlockElementBlockConnectionWhere>;
};

export type BlockElementConnectInput = {
  block?: InputMaybe<BlockElementBlockConnectFieldInput>;
};

export type BlockElementConnectOrCreateInput = {
  block?: InputMaybe<BlockElementBlockConnectOrCreateFieldInput>;
};

export type BlockElementConnectOrCreateWhere = {
  node: BlockElementUniqueWhere;
};

export type BlockElementConnectWhere = {
  node: BlockElementWhere;
};

export type BlockElementCreateInput = {
  block?: InputMaybe<BlockElementBlockFieldInput>;
};

export type BlockElementDeleteInput = {
  block?: InputMaybe<BlockElementBlockDeleteFieldInput>;
};

export type BlockElementDisconnectInput = {
  block?: InputMaybe<BlockElementBlockDisconnectFieldInput>;
};

export type BlockElementEdge = {
  __typename?: 'BlockElementEdge';
  cursor: Scalars['String'];
  node: BlockElement;
};

export type BlockElementOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type BlockElementOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more BlockElementSort objects to sort BlockElements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BlockElementSort>>;
};

export type BlockElementRelationInput = {
  block?: InputMaybe<BlockElementBlockCreateFieldInput>;
};

/** Fields to sort BlockElements by. The order in which sorts are applied is not guaranteed when specifying many fields in one BlockElementSort object. */
export type BlockElementSort = {
  id?: InputMaybe<SortDirection>;
};

export type BlockElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BlockElementUpdateInput = {
  block?: InputMaybe<BlockElementBlockUpdateFieldInput>;
};

export type BlockElementWhere = {
  AND?: InputMaybe<Array<BlockElementWhere>>;
  OR?: InputMaybe<Array<BlockElementWhere>>;
  block?: InputMaybe<BlockWhere>;
  blockAggregate?: InputMaybe<BlockElementBlockAggregateInput>;
  blockConnection?: InputMaybe<BlockElementBlockConnectionWhere>;
  blockConnection_NOT?: InputMaybe<BlockElementBlockConnectionWhere>;
  block_NOT?: InputMaybe<BlockWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type BlockElementsConnection = {
  __typename?: 'BlockElementsConnection';
  edges: Array<BlockElementEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BlockOnCreateInput = {
  format?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type BlockOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more BlockSort objects to sort Blocks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BlockSort>>;
};

export type BlockRelationInput = {
  children?: InputMaybe<BlockChildrenCreateFieldInput>;
};

/** Fields to sort Blocks by. The order in which sorts are applied is not guaranteed when specifying many fields in one BlockSort object. */
export type BlockSort = {
  format?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type BlockUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BlockUpdateInput = {
  children?: InputMaybe<BlockChildrenUpdateInput>;
  format?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type BlockWhere = {
  AND?: InputMaybe<Array<BlockWhere>>;
  OR?: InputMaybe<Array<BlockWhere>>;
  childrenConnection_ALL?: InputMaybe<BlockChildrenConnectionWhere>;
  childrenConnection_NONE?: InputMaybe<BlockChildrenConnectionWhere>;
  childrenConnection_SINGLE?: InputMaybe<BlockChildrenConnectionWhere>;
  childrenConnection_SOME?: InputMaybe<BlockChildrenConnectionWhere>;
  format?: InputMaybe<Scalars['String']>;
  format_CONTAINS?: InputMaybe<Scalars['String']>;
  format_ENDS_WITH?: InputMaybe<Scalars['String']>;
  format_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  format_NOT?: InputMaybe<Scalars['String']>;
  format_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  format_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  format_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  format_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  format_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ConnectionData = {
  __typename?: 'ConnectionData';
  connection_type?: Maybe<Scalars['String']>;
  content: Array<Block>;
  id: Scalars['ID'];
  nodes: Array<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ConnectionDataAggregateSelection = {
  __typename?: 'ConnectionDataAggregateSelection';
  connection_type: StringAggregateSelectionNullable;
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type ConnectionDataConnectOrCreateWhere = {
  node: ConnectionDataUniqueWhere;
};

export type ConnectionDataConnectWhere = {
  node: ConnectionDataWhere;
};

export type ConnectionDataConnection = {
  __typename?: 'ConnectionDataConnection';
  edges: Array<ConnectionDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ConnectionDataCreateInput = {
  connection_type?: InputMaybe<Scalars['String']>;
  nodes: Array<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConnectionDataEdge = {
  __typename?: 'ConnectionDataEdge';
  cursor: Scalars['String'];
  node: ConnectionData;
};

export type ConnectionDataOnCreateInput = {
  connection_type?: InputMaybe<Scalars['String']>;
  nodes: Array<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConnectionDataOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more ConnectionDataSort objects to sort ConnectionData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ConnectionDataSort>>;
};

/** Fields to sort ConnectionData by. The order in which sorts are applied is not guaranteed when specifying many fields in one ConnectionDataSort object. */
export type ConnectionDataSort = {
  connection_type?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type ConnectionDataUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ConnectionDataUpdateInput = {
  connection_type?: InputMaybe<Scalars['String']>;
  nodes?: InputMaybe<Array<Scalars['String']>>;
  nodes_POP?: InputMaybe<Scalars['Int']>;
  nodes_PUSH?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ConnectionDataWhere = {
  AND?: InputMaybe<Array<ConnectionDataWhere>>;
  OR?: InputMaybe<Array<ConnectionDataWhere>>;
  connection_type?: InputMaybe<Scalars['String']>;
  connection_type_CONTAINS?: InputMaybe<Scalars['String']>;
  connection_type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  connection_type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  connection_type_NOT?: InputMaybe<Scalars['String']>;
  connection_type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  connection_type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  connection_type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  connection_type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  connection_type_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  nodes?: InputMaybe<Array<Scalars['String']>>;
  nodes_INCLUDES?: InputMaybe<Scalars['String']>;
  nodes_NOT?: InputMaybe<Array<Scalars['String']>>;
  nodes_NOT_INCLUDES?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_CONTAINS?: InputMaybe<Scalars['String']>;
  title_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT?: InputMaybe<Scalars['String']>;
  title_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  title_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type ConnectionElement = {
  __typename?: 'ConnectionElement';
  connection?: Maybe<ConnectionData>;
  connectionAggregate?: Maybe<ConnectionElementConnectionDataConnectionAggregationSelection>;
  connectionConnection: ConnectionElementConnectionConnection;
  id: Scalars['ID'];
};


export type ConnectionElementConnectionArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ConnectionDataOptions>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type ConnectionElementConnectionAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type ConnectionElementConnectionConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ConnectionElementConnectionConnectionSort>>;
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementAggregateSelection = {
  __typename?: 'ConnectionElementAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type ConnectionElementConnectInput = {
  connection?: InputMaybe<ConnectionElementConnectionConnectFieldInput>;
};

export type ConnectionElementConnectOrCreateInput = {
  connection?: InputMaybe<ConnectionElementConnectionConnectOrCreateFieldInput>;
};

export type ConnectionElementConnectOrCreateWhere = {
  node: ConnectionElementUniqueWhere;
};

export type ConnectionElementConnectWhere = {
  node: ConnectionElementWhere;
};

export type ConnectionElementConnectionAggregateInput = {
  AND?: InputMaybe<Array<ConnectionElementConnectionAggregateInput>>;
  OR?: InputMaybe<Array<ConnectionElementConnectionAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<ConnectionElementConnectionNodeAggregationWhereInput>;
};

export type ConnectionElementConnectionConnectFieldInput = {
  where?: InputMaybe<ConnectionDataConnectWhere>;
};

export type ConnectionElementConnectionConnectOrCreateFieldInput = {
  onCreate: ConnectionElementConnectionConnectOrCreateFieldInputOnCreate;
  where: ConnectionDataConnectOrCreateWhere;
};

export type ConnectionElementConnectionConnectOrCreateFieldInputOnCreate = {
  node: ConnectionDataOnCreateInput;
};

export type ConnectionElementConnectionConnection = {
  __typename?: 'ConnectionElementConnectionConnection';
  edges: Array<ConnectionElementConnectionRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ConnectionElementConnectionConnectionSort = {
  node?: InputMaybe<ConnectionDataSort>;
};

export type ConnectionElementConnectionConnectionWhere = {
  AND?: InputMaybe<Array<ConnectionElementConnectionConnectionWhere>>;
  OR?: InputMaybe<Array<ConnectionElementConnectionConnectionWhere>>;
  node?: InputMaybe<ConnectionDataWhere>;
  node_NOT?: InputMaybe<ConnectionDataWhere>;
};

export type ConnectionElementConnectionCreateFieldInput = {
  node: ConnectionDataCreateInput;
};

export type ConnectionElementConnectionDataConnectionAggregationSelection = {
  __typename?: 'ConnectionElementConnectionDataConnectionAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<ConnectionElementConnectionDataConnectionNodeAggregateSelection>;
};

export type ConnectionElementConnectionDataConnectionNodeAggregateSelection = {
  __typename?: 'ConnectionElementConnectionDataConnectionNodeAggregateSelection';
  connection_type: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type ConnectionElementConnectionDeleteFieldInput = {
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementConnectionDisconnectFieldInput = {
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementConnectionFieldInput = {
  connect?: InputMaybe<ConnectionElementConnectionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ConnectionElementConnectionConnectOrCreateFieldInput>;
  create?: InputMaybe<ConnectionElementConnectionCreateFieldInput>;
};

export type ConnectionElementConnectionNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ConnectionElementConnectionNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ConnectionElementConnectionNodeAggregationWhereInput>>;
  connection_type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  connection_type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  connection_type_EQUAL?: InputMaybe<Scalars['String']>;
  connection_type_GT?: InputMaybe<Scalars['Int']>;
  connection_type_GTE?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  connection_type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  connection_type_LT?: InputMaybe<Scalars['Int']>;
  connection_type_LTE?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  connection_type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  title_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  title_EQUAL?: InputMaybe<Scalars['String']>;
  title_GT?: InputMaybe<Scalars['Int']>;
  title_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  title_LT?: InputMaybe<Scalars['Int']>;
  title_LTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type ConnectionElementConnectionRelationship = {
  __typename?: 'ConnectionElementConnectionRelationship';
  cursor: Scalars['String'];
  node: ConnectionData;
};

export type ConnectionElementConnectionUpdateConnectionInput = {
  node?: InputMaybe<ConnectionDataUpdateInput>;
};

export type ConnectionElementConnectionUpdateFieldInput = {
  connect?: InputMaybe<ConnectionElementConnectionConnectFieldInput>;
  connectOrCreate?: InputMaybe<ConnectionElementConnectionConnectOrCreateFieldInput>;
  create?: InputMaybe<ConnectionElementConnectionCreateFieldInput>;
  delete?: InputMaybe<ConnectionElementConnectionDeleteFieldInput>;
  disconnect?: InputMaybe<ConnectionElementConnectionDisconnectFieldInput>;
  update?: InputMaybe<ConnectionElementConnectionUpdateConnectionInput>;
  where?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
};

export type ConnectionElementCreateInput = {
  connection?: InputMaybe<ConnectionElementConnectionFieldInput>;
};

export type ConnectionElementDeleteInput = {
  connection?: InputMaybe<ConnectionElementConnectionDeleteFieldInput>;
};

export type ConnectionElementDisconnectInput = {
  connection?: InputMaybe<ConnectionElementConnectionDisconnectFieldInput>;
};

export type ConnectionElementEdge = {
  __typename?: 'ConnectionElementEdge';
  cursor: Scalars['String'];
  node: ConnectionElement;
};

export type ConnectionElementOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type ConnectionElementOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more ConnectionElementSort objects to sort ConnectionElements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ConnectionElementSort>>;
};

export type ConnectionElementRelationInput = {
  connection?: InputMaybe<ConnectionElementConnectionCreateFieldInput>;
};

/** Fields to sort ConnectionElements by. The order in which sorts are applied is not guaranteed when specifying many fields in one ConnectionElementSort object. */
export type ConnectionElementSort = {
  id?: InputMaybe<SortDirection>;
};

export type ConnectionElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ConnectionElementUpdateInput = {
  connection?: InputMaybe<ConnectionElementConnectionUpdateFieldInput>;
};

export type ConnectionElementWhere = {
  AND?: InputMaybe<Array<ConnectionElementWhere>>;
  OR?: InputMaybe<Array<ConnectionElementWhere>>;
  connection?: InputMaybe<ConnectionDataWhere>;
  connectionAggregate?: InputMaybe<ConnectionElementConnectionAggregateInput>;
  connectionConnection?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
  connectionConnection_NOT?: InputMaybe<ConnectionElementConnectionConnectionWhere>;
  connection_NOT?: InputMaybe<ConnectionDataWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type ConnectionElementsConnection = {
  __typename?: 'ConnectionElementsConnection';
  edges: Array<ConnectionElementEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CreateBlockElementsMutationResponse = {
  __typename?: 'CreateBlockElementsMutationResponse';
  blockElements: Array<BlockElement>;
  info: CreateInfo;
};

export type CreateBlocksMutationResponse = {
  __typename?: 'CreateBlocksMutationResponse';
  blocks: Array<Block>;
  info: CreateInfo;
};

export type CreateConnectionDataMutationResponse = {
  __typename?: 'CreateConnectionDataMutationResponse';
  connectionData: Array<ConnectionData>;
  info: CreateInfo;
};

export type CreateConnectionElementsMutationResponse = {
  __typename?: 'CreateConnectionElementsMutationResponse';
  connectionElements: Array<ConnectionElement>;
  info: CreateInfo;
};

export type CreateCustomTextsMutationResponse = {
  __typename?: 'CreateCustomTextsMutationResponse';
  customTexts: Array<CustomText>;
  info: CreateInfo;
};

export type CreateDocumentViewsMutationResponse = {
  __typename?: 'CreateDocumentViewsMutationResponse';
  documentViews: Array<DocumentView>;
  info: CreateInfo;
};

export type CreateGraphNodesMutationResponse = {
  __typename?: 'CreateGraphNodesMutationResponse';
  graphNodes: Array<GraphNode>;
  info: CreateInfo;
};

export type CreateGraphViewElementsMutationResponse = {
  __typename?: 'CreateGraphViewElementsMutationResponse';
  graphViewElements: Array<GraphViewElement>;
  info: CreateInfo;
};

export type CreateGraphViewsMutationResponse = {
  __typename?: 'CreateGraphViewsMutationResponse';
  graphViews: Array<GraphView>;
  info: CreateInfo;
};

export type CreateInfo = {
  __typename?: 'CreateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
};

export type CreateNodeDataMutationResponse = {
  __typename?: 'CreateNodeDataMutationResponse';
  info: CreateInfo;
  nodeData: Array<NodeData>;
};

export type CreateUserMetadataMutationResponse = {
  __typename?: 'CreateUserMetadataMutationResponse';
  info: CreateInfo;
  userMetadata: Array<UserMetadata>;
};

export type CreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse';
  info: CreateInfo;
  users: Array<User>;
};

export type CustomElementChildren = Block | CustomText;

export type CustomElementChildrenWhere = {
  Block?: InputMaybe<BlockWhere>;
  CustomText?: InputMaybe<CustomTextWhere>;
};

export type CustomText = {
  __typename?: 'CustomText';
  bold?: Maybe<Scalars['Boolean']>;
  italics?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  text_type?: Maybe<Scalars['String']>;
};

export type CustomTextAggregateSelection = {
  __typename?: 'CustomTextAggregateSelection';
  count: Scalars['Int'];
  text: StringAggregateSelectionNullable;
  text_type: StringAggregateSelectionNullable;
};

export type CustomTextConnectWhere = {
  node: CustomTextWhere;
};

export type CustomTextCreateInput = {
  bold?: InputMaybe<Scalars['Boolean']>;
  italics?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
  text_type?: InputMaybe<Scalars['String']>;
};

export type CustomTextEdge = {
  __typename?: 'CustomTextEdge';
  cursor: Scalars['String'];
  node: CustomText;
};

export type CustomTextOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more CustomTextSort objects to sort CustomTexts by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CustomTextSort>>;
};

/** Fields to sort CustomTexts by. The order in which sorts are applied is not guaranteed when specifying many fields in one CustomTextSort object. */
export type CustomTextSort = {
  bold?: InputMaybe<SortDirection>;
  italics?: InputMaybe<SortDirection>;
  text?: InputMaybe<SortDirection>;
  text_type?: InputMaybe<SortDirection>;
};

export type CustomTextUpdateInput = {
  bold?: InputMaybe<Scalars['Boolean']>;
  italics?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
  text_type?: InputMaybe<Scalars['String']>;
};

export type CustomTextWhere = {
  AND?: InputMaybe<Array<CustomTextWhere>>;
  OR?: InputMaybe<Array<CustomTextWhere>>;
  bold?: InputMaybe<Scalars['Boolean']>;
  bold_NOT?: InputMaybe<Scalars['Boolean']>;
  italics?: InputMaybe<Scalars['Boolean']>;
  italics_NOT?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
  text_CONTAINS?: InputMaybe<Scalars['String']>;
  text_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_NOT?: InputMaybe<Scalars['String']>;
  text_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  text_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  text_STARTS_WITH?: InputMaybe<Scalars['String']>;
  text_type?: InputMaybe<Scalars['String']>;
  text_type_CONTAINS?: InputMaybe<Scalars['String']>;
  text_type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_type_NOT?: InputMaybe<Scalars['String']>;
  text_type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  text_type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  text_type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text_type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  text_type_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type CustomTextsConnection = {
  __typename?: 'CustomTextsConnection';
  edges: Array<CustomTextEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesDeleted: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type DocumentView = {
  __typename?: 'DocumentView';
  elements: Array<Scalars['String']>;
  id: Scalars['ID'];
  node?: Maybe<Scalars['String']>;
};

export type DocumentViewAggregateSelection = {
  __typename?: 'DocumentViewAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
  node: StringAggregateSelectionNullable;
};

export type DocumentViewConnectOrCreateWhere = {
  node: DocumentViewUniqueWhere;
};

export type DocumentViewConnectWhere = {
  node: DocumentViewWhere;
};

export type DocumentViewCreateInput = {
  elements: Array<Scalars['String']>;
  node?: InputMaybe<Scalars['String']>;
};

export type DocumentViewEdge = {
  __typename?: 'DocumentViewEdge';
  cursor: Scalars['String'];
  node: DocumentView;
};

export type DocumentViewOnCreateInput = {
  elements: Array<Scalars['String']>;
  node?: InputMaybe<Scalars['String']>;
};

export type DocumentViewOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more DocumentViewSort objects to sort DocumentViews by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DocumentViewSort>>;
};

/** Fields to sort DocumentViews by. The order in which sorts are applied is not guaranteed when specifying many fields in one DocumentViewSort object. */
export type DocumentViewSort = {
  id?: InputMaybe<SortDirection>;
  node?: InputMaybe<SortDirection>;
};

export type DocumentViewUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type DocumentViewUpdateInput = {
  elements?: InputMaybe<Array<Scalars['String']>>;
  elements_POP?: InputMaybe<Scalars['Int']>;
  elements_PUSH?: InputMaybe<Array<Scalars['String']>>;
  node?: InputMaybe<Scalars['String']>;
};

export type DocumentViewWhere = {
  AND?: InputMaybe<Array<DocumentViewWhere>>;
  OR?: InputMaybe<Array<DocumentViewWhere>>;
  elements?: InputMaybe<Array<Scalars['String']>>;
  elements_INCLUDES?: InputMaybe<Scalars['String']>;
  elements_NOT?: InputMaybe<Array<Scalars['String']>>;
  elements_NOT_INCLUDES?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  node?: InputMaybe<Scalars['String']>;
  node_CONTAINS?: InputMaybe<Scalars['String']>;
  node_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT?: InputMaybe<Scalars['String']>;
  node_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  node_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  node_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type DocumentViewsConnection = {
  __typename?: 'DocumentViewsConnection';
  edges: Array<DocumentViewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type FloatAggregateSelectionNullable = {
  __typename?: 'FloatAggregateSelectionNullable';
  average?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

export type GraphNode = {
  __typename?: 'GraphNode';
  index?: Maybe<Scalars['Int']>;
  size: Array<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type GraphNodeAggregateSelection = {
  __typename?: 'GraphNodeAggregateSelection';
  count: Scalars['Int'];
  index: IntAggregateSelectionNullable;
  type: StringAggregateSelectionNullable;
  x: FloatAggregateSelectionNullable;
  y: FloatAggregateSelectionNullable;
};

export type GraphNodeCreateInput = {
  index?: InputMaybe<Scalars['Int']>;
  size: Array<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
};

export type GraphNodeEdge = {
  __typename?: 'GraphNodeEdge';
  cursor: Scalars['String'];
  node: GraphNode;
};

export type GraphNodeOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GraphNodeSort objects to sort GraphNodes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GraphNodeSort>>;
};

/** Fields to sort GraphNodes by. The order in which sorts are applied is not guaranteed when specifying many fields in one GraphNodeSort object. */
export type GraphNodeSort = {
  index?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
  x?: InputMaybe<SortDirection>;
  y?: InputMaybe<SortDirection>;
};

export type GraphNodeUpdateInput = {
  index?: InputMaybe<Scalars['Int']>;
  index_DECREMENT?: InputMaybe<Scalars['Int']>;
  index_INCREMENT?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Array<Scalars['Float']>>;
  size_POP?: InputMaybe<Scalars['Int']>;
  size_PUSH?: InputMaybe<Array<Scalars['Float']>>;
  type?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['Float']>;
  x_ADD?: InputMaybe<Scalars['Float']>;
  x_DIVIDE?: InputMaybe<Scalars['Float']>;
  x_MULTIPLY?: InputMaybe<Scalars['Float']>;
  x_SUBTRACT?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
  y_ADD?: InputMaybe<Scalars['Float']>;
  y_DIVIDE?: InputMaybe<Scalars['Float']>;
  y_MULTIPLY?: InputMaybe<Scalars['Float']>;
  y_SUBTRACT?: InputMaybe<Scalars['Float']>;
};

export type GraphNodeWhere = {
  AND?: InputMaybe<Array<GraphNodeWhere>>;
  OR?: InputMaybe<Array<GraphNodeWhere>>;
  index?: InputMaybe<Scalars['Int']>;
  index_GT?: InputMaybe<Scalars['Int']>;
  index_GTE?: InputMaybe<Scalars['Int']>;
  index_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  index_LT?: InputMaybe<Scalars['Int']>;
  index_LTE?: InputMaybe<Scalars['Int']>;
  index_NOT?: InputMaybe<Scalars['Int']>;
  index_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Array<Scalars['Float']>>;
  size_INCLUDES?: InputMaybe<Scalars['Float']>;
  size_NOT?: InputMaybe<Array<Scalars['Float']>>;
  size_NOT_INCLUDES?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['Float']>;
  x_GT?: InputMaybe<Scalars['Float']>;
  x_GTE?: InputMaybe<Scalars['Float']>;
  x_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  x_LT?: InputMaybe<Scalars['Float']>;
  x_LTE?: InputMaybe<Scalars['Float']>;
  x_NOT?: InputMaybe<Scalars['Float']>;
  x_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  y?: InputMaybe<Scalars['Float']>;
  y_GT?: InputMaybe<Scalars['Float']>;
  y_GTE?: InputMaybe<Scalars['Float']>;
  y_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  y_LT?: InputMaybe<Scalars['Float']>;
  y_LTE?: InputMaybe<Scalars['Float']>;
  y_NOT?: InputMaybe<Scalars['Float']>;
  y_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type GraphNodesConnection = {
  __typename?: 'GraphNodesConnection';
  edges: Array<GraphNodeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GraphView = {
  __typename?: 'GraphView';
  elements: Array<GraphViewElement>;
  elementsAggregate?: Maybe<GraphViewGraphViewElementElementsAggregationSelection>;
  elementsConnection: GraphViewElementsConnection;
  node?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type GraphViewElementsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GraphViewElementOptions>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type GraphViewElementsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type GraphViewElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GraphViewElementsConnectionSort>>;
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewAggregateSelection = {
  __typename?: 'GraphViewAggregateSelection';
  count: Scalars['Int'];
  node: StringAggregateSelectionNullable;
  title: StringAggregateSelectionNullable;
};

export type GraphViewConnectInput = {
  elements?: InputMaybe<Array<GraphViewElementsConnectFieldInput>>;
};

export type GraphViewConnectOrCreateInput = {
  elements?: InputMaybe<Array<GraphViewElementsConnectOrCreateFieldInput>>;
};

export type GraphViewConnectWhere = {
  node: GraphViewWhere;
};

export type GraphViewCreateInput = {
  elements?: InputMaybe<GraphViewElementsFieldInput>;
  node?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type GraphViewDeleteInput = {
  elements?: InputMaybe<Array<GraphViewElementsDeleteFieldInput>>;
};

export type GraphViewDisconnectInput = {
  elements?: InputMaybe<Array<GraphViewElementsDisconnectFieldInput>>;
};

export type GraphViewEdge = {
  __typename?: 'GraphViewEdge';
  cursor: Scalars['String'];
  node: GraphView;
};

export type GraphViewElement = {
  __typename?: 'GraphViewElement';
  graphNode?: Maybe<GraphNode>;
  id: Scalars['ID'];
};

export type GraphViewElementAggregateSelection = {
  __typename?: 'GraphViewElementAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type GraphViewElementConnectOrCreateWhere = {
  node: GraphViewElementUniqueWhere;
};

export type GraphViewElementConnectWhere = {
  node: GraphViewElementWhere;
};

export type GraphViewElementCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type GraphViewElementEdge = {
  __typename?: 'GraphViewElementEdge';
  cursor: Scalars['String'];
  node: GraphViewElement;
};

export type GraphViewElementOnCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type GraphViewElementOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GraphViewElementSort objects to sort GraphViewElements by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GraphViewElementSort>>;
};

/** Fields to sort GraphViewElements by. The order in which sorts are applied is not guaranteed when specifying many fields in one GraphViewElementSort object. */
export type GraphViewElementSort = {
  id?: InputMaybe<SortDirection>;
};

export type GraphViewElementUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type GraphViewElementUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars['Boolean']>;
};

export type GraphViewElementWhere = {
  AND?: InputMaybe<Array<GraphViewElementWhere>>;
  OR?: InputMaybe<Array<GraphViewElementWhere>>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type GraphViewElementsAggregateInput = {
  AND?: InputMaybe<Array<GraphViewElementsAggregateInput>>;
  OR?: InputMaybe<Array<GraphViewElementsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GraphViewElementsNodeAggregationWhereInput>;
};

export type GraphViewElementsConnectFieldInput = {
  where?: InputMaybe<GraphViewElementConnectWhere>;
};

export type GraphViewElementsConnectOrCreateFieldInput = {
  onCreate: GraphViewElementsConnectOrCreateFieldInputOnCreate;
  where: GraphViewElementConnectOrCreateWhere;
};

export type GraphViewElementsConnectOrCreateFieldInputOnCreate = {
  node: GraphViewElementOnCreateInput;
};

export type GraphViewElementsConnection = {
  __typename?: 'GraphViewElementsConnection';
  edges: Array<GraphViewElementsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GraphViewElementsConnectionSort = {
  node?: InputMaybe<GraphViewElementSort>;
};

export type GraphViewElementsConnectionWhere = {
  AND?: InputMaybe<Array<GraphViewElementsConnectionWhere>>;
  OR?: InputMaybe<Array<GraphViewElementsConnectionWhere>>;
  node?: InputMaybe<GraphViewElementWhere>;
  node_NOT?: InputMaybe<GraphViewElementWhere>;
};

export type GraphViewElementsCreateFieldInput = {
  node: GraphViewElementCreateInput;
};

export type GraphViewElementsDeleteFieldInput = {
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewElementsDisconnectFieldInput = {
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewElementsFieldInput = {
  connect?: InputMaybe<Array<GraphViewElementsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<GraphViewElementsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<GraphViewElementsCreateFieldInput>>;
};

export type GraphViewElementsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GraphViewElementsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GraphViewElementsNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
};

export type GraphViewElementsRelationship = {
  __typename?: 'GraphViewElementsRelationship';
  cursor: Scalars['String'];
  node: GraphViewElement;
};

export type GraphViewElementsUpdateConnectionInput = {
  node?: InputMaybe<GraphViewElementUpdateInput>;
};

export type GraphViewElementsUpdateFieldInput = {
  connect?: InputMaybe<Array<GraphViewElementsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<GraphViewElementsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<GraphViewElementsCreateFieldInput>>;
  delete?: InputMaybe<Array<GraphViewElementsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<GraphViewElementsDisconnectFieldInput>>;
  update?: InputMaybe<GraphViewElementsUpdateConnectionInput>;
  where?: InputMaybe<GraphViewElementsConnectionWhere>;
};

export type GraphViewGraphViewElementElementsAggregationSelection = {
  __typename?: 'GraphViewGraphViewElementElementsAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<GraphViewGraphViewElementElementsNodeAggregateSelection>;
};

export type GraphViewGraphViewElementElementsNodeAggregateSelection = {
  __typename?: 'GraphViewGraphViewElementElementsNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
};

export type GraphViewOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GraphViewSort objects to sort GraphViews by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GraphViewSort>>;
};

export type GraphViewRelationInput = {
  elements?: InputMaybe<Array<GraphViewElementsCreateFieldInput>>;
};

/** Fields to sort GraphViews by. The order in which sorts are applied is not guaranteed when specifying many fields in one GraphViewSort object. */
export type GraphViewSort = {
  node?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type GraphViewUpdateInput = {
  elements?: InputMaybe<Array<GraphViewElementsUpdateFieldInput>>;
  node?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type GraphViewWhere = {
  AND?: InputMaybe<Array<GraphViewWhere>>;
  OR?: InputMaybe<Array<GraphViewWhere>>;
  elementsAggregate?: InputMaybe<GraphViewElementsAggregateInput>;
  elementsConnection_ALL?: InputMaybe<GraphViewElementsConnectionWhere>;
  elementsConnection_NONE?: InputMaybe<GraphViewElementsConnectionWhere>;
  elementsConnection_SINGLE?: InputMaybe<GraphViewElementsConnectionWhere>;
  elementsConnection_SOME?: InputMaybe<GraphViewElementsConnectionWhere>;
  /** Return GraphViews where all of the related GraphViewElements match this filter */
  elements_ALL?: InputMaybe<GraphViewElementWhere>;
  /** Return GraphViews where none of the related GraphViewElements match this filter */
  elements_NONE?: InputMaybe<GraphViewElementWhere>;
  /** Return GraphViews where one of the related GraphViewElements match this filter */
  elements_SINGLE?: InputMaybe<GraphViewElementWhere>;
  /** Return GraphViews where some of the related GraphViewElements match this filter */
  elements_SOME?: InputMaybe<GraphViewElementWhere>;
  node?: InputMaybe<Scalars['String']>;
  node_CONTAINS?: InputMaybe<Scalars['String']>;
  node_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT?: InputMaybe<Scalars['String']>;
  node_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  node_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  node_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  node_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  node_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_CONTAINS?: InputMaybe<Scalars['String']>;
  title_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT?: InputMaybe<Scalars['String']>;
  title_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  title_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type GraphViewsConnection = {
  __typename?: 'GraphViewsConnection';
  edges: Array<GraphViewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type IdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable';
  longest: Scalars['ID'];
  shortest: Scalars['ID'];
};

export type IntAggregateSelectionNullable = {
  __typename?: 'IntAggregateSelectionNullable';
  average?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  sum?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlockElements: CreateBlockElementsMutationResponse;
  createBlocks: CreateBlocksMutationResponse;
  createConnectionData: CreateConnectionDataMutationResponse;
  createConnectionElements: CreateConnectionElementsMutationResponse;
  createCustomTexts: CreateCustomTextsMutationResponse;
  createDocumentViews: CreateDocumentViewsMutationResponse;
  createGraphNodes: CreateGraphNodesMutationResponse;
  createGraphViewElements: CreateGraphViewElementsMutationResponse;
  createGraphViews: CreateGraphViewsMutationResponse;
  createNodeData: CreateNodeDataMutationResponse;
  createUserMetadata: CreateUserMetadataMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteBlockElements: DeleteInfo;
  deleteBlocks: DeleteInfo;
  deleteConnectionData: DeleteInfo;
  deleteConnectionElements: DeleteInfo;
  deleteCustomTexts: DeleteInfo;
  deleteDocumentViews: DeleteInfo;
  deleteGraphNodes: DeleteInfo;
  deleteGraphViewElements: DeleteInfo;
  deleteGraphViews: DeleteInfo;
  deleteNodeData: DeleteInfo;
  deleteUserMetadata: DeleteInfo;
  deleteUsers: DeleteInfo;
  updateBlockElements: UpdateBlockElementsMutationResponse;
  updateBlocks: UpdateBlocksMutationResponse;
  updateConnectionData: UpdateConnectionDataMutationResponse;
  updateConnectionElements: UpdateConnectionElementsMutationResponse;
  updateCustomTexts: UpdateCustomTextsMutationResponse;
  updateDocumentViews: UpdateDocumentViewsMutationResponse;
  updateGraphNodes: UpdateGraphNodesMutationResponse;
  updateGraphViewElements: UpdateGraphViewElementsMutationResponse;
  updateGraphViews: UpdateGraphViewsMutationResponse;
  updateNodeData: UpdateNodeDataMutationResponse;
  updateUserMetadata: UpdateUserMetadataMutationResponse;
  updateUsers: UpdateUsersMutationResponse;
};


export type MutationCreateBlockElementsArgs = {
  input: Array<BlockElementCreateInput>;
};


export type MutationCreateBlocksArgs = {
  input: Array<BlockCreateInput>;
};


export type MutationCreateConnectionDataArgs = {
  input: Array<ConnectionDataCreateInput>;
};


export type MutationCreateConnectionElementsArgs = {
  input: Array<ConnectionElementCreateInput>;
};


export type MutationCreateCustomTextsArgs = {
  input: Array<CustomTextCreateInput>;
};


export type MutationCreateDocumentViewsArgs = {
  input: Array<DocumentViewCreateInput>;
};


export type MutationCreateGraphNodesArgs = {
  input: Array<GraphNodeCreateInput>;
};


export type MutationCreateGraphViewElementsArgs = {
  input: Array<GraphViewElementCreateInput>;
};


export type MutationCreateGraphViewsArgs = {
  input: Array<GraphViewCreateInput>;
};


export type MutationCreateNodeDataArgs = {
  input: Array<NodeDataCreateInput>;
};


export type MutationCreateUserMetadataArgs = {
  input: Array<UserMetadataCreateInput>;
};


export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};


export type MutationDeleteBlockElementsArgs = {
  delete?: InputMaybe<BlockElementDeleteInput>;
  where?: InputMaybe<BlockElementWhere>;
};


export type MutationDeleteBlocksArgs = {
  delete?: InputMaybe<BlockDeleteInput>;
  where?: InputMaybe<BlockWhere>;
};


export type MutationDeleteConnectionDataArgs = {
  where?: InputMaybe<ConnectionDataWhere>;
};


export type MutationDeleteConnectionElementsArgs = {
  delete?: InputMaybe<ConnectionElementDeleteInput>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type MutationDeleteCustomTextsArgs = {
  where?: InputMaybe<CustomTextWhere>;
};


export type MutationDeleteDocumentViewsArgs = {
  where?: InputMaybe<DocumentViewWhere>;
};


export type MutationDeleteGraphNodesArgs = {
  where?: InputMaybe<GraphNodeWhere>;
};


export type MutationDeleteGraphViewElementsArgs = {
  where?: InputMaybe<GraphViewElementWhere>;
};


export type MutationDeleteGraphViewsArgs = {
  delete?: InputMaybe<GraphViewDeleteInput>;
  where?: InputMaybe<GraphViewWhere>;
};


export type MutationDeleteNodeDataArgs = {
  delete?: InputMaybe<NodeDataDeleteInput>;
  where?: InputMaybe<NodeDataWhere>;
};


export type MutationDeleteUserMetadataArgs = {
  where?: InputMaybe<UserMetadataWhere>;
};


export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationUpdateBlockElementsArgs = {
  connect?: InputMaybe<BlockElementConnectInput>;
  connectOrCreate?: InputMaybe<BlockElementConnectOrCreateInput>;
  create?: InputMaybe<BlockElementRelationInput>;
  delete?: InputMaybe<BlockElementDeleteInput>;
  disconnect?: InputMaybe<BlockElementDisconnectInput>;
  update?: InputMaybe<BlockElementUpdateInput>;
  where?: InputMaybe<BlockElementWhere>;
};


export type MutationUpdateBlocksArgs = {
  connect?: InputMaybe<BlockConnectInput>;
  connectOrCreate?: InputMaybe<BlockConnectOrCreateInput>;
  create?: InputMaybe<BlockRelationInput>;
  delete?: InputMaybe<BlockDeleteInput>;
  disconnect?: InputMaybe<BlockDisconnectInput>;
  update?: InputMaybe<BlockUpdateInput>;
  where?: InputMaybe<BlockWhere>;
};


export type MutationUpdateConnectionDataArgs = {
  update?: InputMaybe<ConnectionDataUpdateInput>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type MutationUpdateConnectionElementsArgs = {
  connect?: InputMaybe<ConnectionElementConnectInput>;
  connectOrCreate?: InputMaybe<ConnectionElementConnectOrCreateInput>;
  create?: InputMaybe<ConnectionElementRelationInput>;
  delete?: InputMaybe<ConnectionElementDeleteInput>;
  disconnect?: InputMaybe<ConnectionElementDisconnectInput>;
  update?: InputMaybe<ConnectionElementUpdateInput>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type MutationUpdateCustomTextsArgs = {
  update?: InputMaybe<CustomTextUpdateInput>;
  where?: InputMaybe<CustomTextWhere>;
};


export type MutationUpdateDocumentViewsArgs = {
  update?: InputMaybe<DocumentViewUpdateInput>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type MutationUpdateGraphNodesArgs = {
  update?: InputMaybe<GraphNodeUpdateInput>;
  where?: InputMaybe<GraphNodeWhere>;
};


export type MutationUpdateGraphViewElementsArgs = {
  update?: InputMaybe<GraphViewElementUpdateInput>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type MutationUpdateGraphViewsArgs = {
  connect?: InputMaybe<GraphViewConnectInput>;
  connectOrCreate?: InputMaybe<GraphViewConnectOrCreateInput>;
  create?: InputMaybe<GraphViewRelationInput>;
  delete?: InputMaybe<GraphViewDeleteInput>;
  disconnect?: InputMaybe<GraphViewDisconnectInput>;
  update?: InputMaybe<GraphViewUpdateInput>;
  where?: InputMaybe<GraphViewWhere>;
};


export type MutationUpdateNodeDataArgs = {
  connect?: InputMaybe<NodeDataConnectInput>;
  connectOrCreate?: InputMaybe<NodeDataConnectOrCreateInput>;
  create?: InputMaybe<NodeDataRelationInput>;
  delete?: InputMaybe<NodeDataDeleteInput>;
  disconnect?: InputMaybe<NodeDataDisconnectInput>;
  update?: InputMaybe<NodeDataUpdateInput>;
  where?: InputMaybe<NodeDataWhere>;
};


export type MutationUpdateUserMetadataArgs = {
  update?: InputMaybe<UserMetadataUpdateInput>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type MutationUpdateUsersArgs = {
  connect?: InputMaybe<UserConnectInput>;
  connectOrCreate?: InputMaybe<UserConnectOrCreateInput>;
  create?: InputMaybe<UserRelationInput>;
  delete?: InputMaybe<UserDeleteInput>;
  disconnect?: InputMaybe<UserDisconnectInput>;
  update?: InputMaybe<UserUpdateInput>;
  where?: InputMaybe<UserWhere>;
};

export type NodeData = {
  __typename?: 'NodeData';
  blocks: Array<BlockElement>;
  blocksAggregate?: Maybe<NodeDataBlockElementBlocksAggregationSelection>;
  blocksConnection: NodeDataBlocksConnection;
  connections: Array<ConnectionElement>;
  connectionsAggregate?: Maybe<NodeDataConnectionElementConnectionsAggregationSelection>;
  connectionsConnection: NodeDataConnectionsConnection;
  document?: Maybe<DocumentView>;
  documentAggregate?: Maybe<NodeDataDocumentViewDocumentAggregationSelection>;
  documentConnection: NodeDataDocumentConnection;
  id: Scalars['ID'];
  navigation: Array<ViewType>;
  navigationConnection: NodeDataNavigationConnection;
  title?: Maybe<Scalars['String']>;
};


export type NodeDataBlocksArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<BlockElementOptions>;
  where?: InputMaybe<BlockElementWhere>;
};


export type NodeDataBlocksAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<BlockElementWhere>;
};


export type NodeDataBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<NodeDataBlocksConnectionSort>>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};


export type NodeDataConnectionsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ConnectionElementOptions>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type NodeDataConnectionsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type NodeDataConnectionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<NodeDataConnectionsConnectionSort>>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};


export type NodeDataDocumentArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<DocumentViewOptions>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type NodeDataDocumentAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type NodeDataDocumentConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<NodeDataDocumentConnectionSort>>;
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};


export type NodeDataNavigationArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<QueryOptions>;
  where?: InputMaybe<ViewTypeWhere>;
};


export type NodeDataNavigationConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NodeDataNavigationConnectionWhere>;
};

export type NodeDataAggregateSelection = {
  __typename?: 'NodeDataAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type NodeDataBlockElementBlocksAggregationSelection = {
  __typename?: 'NodeDataBlockElementBlocksAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<NodeDataBlockElementBlocksNodeAggregateSelection>;
};

export type NodeDataBlockElementBlocksNodeAggregateSelection = {
  __typename?: 'NodeDataBlockElementBlocksNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
};

export type NodeDataBlocksAggregateInput = {
  AND?: InputMaybe<Array<NodeDataBlocksAggregateInput>>;
  OR?: InputMaybe<Array<NodeDataBlocksAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<NodeDataBlocksNodeAggregationWhereInput>;
};

export type NodeDataBlocksConnectFieldInput = {
  connect?: InputMaybe<Array<BlockElementConnectInput>>;
  where?: InputMaybe<BlockElementConnectWhere>;
};

export type NodeDataBlocksConnectOrCreateFieldInput = {
  onCreate: NodeDataBlocksConnectOrCreateFieldInputOnCreate;
  where: BlockElementConnectOrCreateWhere;
};

export type NodeDataBlocksConnectOrCreateFieldInputOnCreate = {
  node: BlockElementOnCreateInput;
};

export type NodeDataBlocksConnection = {
  __typename?: 'NodeDataBlocksConnection';
  edges: Array<NodeDataBlocksRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataBlocksConnectionSort = {
  node?: InputMaybe<BlockElementSort>;
};

export type NodeDataBlocksConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataBlocksConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataBlocksConnectionWhere>>;
  node?: InputMaybe<BlockElementWhere>;
  node_NOT?: InputMaybe<BlockElementWhere>;
};

export type NodeDataBlocksCreateFieldInput = {
  node: BlockElementCreateInput;
};

export type NodeDataBlocksDeleteFieldInput = {
  delete?: InputMaybe<BlockElementDeleteInput>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};

export type NodeDataBlocksDisconnectFieldInput = {
  disconnect?: InputMaybe<BlockElementDisconnectInput>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};

export type NodeDataBlocksFieldInput = {
  connect?: InputMaybe<Array<NodeDataBlocksConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataBlocksConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataBlocksCreateFieldInput>>;
};

export type NodeDataBlocksNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeDataBlocksNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NodeDataBlocksNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
};

export type NodeDataBlocksRelationship = {
  __typename?: 'NodeDataBlocksRelationship';
  cursor: Scalars['String'];
  node: BlockElement;
};

export type NodeDataBlocksUpdateConnectionInput = {
  node?: InputMaybe<BlockElementUpdateInput>;
};

export type NodeDataBlocksUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataBlocksConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataBlocksConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataBlocksCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataBlocksDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataBlocksDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataBlocksUpdateConnectionInput>;
  where?: InputMaybe<NodeDataBlocksConnectionWhere>;
};

export type NodeDataConnectInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksConnectFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsConnectFieldInput>>;
  document?: InputMaybe<NodeDataDocumentConnectFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationConnectInput>;
};

export type NodeDataConnectOrCreateInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksConnectOrCreateFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsConnectOrCreateFieldInput>>;
  document?: InputMaybe<NodeDataDocumentConnectOrCreateFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationConnectOrCreateInput>;
};

export type NodeDataConnectOrCreateWhere = {
  node: NodeDataUniqueWhere;
};

export type NodeDataConnectWhere = {
  node: NodeDataWhere;
};

export type NodeDataConnection = {
  __typename?: 'NodeDataConnection';
  edges: Array<NodeDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataConnectionElementConnectionsAggregationSelection = {
  __typename?: 'NodeDataConnectionElementConnectionsAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<NodeDataConnectionElementConnectionsNodeAggregateSelection>;
};

export type NodeDataConnectionElementConnectionsNodeAggregateSelection = {
  __typename?: 'NodeDataConnectionElementConnectionsNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
};

export type NodeDataConnectionsAggregateInput = {
  AND?: InputMaybe<Array<NodeDataConnectionsAggregateInput>>;
  OR?: InputMaybe<Array<NodeDataConnectionsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<NodeDataConnectionsNodeAggregationWhereInput>;
};

export type NodeDataConnectionsConnectFieldInput = {
  connect?: InputMaybe<Array<ConnectionElementConnectInput>>;
  where?: InputMaybe<ConnectionElementConnectWhere>;
};

export type NodeDataConnectionsConnectOrCreateFieldInput = {
  onCreate: NodeDataConnectionsConnectOrCreateFieldInputOnCreate;
  where: ConnectionElementConnectOrCreateWhere;
};

export type NodeDataConnectionsConnectOrCreateFieldInputOnCreate = {
  node: ConnectionElementOnCreateInput;
};

export type NodeDataConnectionsConnection = {
  __typename?: 'NodeDataConnectionsConnection';
  edges: Array<NodeDataConnectionsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataConnectionsConnectionSort = {
  node?: InputMaybe<ConnectionElementSort>;
};

export type NodeDataConnectionsConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataConnectionsConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataConnectionsConnectionWhere>>;
  node?: InputMaybe<ConnectionElementWhere>;
  node_NOT?: InputMaybe<ConnectionElementWhere>;
};

export type NodeDataConnectionsCreateFieldInput = {
  node: ConnectionElementCreateInput;
};

export type NodeDataConnectionsDeleteFieldInput = {
  delete?: InputMaybe<ConnectionElementDeleteInput>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};

export type NodeDataConnectionsDisconnectFieldInput = {
  disconnect?: InputMaybe<ConnectionElementDisconnectInput>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};

export type NodeDataConnectionsFieldInput = {
  connect?: InputMaybe<Array<NodeDataConnectionsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataConnectionsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataConnectionsCreateFieldInput>>;
};

export type NodeDataConnectionsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeDataConnectionsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NodeDataConnectionsNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
};

export type NodeDataConnectionsRelationship = {
  __typename?: 'NodeDataConnectionsRelationship';
  cursor: Scalars['String'];
  node: ConnectionElement;
};

export type NodeDataConnectionsUpdateConnectionInput = {
  node?: InputMaybe<ConnectionElementUpdateInput>;
};

export type NodeDataConnectionsUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataConnectionsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataConnectionsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataConnectionsCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataConnectionsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataConnectionsDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataConnectionsUpdateConnectionInput>;
  where?: InputMaybe<NodeDataConnectionsConnectionWhere>;
};

export type NodeDataCreateInput = {
  blocks?: InputMaybe<NodeDataBlocksFieldInput>;
  connections?: InputMaybe<NodeDataConnectionsFieldInput>;
  document?: InputMaybe<NodeDataDocumentFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationCreateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type NodeDataDeleteInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksDeleteFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsDeleteFieldInput>>;
  document?: InputMaybe<NodeDataDocumentDeleteFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationDeleteInput>;
};

export type NodeDataDisconnectInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksDisconnectFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsDisconnectFieldInput>>;
  document?: InputMaybe<NodeDataDocumentDisconnectFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationDisconnectInput>;
};

export type NodeDataDocumentAggregateInput = {
  AND?: InputMaybe<Array<NodeDataDocumentAggregateInput>>;
  OR?: InputMaybe<Array<NodeDataDocumentAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<NodeDataDocumentNodeAggregationWhereInput>;
};

export type NodeDataDocumentConnectFieldInput = {
  where?: InputMaybe<DocumentViewConnectWhere>;
};

export type NodeDataDocumentConnectOrCreateFieldInput = {
  onCreate: NodeDataDocumentConnectOrCreateFieldInputOnCreate;
  where: DocumentViewConnectOrCreateWhere;
};

export type NodeDataDocumentConnectOrCreateFieldInputOnCreate = {
  node: DocumentViewOnCreateInput;
};

export type NodeDataDocumentConnection = {
  __typename?: 'NodeDataDocumentConnection';
  edges: Array<NodeDataDocumentRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataDocumentConnectionSort = {
  node?: InputMaybe<DocumentViewSort>;
};

export type NodeDataDocumentConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataDocumentConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataDocumentConnectionWhere>>;
  node?: InputMaybe<DocumentViewWhere>;
  node_NOT?: InputMaybe<DocumentViewWhere>;
};

export type NodeDataDocumentCreateFieldInput = {
  node: DocumentViewCreateInput;
};

export type NodeDataDocumentDeleteFieldInput = {
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};

export type NodeDataDocumentDisconnectFieldInput = {
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};

export type NodeDataDocumentFieldInput = {
  connect?: InputMaybe<NodeDataDocumentConnectFieldInput>;
  connectOrCreate?: InputMaybe<NodeDataDocumentConnectOrCreateFieldInput>;
  create?: InputMaybe<NodeDataDocumentCreateFieldInput>;
};

export type NodeDataDocumentNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<NodeDataDocumentNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<NodeDataDocumentNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  node_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  node_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  node_EQUAL?: InputMaybe<Scalars['String']>;
  node_GT?: InputMaybe<Scalars['Int']>;
  node_GTE?: InputMaybe<Scalars['Int']>;
  node_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  node_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  node_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  node_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  node_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  node_LT?: InputMaybe<Scalars['Int']>;
  node_LTE?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  node_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type NodeDataDocumentRelationship = {
  __typename?: 'NodeDataDocumentRelationship';
  cursor: Scalars['String'];
  node: DocumentView;
};

export type NodeDataDocumentUpdateConnectionInput = {
  node?: InputMaybe<DocumentViewUpdateInput>;
};

export type NodeDataDocumentUpdateFieldInput = {
  connect?: InputMaybe<NodeDataDocumentConnectFieldInput>;
  connectOrCreate?: InputMaybe<NodeDataDocumentConnectOrCreateFieldInput>;
  create?: InputMaybe<NodeDataDocumentCreateFieldInput>;
  delete?: InputMaybe<NodeDataDocumentDeleteFieldInput>;
  disconnect?: InputMaybe<NodeDataDocumentDisconnectFieldInput>;
  update?: InputMaybe<NodeDataDocumentUpdateConnectionInput>;
  where?: InputMaybe<NodeDataDocumentConnectionWhere>;
};

export type NodeDataDocumentViewDocumentAggregationSelection = {
  __typename?: 'NodeDataDocumentViewDocumentAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<NodeDataDocumentViewDocumentNodeAggregateSelection>;
};

export type NodeDataDocumentViewDocumentNodeAggregateSelection = {
  __typename?: 'NodeDataDocumentViewDocumentNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
  node: StringAggregateSelectionNullable;
};

export type NodeDataEdge = {
  __typename?: 'NodeDataEdge';
  cursor: Scalars['String'];
  node: NodeData;
};

export type NodeDataNavigationConnectInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewConnectFieldInput>>;
};

export type NodeDataNavigationConnectOrCreateInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectOrCreateFieldInput>>;
};

export type NodeDataNavigationConnection = {
  __typename?: 'NodeDataNavigationConnection';
  edges: Array<NodeDataNavigationRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NodeDataNavigationConnectionWhere = {
  DocumentView?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
  GraphView?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationCreateFieldInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewCreateFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewCreateFieldInput>>;
};

export type NodeDataNavigationCreateInput = {
  DocumentView?: InputMaybe<NodeDataNavigationDocumentViewFieldInput>;
  GraphView?: InputMaybe<NodeDataNavigationGraphViewFieldInput>;
};

export type NodeDataNavigationDeleteInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewDeleteFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewDeleteFieldInput>>;
};

export type NodeDataNavigationDisconnectInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewDisconnectFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewDisconnectFieldInput>>;
};

export type NodeDataNavigationDocumentViewConnectFieldInput = {
  where?: InputMaybe<DocumentViewConnectWhere>;
};

export type NodeDataNavigationDocumentViewConnectOrCreateFieldInput = {
  onCreate: NodeDataNavigationDocumentViewConnectOrCreateFieldInputOnCreate;
  where: DocumentViewConnectOrCreateWhere;
};

export type NodeDataNavigationDocumentViewConnectOrCreateFieldInputOnCreate = {
  node: DocumentViewOnCreateInput;
};

export type NodeDataNavigationDocumentViewConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectionWhere>>;
  node?: InputMaybe<DocumentViewWhere>;
  node_NOT?: InputMaybe<DocumentViewWhere>;
};

export type NodeDataNavigationDocumentViewCreateFieldInput = {
  node: DocumentViewCreateInput;
};

export type NodeDataNavigationDocumentViewDeleteFieldInput = {
  where?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
};

export type NodeDataNavigationDocumentViewDisconnectFieldInput = {
  where?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
};

export type NodeDataNavigationDocumentViewFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationDocumentViewCreateFieldInput>>;
};

export type NodeDataNavigationDocumentViewUpdateConnectionInput = {
  node?: InputMaybe<DocumentViewUpdateInput>;
};

export type NodeDataNavigationDocumentViewUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<NodeDataNavigationDocumentViewConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationDocumentViewCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataNavigationDocumentViewDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataNavigationDocumentViewDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataNavigationDocumentViewUpdateConnectionInput>;
  where?: InputMaybe<NodeDataNavigationDocumentViewConnectionWhere>;
};

export type NodeDataNavigationGraphViewConnectFieldInput = {
  connect?: InputMaybe<Array<GraphViewConnectInput>>;
  where?: InputMaybe<GraphViewConnectWhere>;
};

export type NodeDataNavigationGraphViewConnectionWhere = {
  AND?: InputMaybe<Array<NodeDataNavigationGraphViewConnectionWhere>>;
  OR?: InputMaybe<Array<NodeDataNavigationGraphViewConnectionWhere>>;
  node?: InputMaybe<GraphViewWhere>;
  node_NOT?: InputMaybe<GraphViewWhere>;
};

export type NodeDataNavigationGraphViewCreateFieldInput = {
  node: GraphViewCreateInput;
};

export type NodeDataNavigationGraphViewDeleteFieldInput = {
  delete?: InputMaybe<GraphViewDeleteInput>;
  where?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationGraphViewDisconnectFieldInput = {
  disconnect?: InputMaybe<GraphViewDisconnectInput>;
  where?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationGraphViewFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationGraphViewConnectFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationGraphViewCreateFieldInput>>;
};

export type NodeDataNavigationGraphViewUpdateConnectionInput = {
  node?: InputMaybe<GraphViewUpdateInput>;
};

export type NodeDataNavigationGraphViewUpdateFieldInput = {
  connect?: InputMaybe<Array<NodeDataNavigationGraphViewConnectFieldInput>>;
  create?: InputMaybe<Array<NodeDataNavigationGraphViewCreateFieldInput>>;
  delete?: InputMaybe<Array<NodeDataNavigationGraphViewDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<NodeDataNavigationGraphViewDisconnectFieldInput>>;
  update?: InputMaybe<NodeDataNavigationGraphViewUpdateConnectionInput>;
  where?: InputMaybe<NodeDataNavigationGraphViewConnectionWhere>;
};

export type NodeDataNavigationRelationship = {
  __typename?: 'NodeDataNavigationRelationship';
  cursor: Scalars['String'];
  node: ViewType;
};

export type NodeDataNavigationUpdateInput = {
  DocumentView?: InputMaybe<Array<NodeDataNavigationDocumentViewUpdateFieldInput>>;
  GraphView?: InputMaybe<Array<NodeDataNavigationGraphViewUpdateFieldInput>>;
};

export type NodeDataOnCreateInput = {
  title?: InputMaybe<Scalars['String']>;
};

export type NodeDataOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more NodeDataSort objects to sort NodeData by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<NodeDataSort>>;
};

export type NodeDataRelationInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksCreateFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsCreateFieldInput>>;
  document?: InputMaybe<NodeDataDocumentCreateFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationCreateFieldInput>;
};

/** Fields to sort NodeData by. The order in which sorts are applied is not guaranteed when specifying many fields in one NodeDataSort object. */
export type NodeDataSort = {
  id?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
};

export type NodeDataUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type NodeDataUpdateInput = {
  blocks?: InputMaybe<Array<NodeDataBlocksUpdateFieldInput>>;
  connections?: InputMaybe<Array<NodeDataConnectionsUpdateFieldInput>>;
  document?: InputMaybe<NodeDataDocumentUpdateFieldInput>;
  navigation?: InputMaybe<NodeDataNavigationUpdateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type NodeDataWhere = {
  AND?: InputMaybe<Array<NodeDataWhere>>;
  OR?: InputMaybe<Array<NodeDataWhere>>;
  blocksAggregate?: InputMaybe<NodeDataBlocksAggregateInput>;
  blocksConnection_ALL?: InputMaybe<NodeDataBlocksConnectionWhere>;
  blocksConnection_NONE?: InputMaybe<NodeDataBlocksConnectionWhere>;
  blocksConnection_SINGLE?: InputMaybe<NodeDataBlocksConnectionWhere>;
  blocksConnection_SOME?: InputMaybe<NodeDataBlocksConnectionWhere>;
  /** Return NodeData where all of the related BlockElements match this filter */
  blocks_ALL?: InputMaybe<BlockElementWhere>;
  /** Return NodeData where none of the related BlockElements match this filter */
  blocks_NONE?: InputMaybe<BlockElementWhere>;
  /** Return NodeData where one of the related BlockElements match this filter */
  blocks_SINGLE?: InputMaybe<BlockElementWhere>;
  /** Return NodeData where some of the related BlockElements match this filter */
  blocks_SOME?: InputMaybe<BlockElementWhere>;
  connectionsAggregate?: InputMaybe<NodeDataConnectionsAggregateInput>;
  connectionsConnection_ALL?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  connectionsConnection_NONE?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  connectionsConnection_SINGLE?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  connectionsConnection_SOME?: InputMaybe<NodeDataConnectionsConnectionWhere>;
  /** Return NodeData where all of the related ConnectionElements match this filter */
  connections_ALL?: InputMaybe<ConnectionElementWhere>;
  /** Return NodeData where none of the related ConnectionElements match this filter */
  connections_NONE?: InputMaybe<ConnectionElementWhere>;
  /** Return NodeData where one of the related ConnectionElements match this filter */
  connections_SINGLE?: InputMaybe<ConnectionElementWhere>;
  /** Return NodeData where some of the related ConnectionElements match this filter */
  connections_SOME?: InputMaybe<ConnectionElementWhere>;
  document?: InputMaybe<DocumentViewWhere>;
  documentAggregate?: InputMaybe<NodeDataDocumentAggregateInput>;
  documentConnection?: InputMaybe<NodeDataDocumentConnectionWhere>;
  documentConnection_NOT?: InputMaybe<NodeDataDocumentConnectionWhere>;
  document_NOT?: InputMaybe<DocumentViewWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  navigationConnection_ALL?: InputMaybe<NodeDataNavigationConnectionWhere>;
  navigationConnection_NONE?: InputMaybe<NodeDataNavigationConnectionWhere>;
  navigationConnection_SINGLE?: InputMaybe<NodeDataNavigationConnectionWhere>;
  navigationConnection_SOME?: InputMaybe<NodeDataNavigationConnectionWhere>;
  title?: InputMaybe<Scalars['String']>;
  title_CONTAINS?: InputMaybe<Scalars['String']>;
  title_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT?: InputMaybe<Scalars['String']>;
  title_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  title_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  title_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  title_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  blockElements: Array<BlockElement>;
  blockElementsAggregate: BlockElementAggregateSelection;
  blockElementsConnection: BlockElementsConnection;
  blocks: Array<Block>;
  blocksAggregate: BlockAggregateSelection;
  blocksConnection: BlocksConnection;
  connectionData: Array<ConnectionData>;
  connectionDataAggregate: ConnectionDataAggregateSelection;
  connectionDataConnection: ConnectionDataConnection;
  connectionElements: Array<ConnectionElement>;
  connectionElementsAggregate: ConnectionElementAggregateSelection;
  connectionElementsConnection: ConnectionElementsConnection;
  customTexts: Array<CustomText>;
  customTextsAggregate: CustomTextAggregateSelection;
  customTextsConnection: CustomTextsConnection;
  documentViews: Array<DocumentView>;
  documentViewsAggregate: DocumentViewAggregateSelection;
  documentViewsConnection: DocumentViewsConnection;
  graphNodes: Array<GraphNode>;
  graphNodesAggregate: GraphNodeAggregateSelection;
  graphNodesConnection: GraphNodesConnection;
  graphViewElements: Array<GraphViewElement>;
  graphViewElementsAggregate: GraphViewElementAggregateSelection;
  graphViewElementsConnection: GraphViewElementsConnection;
  graphViews: Array<GraphView>;
  graphViewsAggregate: GraphViewAggregateSelection;
  graphViewsConnection: GraphViewsConnection;
  nodeData: Array<NodeData>;
  nodeDataAggregate: NodeDataAggregateSelection;
  nodeDataConnection: NodeDataConnection;
  userMetadata: Array<UserMetadata>;
  userMetadataAggregate: UserMetadataAggregateSelection;
  userMetadataConnection: UserMetadataConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
};


export type QueryBlockElementsArgs = {
  options?: InputMaybe<BlockElementOptions>;
  where?: InputMaybe<BlockElementWhere>;
};


export type QueryBlockElementsAggregateArgs = {
  where?: InputMaybe<BlockElementWhere>;
};


export type QueryBlockElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<BlockElementSort>>>;
  where?: InputMaybe<BlockElementWhere>;
};


export type QueryBlocksArgs = {
  options?: InputMaybe<BlockOptions>;
  where?: InputMaybe<BlockWhere>;
};


export type QueryBlocksAggregateArgs = {
  where?: InputMaybe<BlockWhere>;
};


export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<BlockSort>>>;
  where?: InputMaybe<BlockWhere>;
};


export type QueryConnectionDataArgs = {
  options?: InputMaybe<ConnectionDataOptions>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type QueryConnectionDataAggregateArgs = {
  where?: InputMaybe<ConnectionDataWhere>;
};


export type QueryConnectionDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<ConnectionDataSort>>>;
  where?: InputMaybe<ConnectionDataWhere>;
};


export type QueryConnectionElementsArgs = {
  options?: InputMaybe<ConnectionElementOptions>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type QueryConnectionElementsAggregateArgs = {
  where?: InputMaybe<ConnectionElementWhere>;
};


export type QueryConnectionElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<ConnectionElementSort>>>;
  where?: InputMaybe<ConnectionElementWhere>;
};


export type QueryCustomTextsArgs = {
  options?: InputMaybe<CustomTextOptions>;
  where?: InputMaybe<CustomTextWhere>;
};


export type QueryCustomTextsAggregateArgs = {
  where?: InputMaybe<CustomTextWhere>;
};


export type QueryCustomTextsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<CustomTextSort>>>;
  where?: InputMaybe<CustomTextWhere>;
};


export type QueryDocumentViewsArgs = {
  options?: InputMaybe<DocumentViewOptions>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type QueryDocumentViewsAggregateArgs = {
  where?: InputMaybe<DocumentViewWhere>;
};


export type QueryDocumentViewsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<DocumentViewSort>>>;
  where?: InputMaybe<DocumentViewWhere>;
};


export type QueryGraphNodesArgs = {
  options?: InputMaybe<GraphNodeOptions>;
  where?: InputMaybe<GraphNodeWhere>;
};


export type QueryGraphNodesAggregateArgs = {
  where?: InputMaybe<GraphNodeWhere>;
};


export type QueryGraphNodesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GraphNodeSort>>>;
  where?: InputMaybe<GraphNodeWhere>;
};


export type QueryGraphViewElementsArgs = {
  options?: InputMaybe<GraphViewElementOptions>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type QueryGraphViewElementsAggregateArgs = {
  where?: InputMaybe<GraphViewElementWhere>;
};


export type QueryGraphViewElementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GraphViewElementSort>>>;
  where?: InputMaybe<GraphViewElementWhere>;
};


export type QueryGraphViewsArgs = {
  options?: InputMaybe<GraphViewOptions>;
  where?: InputMaybe<GraphViewWhere>;
};


export type QueryGraphViewsAggregateArgs = {
  where?: InputMaybe<GraphViewWhere>;
};


export type QueryGraphViewsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GraphViewSort>>>;
  where?: InputMaybe<GraphViewWhere>;
};


export type QueryNodeDataArgs = {
  options?: InputMaybe<NodeDataOptions>;
  where?: InputMaybe<NodeDataWhere>;
};


export type QueryNodeDataAggregateArgs = {
  where?: InputMaybe<NodeDataWhere>;
};


export type QueryNodeDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<NodeDataSort>>>;
  where?: InputMaybe<NodeDataWhere>;
};


export type QueryUserMetadataArgs = {
  options?: InputMaybe<UserMetadataOptions>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type QueryUserMetadataAggregateArgs = {
  where?: InputMaybe<UserMetadataWhere>;
};


export type QueryUserMetadataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<UserMetadataSort>>>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  where?: InputMaybe<UserWhere>;
};

export type QueryOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type StringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable';
  longest?: Maybe<Scalars['String']>;
  shortest?: Maybe<Scalars['String']>;
};

export type UpdateBlockElementsMutationResponse = {
  __typename?: 'UpdateBlockElementsMutationResponse';
  blockElements: Array<BlockElement>;
  info: UpdateInfo;
};

export type UpdateBlocksMutationResponse = {
  __typename?: 'UpdateBlocksMutationResponse';
  blocks: Array<Block>;
  info: UpdateInfo;
};

export type UpdateConnectionDataMutationResponse = {
  __typename?: 'UpdateConnectionDataMutationResponse';
  connectionData: Array<ConnectionData>;
  info: UpdateInfo;
};

export type UpdateConnectionElementsMutationResponse = {
  __typename?: 'UpdateConnectionElementsMutationResponse';
  connectionElements: Array<ConnectionElement>;
  info: UpdateInfo;
};

export type UpdateCustomTextsMutationResponse = {
  __typename?: 'UpdateCustomTextsMutationResponse';
  customTexts: Array<CustomText>;
  info: UpdateInfo;
};

export type UpdateDocumentViewsMutationResponse = {
  __typename?: 'UpdateDocumentViewsMutationResponse';
  documentViews: Array<DocumentView>;
  info: UpdateInfo;
};

export type UpdateGraphNodesMutationResponse = {
  __typename?: 'UpdateGraphNodesMutationResponse';
  graphNodes: Array<GraphNode>;
  info: UpdateInfo;
};

export type UpdateGraphViewElementsMutationResponse = {
  __typename?: 'UpdateGraphViewElementsMutationResponse';
  graphViewElements: Array<GraphViewElement>;
  info: UpdateInfo;
};

export type UpdateGraphViewsMutationResponse = {
  __typename?: 'UpdateGraphViewsMutationResponse';
  graphViews: Array<GraphView>;
  info: UpdateInfo;
};

export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  nodesDeleted: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type UpdateNodeDataMutationResponse = {
  __typename?: 'UpdateNodeDataMutationResponse';
  info: UpdateInfo;
  nodeData: Array<NodeData>;
};

export type UpdateUserMetadataMutationResponse = {
  __typename?: 'UpdateUserMetadataMutationResponse';
  info: UpdateInfo;
  userMetadata: Array<UserMetadata>;
};

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse';
  info: UpdateInfo;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  home_node?: Maybe<NodeData>;
  home_nodeAggregate?: Maybe<UserNodeDataHome_NodeAggregationSelection>;
  home_nodeConnection: UserHome_NodeConnection;
  homeless_node?: Maybe<NodeData>;
  homeless_nodeAggregate?: Maybe<UserNodeDataHomeless_NodeAggregationSelection>;
  homeless_nodeConnection: UserHomeless_NodeConnection;
  id: Scalars['ID'];
  metadata?: Maybe<UserMetadata>;
  metadataAggregate?: Maybe<UserUserMetadataMetadataAggregationSelection>;
  metadataConnection: UserMetadataConnection;
};


export type UserHome_NodeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<NodeDataOptions>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHome_NodeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHome_NodeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserHome_NodeConnectionSort>>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};


export type UserHomeless_NodeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<NodeDataOptions>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHomeless_NodeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<NodeDataWhere>;
};


export type UserHomeless_NodeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserHomeless_NodeConnectionSort>>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};


export type UserMetadataArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserMetadataOptions>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type UserMetadataAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserMetadataWhere>;
};


export type UserMetadataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserMetadataConnectionSort>>;
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  count: Scalars['Int'];
  id: IdAggregateSelectionNonNullable;
};

export type UserConnectInput = {
  home_node?: InputMaybe<UserHome_NodeConnectFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeConnectFieldInput>;
  metadata?: InputMaybe<UserMetadataConnectFieldInput>;
};

export type UserConnectOrCreateInput = {
  home_node?: InputMaybe<UserHome_NodeConnectOrCreateFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeConnectOrCreateFieldInput>;
  metadata?: InputMaybe<UserMetadataConnectOrCreateFieldInput>;
};

export type UserCreateInput = {
  home_node?: InputMaybe<UserHome_NodeFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeFieldInput>;
  metadata?: InputMaybe<UserMetadataFieldInput>;
};

export type UserDeleteInput = {
  home_node?: InputMaybe<UserHome_NodeDeleteFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeDeleteFieldInput>;
  metadata?: InputMaybe<UserMetadataDeleteFieldInput>;
};

export type UserDisconnectInput = {
  home_node?: InputMaybe<UserHome_NodeDisconnectFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeDisconnectFieldInput>;
  metadata?: InputMaybe<UserMetadataDisconnectFieldInput>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserHome_NodeAggregateInput = {
  AND?: InputMaybe<Array<UserHome_NodeAggregateInput>>;
  OR?: InputMaybe<Array<UserHome_NodeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserHome_NodeNodeAggregationWhereInput>;
};

export type UserHome_NodeConnectFieldInput = {
  connect?: InputMaybe<NodeDataConnectInput>;
  where?: InputMaybe<NodeDataConnectWhere>;
};

export type UserHome_NodeConnectOrCreateFieldInput = {
  onCreate: UserHome_NodeConnectOrCreateFieldInputOnCreate;
  where: NodeDataConnectOrCreateWhere;
};

export type UserHome_NodeConnectOrCreateFieldInputOnCreate = {
  node: NodeDataOnCreateInput;
};

export type UserHome_NodeConnection = {
  __typename?: 'UserHome_nodeConnection';
  edges: Array<UserHome_NodeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserHome_NodeConnectionSort = {
  node?: InputMaybe<NodeDataSort>;
};

export type UserHome_NodeConnectionWhere = {
  AND?: InputMaybe<Array<UserHome_NodeConnectionWhere>>;
  OR?: InputMaybe<Array<UserHome_NodeConnectionWhere>>;
  node?: InputMaybe<NodeDataWhere>;
  node_NOT?: InputMaybe<NodeDataWhere>;
};

export type UserHome_NodeCreateFieldInput = {
  node: NodeDataCreateInput;
};

export type UserHome_NodeDeleteFieldInput = {
  delete?: InputMaybe<NodeDataDeleteInput>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};

export type UserHome_NodeDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeDataDisconnectInput>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};

export type UserHome_NodeFieldInput = {
  connect?: InputMaybe<UserHome_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHome_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHome_NodeCreateFieldInput>;
};

export type UserHome_NodeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserHome_NodeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserHome_NodeNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  title_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  title_EQUAL?: InputMaybe<Scalars['String']>;
  title_GT?: InputMaybe<Scalars['Int']>;
  title_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  title_LT?: InputMaybe<Scalars['Int']>;
  title_LTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserHome_NodeRelationship = {
  __typename?: 'UserHome_nodeRelationship';
  cursor: Scalars['String'];
  node: NodeData;
};

export type UserHome_NodeUpdateConnectionInput = {
  node?: InputMaybe<NodeDataUpdateInput>;
};

export type UserHome_NodeUpdateFieldInput = {
  connect?: InputMaybe<UserHome_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHome_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHome_NodeCreateFieldInput>;
  delete?: InputMaybe<UserHome_NodeDeleteFieldInput>;
  disconnect?: InputMaybe<UserHome_NodeDisconnectFieldInput>;
  update?: InputMaybe<UserHome_NodeUpdateConnectionInput>;
  where?: InputMaybe<UserHome_NodeConnectionWhere>;
};

export type UserHomeless_NodeAggregateInput = {
  AND?: InputMaybe<Array<UserHomeless_NodeAggregateInput>>;
  OR?: InputMaybe<Array<UserHomeless_NodeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserHomeless_NodeNodeAggregationWhereInput>;
};

export type UserHomeless_NodeConnectFieldInput = {
  connect?: InputMaybe<NodeDataConnectInput>;
  where?: InputMaybe<NodeDataConnectWhere>;
};

export type UserHomeless_NodeConnectOrCreateFieldInput = {
  onCreate: UserHomeless_NodeConnectOrCreateFieldInputOnCreate;
  where: NodeDataConnectOrCreateWhere;
};

export type UserHomeless_NodeConnectOrCreateFieldInputOnCreate = {
  node: NodeDataOnCreateInput;
};

export type UserHomeless_NodeConnection = {
  __typename?: 'UserHomeless_nodeConnection';
  edges: Array<UserHomeless_NodeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserHomeless_NodeConnectionSort = {
  node?: InputMaybe<NodeDataSort>;
};

export type UserHomeless_NodeConnectionWhere = {
  AND?: InputMaybe<Array<UserHomeless_NodeConnectionWhere>>;
  OR?: InputMaybe<Array<UserHomeless_NodeConnectionWhere>>;
  node?: InputMaybe<NodeDataWhere>;
  node_NOT?: InputMaybe<NodeDataWhere>;
};

export type UserHomeless_NodeCreateFieldInput = {
  node: NodeDataCreateInput;
};

export type UserHomeless_NodeDeleteFieldInput = {
  delete?: InputMaybe<NodeDataDeleteInput>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};

export type UserHomeless_NodeDisconnectFieldInput = {
  disconnect?: InputMaybe<NodeDataDisconnectInput>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};

export type UserHomeless_NodeFieldInput = {
  connect?: InputMaybe<UserHomeless_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHomeless_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHomeless_NodeCreateFieldInput>;
};

export type UserHomeless_NodeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserHomeless_NodeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserHomeless_NodeNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  title_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  title_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  title_EQUAL?: InputMaybe<Scalars['String']>;
  title_GT?: InputMaybe<Scalars['Int']>;
  title_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  title_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  title_LT?: InputMaybe<Scalars['Int']>;
  title_LTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  title_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserHomeless_NodeRelationship = {
  __typename?: 'UserHomeless_nodeRelationship';
  cursor: Scalars['String'];
  node: NodeData;
};

export type UserHomeless_NodeUpdateConnectionInput = {
  node?: InputMaybe<NodeDataUpdateInput>;
};

export type UserHomeless_NodeUpdateFieldInput = {
  connect?: InputMaybe<UserHomeless_NodeConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserHomeless_NodeConnectOrCreateFieldInput>;
  create?: InputMaybe<UserHomeless_NodeCreateFieldInput>;
  delete?: InputMaybe<UserHomeless_NodeDeleteFieldInput>;
  disconnect?: InputMaybe<UserHomeless_NodeDisconnectFieldInput>;
  update?: InputMaybe<UserHomeless_NodeUpdateConnectionInput>;
  where?: InputMaybe<UserHomeless_NodeConnectionWhere>;
};

export type UserMetadata = {
  __typename?: 'UserMetadata';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UserMetadataAggregateInput = {
  AND?: InputMaybe<Array<UserMetadataAggregateInput>>;
  OR?: InputMaybe<Array<UserMetadataAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserMetadataNodeAggregationWhereInput>;
};

export type UserMetadataAggregateSelection = {
  __typename?: 'UserMetadataAggregateSelection';
  count: Scalars['Int'];
  email: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
};

export type UserMetadataConnectFieldInput = {
  where?: InputMaybe<UserMetadataConnectWhere>;
};

export type UserMetadataConnectOrCreateFieldInput = {
  onCreate: UserMetadataConnectOrCreateFieldInputOnCreate;
  where: UserMetadataConnectOrCreateWhere;
};

export type UserMetadataConnectOrCreateFieldInputOnCreate = {
  node: UserMetadataOnCreateInput;
};

export type UserMetadataConnectOrCreateWhere = {
  node: UserMetadataUniqueWhere;
};

export type UserMetadataConnectWhere = {
  node: UserMetadataWhere;
};

export type UserMetadataConnection = {
  __typename?: 'UserMetadataConnection';
  edges: Array<UserMetadataRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserMetadataConnectionSort = {
  node?: InputMaybe<UserMetadataSort>;
};

export type UserMetadataConnectionWhere = {
  AND?: InputMaybe<Array<UserMetadataConnectionWhere>>;
  OR?: InputMaybe<Array<UserMetadataConnectionWhere>>;
  node?: InputMaybe<UserMetadataWhere>;
  node_NOT?: InputMaybe<UserMetadataWhere>;
};

export type UserMetadataCreateFieldInput = {
  node: UserMetadataCreateInput;
};

export type UserMetadataCreateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserMetadataDeleteFieldInput = {
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserMetadataDisconnectFieldInput = {
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserMetadataEdge = {
  __typename?: 'UserMetadataEdge';
  cursor: Scalars['String'];
  node: UserMetadata;
};

export type UserMetadataFieldInput = {
  connect?: InputMaybe<UserMetadataConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserMetadataConnectOrCreateFieldInput>;
  create?: InputMaybe<UserMetadataCreateFieldInput>;
};

export type UserMetadataNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserMetadataNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserMetadataNodeAggregationWhereInput>>;
  email_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  email_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  email_EQUAL?: InputMaybe<Scalars['String']>;
  email_GT?: InputMaybe<Scalars['Int']>;
  email_GTE?: InputMaybe<Scalars['Int']>;
  email_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  email_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  email_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  email_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  email_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  email_LT?: InputMaybe<Scalars['Int']>;
  email_LTE?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  email_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  id_EQUAL?: InputMaybe<Scalars['ID']>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserMetadataOnCreateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserMetadataOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserMetadataSort objects to sort UserMetadata by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserMetadataSort>>;
};

export type UserMetadataRelationship = {
  __typename?: 'UserMetadataRelationship';
  cursor: Scalars['String'];
  node: UserMetadata;
};

/** Fields to sort UserMetadata by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserMetadataSort object. */
export type UserMetadataSort = {
  email?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type UserMetadataUniqueWhere = {
  id?: InputMaybe<Scalars['ID']>;
};

export type UserMetadataUpdateConnectionInput = {
  node?: InputMaybe<UserMetadataUpdateInput>;
};

export type UserMetadataUpdateFieldInput = {
  connect?: InputMaybe<UserMetadataConnectFieldInput>;
  connectOrCreate?: InputMaybe<UserMetadataConnectOrCreateFieldInput>;
  create?: InputMaybe<UserMetadataCreateFieldInput>;
  delete?: InputMaybe<UserMetadataDeleteFieldInput>;
  disconnect?: InputMaybe<UserMetadataDisconnectFieldInput>;
  update?: InputMaybe<UserMetadataUpdateConnectionInput>;
  where?: InputMaybe<UserMetadataConnectionWhere>;
};

export type UserMetadataUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserMetadataWhere = {
  AND?: InputMaybe<Array<UserMetadataWhere>>;
  OR?: InputMaybe<Array<UserMetadataWhere>>;
  email?: InputMaybe<Scalars['String']>;
  email_CONTAINS?: InputMaybe<Scalars['String']>;
  email_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email_NOT?: InputMaybe<Scalars['String']>;
  email_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  email_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  email_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type UserNodeDataHome_NodeAggregationSelection = {
  __typename?: 'UserNodeDataHome_nodeAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserNodeDataHome_NodeNodeAggregateSelection>;
};

export type UserNodeDataHome_NodeNodeAggregateSelection = {
  __typename?: 'UserNodeDataHome_nodeNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type UserNodeDataHomeless_NodeAggregationSelection = {
  __typename?: 'UserNodeDataHomeless_nodeAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserNodeDataHomeless_NodeNodeAggregateSelection>;
};

export type UserNodeDataHomeless_NodeNodeAggregateSelection = {
  __typename?: 'UserNodeDataHomeless_nodeNodeAggregateSelection';
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNullable;
};

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

export type UserRelationInput = {
  home_node?: InputMaybe<UserHome_NodeCreateFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeCreateFieldInput>;
  metadata?: InputMaybe<UserMetadataCreateFieldInput>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  id?: InputMaybe<SortDirection>;
};

export type UserUpdateInput = {
  home_node?: InputMaybe<UserHome_NodeUpdateFieldInput>;
  homeless_node?: InputMaybe<UserHomeless_NodeUpdateFieldInput>;
  metadata?: InputMaybe<UserMetadataUpdateFieldInput>;
};

export type UserUserMetadataMetadataAggregationSelection = {
  __typename?: 'UserUserMetadataMetadataAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserUserMetadataMetadataNodeAggregateSelection>;
};

export type UserUserMetadataMetadataNodeAggregateSelection = {
  __typename?: 'UserUserMetadataMetadataNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  id: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNullable;
};

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>;
  OR?: InputMaybe<Array<UserWhere>>;
  home_node?: InputMaybe<NodeDataWhere>;
  home_nodeAggregate?: InputMaybe<UserHome_NodeAggregateInput>;
  home_nodeConnection?: InputMaybe<UserHome_NodeConnectionWhere>;
  home_nodeConnection_NOT?: InputMaybe<UserHome_NodeConnectionWhere>;
  home_node_NOT?: InputMaybe<NodeDataWhere>;
  homeless_node?: InputMaybe<NodeDataWhere>;
  homeless_nodeAggregate?: InputMaybe<UserHomeless_NodeAggregateInput>;
  homeless_nodeConnection?: InputMaybe<UserHomeless_NodeConnectionWhere>;
  homeless_nodeConnection_NOT?: InputMaybe<UserHomeless_NodeConnectionWhere>;
  homeless_node_NOT?: InputMaybe<NodeDataWhere>;
  id?: InputMaybe<Scalars['ID']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT?: InputMaybe<Scalars['ID']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  metadata?: InputMaybe<UserMetadataWhere>;
  metadataAggregate?: InputMaybe<UserMetadataAggregateInput>;
  metadataConnection?: InputMaybe<UserMetadataConnectionWhere>;
  metadataConnection_NOT?: InputMaybe<UserMetadataConnectionWhere>;
  metadata_NOT?: InputMaybe<UserMetadataWhere>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ViewType = DocumentView | GraphView;

export type ViewTypeWhere = {
  DocumentView?: InputMaybe<DocumentViewWhere>;
  GraphView?: InputMaybe<GraphViewWhere>;
};
