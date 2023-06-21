import React, { useState } from 'react';

export const SideBar: React.FC = () => {
	const [open, setopen] = useState(false);

	return (
		<div className='absolute left-0 cursor-pointer justify-self-center self-center top-1/2 transform -translate-y-1/2'>
			<div className='w-6 h-[80vh] bg-base_black'></div>
		</div>
	);
};
