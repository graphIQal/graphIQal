export const ShelfBlock = (props: any) => {
	// const [{ opacity }, drag, preview] = useDrag(() => ({
	// 	type: ItemTypes.block,
	// 	collect: (monitor) => ({
	// 		opacity: monitor.isDragging() ? 0.4 : 1,
	// 	}),
	// }));

	return (
		<div
			className='border-2 rounded-md border-emerald-500' /**{...props.attributes}**/
		>
			{props.children}
		</div>
	);
};
