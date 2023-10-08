import IconButton from '@/components/atoms/IconButton';
import IconCircleButton from '@/components/molecules/IconCircleButton';
import { PlateRenderElementProps } from '@udecode/plate';
import { useRouter } from 'next/router';

// ELEMENTS
// Define a React component renderer for our code blocks.

//Question: do we want to drag multiple blocks at the same time?
export const CodeElement = (props: PlateRenderElementProps) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};

export const Block = (props: PlateRenderElementProps) => {
	return (
		<div className='decoration-[0.1px] pt-2 ' /**{...props.attributes}**/>
			{props.children}
		</div>
	);
};

export const NodeLink = (props: any) => {
	// console.log('rendering nodeLink');
	// console.log(props);

	const router = useRouter();

	return (
		<div
			className='border-l-4 border-node cursor-pointer hover:bg-lining font-semibold underline underline-offset-2 decoration-lining decoration-1 truncate'
			onClick={() => {
				// Navigate to node
				router.push(props.element.routeString, undefined);
			}}
			contentEditable={false}
		>
			<IconCircleButton
				src={props.element.icon ? props.element.icon : 'node'}
				onClick={() => {
					console.log('node implemented yet');
				}}
				circle={false}
			></IconCircleButton>
			{props.children}
		</div>
	);
};

export const NodeTitle = (props: any) => {
	// console.log('rendering nodeLink');
	// console.log(props);

	const router = useRouter();

	return (
		<div
			className='cursor-pointer hover:bg-lining font-semibold underline underline-offset-2 decoration-lining decoration-1 truncate'
			onClick={() => {
				// Navigate to node
				router.push(props.element.routeString, undefined);
			}}
			contentEditable={false}
		>
			<IconCircleButton
				src={props.element.icon ? props.element.icon : 'node'}
				onClick={() => {
					console.log('node implemented yet');
				}}
				circle={false}
			></IconCircleButton>
			{props.children}
		</div>
	);
};

export const Node = (props: any) => {
	return <div className='border-l-4 border-node'>{props.children}</div>;
};

export const CutText = (props: any, showCutText: boolean) => {
	console.log('cut plugin', props);
	console.log('showCutText ', showCutText);

	return !showCutText ? (
		<span className='text-lining' {...props.attributes}>
			{props.children}
		</span>
	) : (
		<span contentEditable={false}>{props.children}</span>
	);
};

export const Divider = (props: any) => {
	return (
		<div
			{...props.attributes}
			className='border-t border-gray-300 my-4 h-0 w-full'
			contentEditable={false}
		>
			{props.children}
		</div>
	);
};

export const TitleElement = (props: any) => {
	// Showing untitled if title is empty.

	return (
		<div className='ml-[50px]'>
			<h1 className={'ml-1 text-xl font-extrabold mb-3'}>
				<div
					className={
						props.element.children[0].text.length === 0
							? 'before:content-["Untitled"] before:ml-0.5 before:block before:absolute before:cursor-text before:opacity-80'
							: ''
					}
				>
					{props.children}
				</div>
			</h1>
		</div>
	);
};

export const H1 = (props: PlateRenderElementProps) => {
	return <h1 className='text-xl font-extrabold'>{props.children}</h1>;
};

export const H2 = (props: PlateRenderElementProps) => {
	return <h2 className='text-lg font-bold'>{props.children}</h2>;
};

export const H3 = (props: PlateRenderElementProps) => {
	return <h3 className='text-[1.25em] font-bold'>{props.children}</h3>;
};

export const LI = (props: PlateRenderElementProps) => {
	return <li className=''>{props.children}</li>;
};

export const OL = (props: PlateRenderElementProps) => {
	return (
		<ol className='list-decimal list-outside pl-4'>
			<li className=''>{props.children}</li>
		</ol>
	);
};
export const UL = (props: PlateRenderElementProps) => {
	return (
		<ul className='list-disc list-outside pl-4'>
			<li className=''>{props.children}</li>
		</ul>
	);
};

export const BlockquoteElement = (props: PlateRenderElementProps) => {
	return (
		<div
			{...props.attributes}
			className='my-1 border-l-2 border-base_black pl-4 italic'
		>
			<blockquote>{props.children}</blockquote>
		</div>
	);
};

export const CutTextShown = (props: PlateRenderElementProps) => {
	return (
		<div {...props.attributes} className='text-node opacity-70 '>
			<blockquote>{props.children}</blockquote>
		</div>
	);
};

export const CutTextHidden = (props: PlateRenderElementProps) => {
	return (
		<div
			{...props.attributes}
			className='text-node opacity-70 hidden '
			contentEditable={false}
		>
			<blockquote>{props.children}</blockquote>
		</div>
	);
};

// Inbox

export const InboxNode = (props: any) => {
	const sentMetada = props.element.sentMetadata;

	return (
		<div className='my-1 rounded-md' {...props.attributes}>
			{sentMetada && (
				<div
					className='bg-highlight flex-row text-sm justify-between p-2 rounded-t-md'
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					contentEditable={false}
				>
					<span>
						{`Sent from ${sentMetada.icon} `}
						<strong>{`${sentMetada.title}`} </strong>
						on
						<strong>{` ${new Date(
							sentMetada.timestamp
						).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}`}</strong>
					</span>
					<IconButton
						onClick={() => console.log('Check button clicked')}
						src='check'
						hoverText='Check'
					/>
				</div>
			)}
			<div className='border-l-4 border-node'>{props.children}</div>
		</div>
	);
};

export const InboxBlock = (props: any) => {
	// const [{ opacity }, drag, preview] = useDrag(() => ({
	// 	type: ItemTypes.block,
	// 	collect: (monitor) => ({
	// 		opacity: monitor.isDragging() ? 0.4 : 1,
	// 	}),
	// }));

	// console.log(props);
	const sentMetada = props.element.sentMetadata;

	return (
		<div className='my-1 rounded-md ' {...props.attributes}>
			{sentMetada && (
				<div
					className='bg-highlight flex-row text-sm justify-between p-2 rounded-t-md'
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					contentEditable={false}
				>
					<span>
						{`Sent from ${sentMetada.icon} `}
						<strong>{`${sentMetada.title}`} </strong>
						on
						<strong>{` ${new Date(
							sentMetada.timestamp
						).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}`}</strong>
					</span>
					<IconButton
						onClick={() => console.log('Check button clicked')}
						src='check'
						hoverText='Check'
					/>
				</div>
			)}
			<div
				className={
					'p-1 ' + (sentMetada ? 'border-base_black border-l-4' : '')
				}
			>
				{props.children}
			</div>
		</div>
	);
};
