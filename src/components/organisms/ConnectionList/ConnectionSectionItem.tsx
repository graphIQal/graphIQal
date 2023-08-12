import React, { useContext, useEffect, useState } from 'react';
import IconCircleButton from '../../molecules/IconCircleButton';
import { OnHoverMenu } from '../OnHoverMenu';
import { title } from 'process';
import { useViewData } from '../../context/ViewContext';
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
	const [open, setOpen] = useState(false);
	if (!windowVar) return <div></div>;
	return (
		<div
			key={index}
			className={
				'flex flex-row gap-x-3 justify-between items-center align-middle p-2 border-y-[0.5px]  border-base_black border-opacity-10 '
			}
		></div>
	);
};
export default ConnectionListItem;
