//Node with just its title

import { useContext, useRef, useState } from 'react';
import { v4 } from 'uuid';
import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
	ELEMENT_TITLE,
	MyTitleElement,
	defaultDocument,
} from '../../packages/editor/plateTypes';
import GraphNodeContext, {
	GraphNodeContextInterface,
} from '../../packages/graph/context/GraphNodeContext';
import { useGraphViewData } from '../../packages/graph/context/GraphViewContext';
import { ItemProps } from './Dropdown';
import EditorComponent from '../../packages/editor/EditorComponent';
import { Block } from '../../packages/editor/Elements/Elements';
import { createNormalizeTypesPlugin } from '@udecode/plate';
import { withDraggable } from '../../packages/dnd-editor/components/withDraggable';
import { TitleElementGraph } from '../../packages/graph/graphEditor/GraphElements';
import { saveDocument } from '@/backend/functions/general/document/mutate/saveDocument';
import useSWR from 'swr';
import { fetcherSingleReturn } from '@/backend/driver/fetcher';

const DocumentGraphNode: React.FC<{}> = ({}) => {
	const { id, icon } = useContext(
		GraphNodeContext
	) as GraphNodeContextInterface;

	const [document, setdocument] = useState([]);

	let {
		data: nodeDataSWR,
		isLoading,
		error,
		mutate: SWRmutateCurrNode,
	} = useSWR(id ? `/api/username/${id}` : null, fetcherSingleReturn, {
		revalidateOnMount: true,
		revalidateOnFocus: true,
	});

	// I need to mutate new nodes w/ a default document or smth.

	if (isLoading) {
		return <div></div>;
	}

	if (!nodeDataSWR) {
		// console.log('noNodeDataSWR ', nodeDataSWR);
		nodeDataSWR = {
			n: { icon: 'node', title: 'Untitled', color: 'black' },
			connectedNodes: [],
		};
	}

	if ('title' in nodeDataSWR.n && !nodeDataSWR.n.document) {
		// console.log('noDocument ', nodeDataSWR);
		nodeDataSWR.n.document = defaultDocument;
	}

	const createInitialValue = (content: string) => {
		const value = JSON.parse(content);

		function traverse(obj: BlockElements[]) {
			if (typeof obj !== 'object' || obj === null) return;

			Object.entries(obj).forEach(([key, value]) => {
				// Key is either an array index or object key
				if (value.type === ELEMENT_NODELINK) {
					value.children = [
						{
							text: 'Untitled',
						},
					];
				} else if (value.type === ELEMENT_BLOCK) {
					traverse(value.children as BlockElements[]);
				} else if (value.type === ELEMENT_NODE) {
				}
			});
		}

		traverse(value);

		return value;
	};

	return (
		<>
			<div
				className={'w-full h-full flex justify-items-stretch flex-row '}
			>
				<div className='flex flex-row gap-x-3 w-full h-fit items-center overflow-y-scroll ml-2'>
					{nodeDataSWR.n.document && (
						<EditorComponent
							key={id}
							id={'graph_' + id}
							initialValue={[
								{
									type: 'title',
									id: 'Node Title',
									children: [{ text: nodeDataSWR.n.title }],
								} as MyTitleElement,
								...createInitialValue(nodeDataSWR.n.document),
							]}
							value={document}
							setValue={setdocument}
							save={async (params) => {
								const newData = {
									connectedNodes: nodeDataSWR.connectedNodes,
									n: {
										...nodeDataSWR.n,
										title: params.title,
										document: JSON.stringify(
											params.document.slice(1)
										),
									},
								};
								const realParams = {
									...params,
									nodeId: id,
								};
								await SWRmutateCurrNode(
									saveDocument(realParams),
									{
										optimisticData: newData,
										populateCache: false,
									}
								);
							}}
							customElements={{
								[ELEMENT_BLOCK]: withDraggable(Block),
								[ELEMENT_TITLE]: TitleElementGraph,
							}}
							customPlugins={[
								createNormalizeTypesPlugin({
									options: {
										rules: [
											{
												path: [0],
												strictType: 'title',
											},
										],
									},
								}),
							]}
							showCutText={false}
						/>
					)}
				</div>
			</div>
		</>
	);
};
export default DocumentGraphNode;
