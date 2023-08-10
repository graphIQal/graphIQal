//Node with just its title

import { useContext, useRef, useState } from 'react';
import { v4 } from 'uuid';
import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODELINK,
	MyTitleElement,
} from '../../packages/editor/plateTypes';
import GraphNodeContext, {
	GraphNodeContextInterface,
} from '../../packages/graph/context/GraphNodeContext';
import { useGraphViewData } from '../../packages/graph/context/GraphViewContext';
import { ItemProps } from './Dropdown';
import EditorComponent from '../../packages/editor/EditorComponent';
import { Block } from '../../packages/editor/Elements/Elements';
import { createNormalizeTypesPlugin } from '@udecode/plate';

const DocumentGraphNode: React.FC<{
	toggleDropdown: () => void;
	showSearchDropdown: boolean;
	setShowSearchDropdown: (val: boolean) => void;
	setResults: (val: ItemProps[]) => void;
}> = ({
	toggleDropdown,
	showSearchDropdown,
	setShowSearchDropdown,
	setResults,
}) => {
	const { title, id, icon, node_data } = useContext(
		GraphNodeContext
	) as GraphNodeContextInterface;

	// const { nodeData_Graph, nodeVisualData_Graph, addAction } =
	// 	useGraphViewData();
	// const { changeNodeData_Graph, changeVisualData_Graph, changeAlert } =
	// 	useGraphViewAPI();
	// const formRef = useRef<any>(null);

	const [document, setdocument] = useState([]);

	console.log('node_data ', node_data);

	if ('title' in node_data && !node_data.document) {
		node_data.document = `
		[
			{
				"type": "block",
				"id": "${v4()}",
				"children": [
					{ "type": "p", "id": "${v4()}", "children": [{ "text": "" }] }
				]
			}
		]`;
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
				<div className='flex flex-row gap-x-3 w-full h-fit items-center overflow-y-scroll '>
					{node_data.document && (
						<EditorComponent
							key={id}
							id={'graph_' + id}
							initialValue={[
								{
									type: 'title',
									id: 'Node Title',
									children: [{ text: node_data.title }],
								} as MyTitleElement,
								...createInitialValue(node_data.document),
							]}
							value={document}
							setValue={setdocument}
							save={async (params) => {
								// const newData = {
								// 	connectedNodes:
								// 		nodeDataSWR.connectedNodes,
								// 	n: {
								// 		...nodeDataSWR.n,
								// 		title: params.title,
								// 		document: JSON.stringify(
								// 			params.document.slice(1)
								// 		),
								// 	},
								// };
								// await SWRmutateCurrNode(
								// 	saveDocument(params),
								// 	{
								// 		optimisticData: newData,
								// 		populateCache: false,
								// 	}
								// );
							}}
							blockElement={Block}
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
