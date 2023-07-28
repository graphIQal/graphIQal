import React, { useContext, useEffect } from 'react';
import IconCircleButton from '../molecules/IconCircleButton';
import { OnHoverMenu } from './OnHoverMenu';
import { title } from 'process';
import { useViewData } from '../context/ViewContext';

type ConnectionListItemProps = {
	type: string;
	title: string;
	id: string;
	index: number;
	buttonItems: {
		src: string;
		onClick: () => void;
	}[];
	url: string;
};
const ConnectionListItem: React.FC<ConnectionListItemProps> = ({
	type,
	title,
	id,
	index,
	buttonItems,
	url,
}) => {
	const { windowVar } = useViewData();
	if (!windowVar) return <div></div>;
	return (
		<div
			key={index}
			className={
				'flex flex-row gap-x-3 justify-between items-center align-middle p-2 border-y-[0.5px]  border-base_black border-opacity-10 '
			}
		>
			<div
				className='flex flex-row items-center align-middle'
				key={index}
			>
				<div>{type}</div>
				<IconCircleButton
					circle={false}
					src='block'
					onClick={() => null}
				/>
				<h4
					onClick={url ? () => windowVar.open(url) : () => null}
					className={
						'text-sm ' +
						(url && 'hover:underline hover:cursor-pointer')
					}
				>
					{title}
				</h4>
			</div>
			<OnHoverMenu buttonItems={buttonItems} />
		</div>
	);
};
export default ConnectionListItem;
