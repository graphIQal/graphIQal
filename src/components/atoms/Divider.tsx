import React from 'react';

const Divider: React.FC<{ widthCSS?: string }> = ({ widthCSS = 'w-full' }) => {
	return <hr className={'border-t border-gray-300 my-4 h-0 ' + widthCSS} />;
};

export default Divider;
