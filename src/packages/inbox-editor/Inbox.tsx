import { fetcher } from '@/backend/driver/fetcher';
import { useViewData } from '@/components/context/ViewContext';
import { useState } from 'react';
import useSWR from 'swr';
import { withDraggable } from '../dnd-editor/components/withDraggable';
import EditorComponent from '../editor/EditorComponent';
import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
} from '../editor/plateTypes';
// import { InboxBlock } from './InboxBlock/InboxBlock';
import { InboxNode } from '../editor/Elements/Elements';

const Inbox = ({ initialValue }: { initialValue: BlockElements[] }) => {
	console.log('intiial inbox value');
	console.log(initialValue);

	const { nodeId, username } = useViewData();
	const [inbox, setinbox] = useState([]);
	// const {
	// 	data: inboxDataSWR,
	// 	isLoading,
	// 	mutate: mutateInbox,
	// } = useSWR([nodeId ? `/api/username/${nodeId}/inbox` : null], fetcher, {
	// 	revalidateOnMount: true,
	// 	revalidateOnFocus: true,
	// });

	// if (isLoading || inboxDataSWR === null) {
	// 	return (
	// 		<div className='py-4 px-2 '>
	// 			<div className='ml-[14px]'>
	// 				<h2 className='font-bold ml-1 text-md'>Inbox</h2>
	// 			</div>
	// 		</div>
	// 	);
	// }

	const saveInbox = () => {};

	return (
		<div className='py-4 px-2 '>
			<div className='ml-[14px]'>
				<h2 className='font-bold ml-1 text-md'>Inbox</h2>
			</div>
			<EditorComponent
				key={nodeId + '-inbox'}
				initialValue={initialValue}
				value={inbox}
				setValue={setinbox}
				id={'shelfDocument'}
				save={saveInbox}
				customElements={{
					// [ELEMENT_BLOCK]: withDraggable(InboxBlock),
					[ELEMENT_NODE]: withDraggable(InboxNode),
					// [ELEMENT_INBOX_BLOCK]
				}}
				// initialValue={inboxDataSWR.map(
				// 	({ inboxItem, r }: { inboxItem: any; r: any }) => {
				// 		// console.log(inboxItem, r);
				// 		const { labels, children, ...inboxProperties } =
				// 			inboxItem;

				// 		if (r.sentFromTitle) {
				// 			// Was sent
				// 			if (labels.includes('Node')) {
				// 				return {
				// 					...inboxProperties,
				// 					children: [JSON.parse(children)],
				// 					sentMetadata: { ...r },
				// 				};
				// 			} else {
				// 				// is block
				// 			}
				// 		} else {
				// 			if (labels.includes('Node')) {
				// 			} else {
				// 				// is block
				// 			}
				// 		}

				// 		return {
				// 			...inboxProperties,
				// 			children: [JSON.parse(children)],
				// 			sentMetadata: { ...r },
				// 		};
				// 	}
				// )}
			/>
		</div>
	);
};

export default Inbox;
