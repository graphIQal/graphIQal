// ELEMENTS
// Define a React component renderer for our code blocks.
export const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};

export const DefaultElement = (props: any) => {
	return <div {...props.attributes}>{props.children}</div>;
};

export const Leaf = (props: any) => {
	if (props.leaf.italics) {
		console.log('leaf', props);
		return (
			<span
				{...props.attributes}
				className={props.leaf.text_type}
				style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
			>
				<em>{props.children}</em>
			</span>
		);
	}

	return (
		<span
			{...props.attributes}
			className={props.leaf.text_type}
			style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
		>
			{props.children}
		</span>
	);
};
