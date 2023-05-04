import {
	GraphNodeData,
	NodeData,
} from '../../schemas/Data_structures/DS_schema';

export const cypherToJson_graphView = () => {};

type graphViewInput = {
	graphViewData: { [key: string]: GraphNodeData };
	nodeData: { [key: string]: NodeData };
};
export const jsonToCypher_graphView = ({
	graphViewData,
	nodeData,
}: graphViewInput) => {
	console.log(graphViewData);
	console.log(nodeData);
};
