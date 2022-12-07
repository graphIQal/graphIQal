import React from 'react';

type ViewProps = {
	children: React.ReactNode;
};

//
const View: React.FC<ViewProps> = (props) => {
	return <div>{props.children}</div>;
};

export default View;
