export const ShelfBlock = (props: any) => {
	// const [{ opacity }, drag, preview] = useDrag(() => ({
	// 	type: ItemTypes.block,
	// 	collect: (monitor) => ({
	// 		opacity: monitor.isDragging() ? 0.4 : 1,
	// 	}),
	// }));

	return (
		<div
			className='border my-1 p-1 rounded-md border-lining' /**{...props.attributes}**/
		>
			{props.children}
		</div>
	);
};
