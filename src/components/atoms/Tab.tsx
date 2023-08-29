import { updateView } from '@/packages/graph/helpers/backend/updateView';
import React, { useEffect, useState } from 'react';
import { useToggle } from '../../helpers/hooks/useToggle';
import IconCircleButton from '../molecules/IconCircleButton';

type TabProps = {
	id: string;
	label: string;
	selected: boolean;
	index: number;
	currTab: number;
	setCurrTab: (val: number) => void;
	tabs: any;
	setTabs: (val: any) => void;
	onClick?: (val: number) => void;
	viewType: 'document' | 'graph';
};
const Tab: React.FC<TabProps> = ({
	id,
	label,
	selected,
	index,
	currTab,
	setCurrTab,
	tabs,
	setTabs,
	viewType,
	onClick = (index: number) => {
		setCurrTab(index);
	},
}) => {
	// const [showDel, setShowDel] = useState(false);

	const onClose = (index: number) => {
		if (currTab == tabs.length - 1) {
			setCurrTab(currTab - 1);
		}
		setTabs(tabs.filter((tab: any, i: number) => i != index));
	};

	const { value: isEditing, toggle: toggleIsEditing } = useToggle();
	const [showDelModal, setshowDelModal] = useState(false);

	useEffect(() => {
		const listenerFunc = (ev: any) => {
			if (ev.code == 'Enter') {
				toggleIsEditing(false);
			}
		};
		if (isEditing) {
			window.addEventListener('click', () => toggleIsEditing(false));
			window.addEventListener('keydown', (ev: any) => listenerFunc(ev));
		}

		return () => {
			window.removeEventListener('click', () => toggleIsEditing(false));
			window.removeEventListener('keydown', (ev: any) =>
				listenerFunc(ev)
			);
		};
	}, [isEditing]);

	return (
		<div
			onClick={() => onClick(index)}
			onDoubleClick={() => toggleIsEditing(true)}
			// onMouseOver={() => setShowDel(true)}
			// onMouseLeave={() => setShowDel(false)}
			className={
				'min-w-[9rem] h-10 border-lining border-r p-2 text-sm hover:cursor-pointer hover:bg-base_white flex flex-row items-center justify-between align-middle z-20 ' +
				(selected && ' bg-base_white')
			}
		>
			<div>
				{isEditing ? (
					<input
						className='outline-none border-none'
						onBlur={(e: any) => {
							console.log('update');
							updateView('TAB_NAME', {
								tabs: tabs,
								setTabs: setTabs,
								newLabel: e.target.value,
								index: index,
							});
						}}
						defaultValue={label}
						autoFocus={true}
					/>
				) : (
					<h3>{label}</h3>
				)}
			</div>
			{viewType === 'graph' && (
				<IconCircleButton
					src='close'
					circle={false}
					onClick={() => setshowDelModal(true)}
					// onClick={() => onClose(index)}
				/>
			)}
		</div>
	);
};
export default Tab;
