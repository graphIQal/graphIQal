import { updateView } from '@/packages/graph/helpers/backend/updateView';
import React, { useEffect, useState } from 'react';
import { useToggle } from '../../helpers/hooks/useToggle';
import IconCircleButton from '../molecules/IconCircleButton';
import { KeyedMutator } from 'swr';
import { updateGraphView } from '@/backend/functions/graph/mutate/updateGraphView';
import Modal from '../layouts/Modal';
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '../ui/alert-dialog';

import { Icons } from '../icons';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '../ui/dialog';
import { deleteGraphView } from '@/backend/functions/graph/mutate/deleteGraphView';

type TabProps = {
	title: string;
	selected: boolean;
	index: number;
	currTab: number;
	setCurrTab: (val: number) => void;
	tabs: any;
	setTabs: (val: any) => void;
	onClick?: (val: number) => void;
};
const SideTab: React.FC<TabProps> = ({
	title,
	selected,
	index,
	currTab,
	setCurrTab,
	tabs,
	setTabs,
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
			className={
				'h-10 border-lining border-r p-2 text-sm hover:cursor-pointer hover:bg-base_white flex flex-row items-center justify-between align-middle z-20 ' +
				(selected && ' bg-base_white')
			}
		>
			<div>
				<h3>{title}</h3>
			</div>
		</div>
	);
};
export default SideTab;
