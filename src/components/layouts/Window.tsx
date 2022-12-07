import React from 'react';

type WindowProps = {
	children: React.ReactNode;
};

// Right now, this does nothing but setting up infrastructure for when we allow the user to have multiple windows
// Each window will always have a view, but maybe in the future it might have a list of views (tabs)
// It may also just be the shelf or the connection label, etc.

// Do we always allow multiple tabs? What if the window is too small to support that?
const Window: React.FC<WindowProps> = (props) => {
	return <div>{props.children}</div>;
};

export default Window;
