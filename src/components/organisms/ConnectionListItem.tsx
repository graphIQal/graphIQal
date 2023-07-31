import React, { useContext, useEffect } from 'react';
import IconCircleButton from '../molecules/IconCircleButton';
import { OnHoverMenu } from './OnHoverMenu';
import { title } from 'process';
import { useViewData } from '../context/ViewContext';
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft';
import { ArrowRight } from '@styled-icons/fa-solid/ArrowRight';

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
	fromNode: boolean;
};
const ConnectionListItem: React.FC<ConnectionListItemProps> = ({
	type,
	title,
	id,
	index,
	buttonItems,
	url,
	fromNode,
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
				{!fromNode && <ArrowLeft size={15} />}
				<div className='px-1'>{type}</div>
				{fromNode && <ArrowRight size={15} />}
				<div className='h-full py-2 ml-2 border-l border-lining'></div>
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
