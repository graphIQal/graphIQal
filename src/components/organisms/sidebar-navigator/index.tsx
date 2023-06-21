import React, { useState } from 'react';
import { NodeLink } from '../../../packages/editor/Elements/Elements';

export const SideBar: React.FC = () => {
	const [open, setopen] = useState(false);

	return (
		<div className='w-48 -translate-x-44 hover:translate-x-0 rounded-r-md border-r-[0.5] p-4 border-lining transition-all z-50 opacity-0 hover:opacity-100 absolute left-0 ease-in-out justify-self-center self-center top-1/2 -translate-y-1/2 h-[80vh] bg-base_black text-base_white '>
			<div>
				<div>Navigation</div>
				<div>Favourites</div>
				<NodeLink element={{ routeString: 'peepee' }}>
					{<div>Node Title 1 </div>}
				</NodeLink>
				<NodeLink element={{ routeString: 'peepee' }}>
					{<div>Node Title 2 </div>}
				</NodeLink>
				<NodeLink element={{ routeString: 'peepee' }}>
					{<div>Node Title 3 </div>}
				</NodeLink>
				<NodeLink element={{ routeString: 'peepee' }}>
					{<div>Node Title 4 </div>}
				</NodeLink>
			</div>
		</div>
	);
};
