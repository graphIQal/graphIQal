'use client';

import React, { Component, useEffect } from 'react';
// import * as Popover from '@radix-ui/react-popover';
import {
	comboboxActions,
	ComboboxContentItemProps,
	ComboboxContentProps,
	ComboboxProps,
	Data,
	NoData,
	TComboboxItem,
	useActiveComboboxStore,
	useComboboxContent,
	useComboboxContentState,
	useComboboxControls,
	useComboboxItem,
	useComboboxSelectors,
} from '@udecode/plate-combobox';
// import {
// 	useEventEditorSelectors,
// 	usePlateEditorState,
// } from '@udecode/plate-common';
// import { createVirtualRef } from '@udecode/plate-floating';

// import { cn } from '@/lib/utils';
// import {
// 	ComboboxProps,
// 	Data,
// 	NoData,
// 	Popover,
// 	TComboboxItem,
// 	comboboxActions,
// 	useActiveComboboxStore,
// 	useComboboxControls,
// 	useComboboxSelectors,
// } from '@udecode/plate';
import { container } from 'tailwindcss/defaultTheme';

import {
	usePlateEditorState,
	useEventEditorSelectors,
	Popover,
} from '@udecode/plate';

export function ComboboxItem<TData extends Data = NoData>({
	combobox,
	index,
	item,
	onRenderItem,
}: ComboboxContentItemProps<TData>): JSX.Element {
	const { props } = useComboboxItem({ item, index, combobox, onRenderItem });

	return (
		<div
			className={
				'relative flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors bg-base_white hover:bg-secondary_white hover:text-accent-foreground data-[highlighted=true]:bg-secondary_white data-[highlighted=true]:text-base_black'
			}
			{...props}
		/>
	);
}

export function ComboboxContent<TData extends Data = NoData>(
	props: ComboboxContentProps<TData>
) {
	const {
		component: Component,
		items,
		portalElement,
		combobox,
		onRenderItem,
	} = props;

	const editor = usePlateEditorState();

	const filteredItems =
		useComboboxSelectors.filteredItems() as TComboboxItem<TData>[];
	const activeComboboxStore = useActiveComboboxStore()!;

	const state = useComboboxContentState({ items, combobox });
	const { menuProps, targetRange } = useComboboxContent(state);

	return (
		<Popover
			content={<div className='absolute'></div>}
			floatingOptions={{ strategy: 'absolute', placement: 'right-start' }}
			children={
				<div>
					{filteredItems.map((item, index) => (
						<ComboboxItem
							key={item.key}
							item={item}
							combobox={combobox}
							index={index}
							onRenderItem={onRenderItem}
						/>
					))}
				</div>
			}
		></Popover>
	);
}

/**
 * Register the combobox id, trigger, onSelectItem
 * Renders the combobox if active.
 */
export function Combobox<TData extends Data = NoData>({
	id,
	trigger,
	searchPattern,
	onSelectItem,
	controlled,
	maxSuggestions,
	filter,
	sort,
	disabled: _disabled,
	...props
}: ComboboxProps<TData>) {
	const storeItems = useComboboxSelectors.items();
	const disabled =
		_disabled ?? (storeItems.length === 0 && !props.items?.length);

	const focusedEditorId = useEventEditorSelectors.focus?.();
	const combobox = useComboboxControls();
	const activeId = useComboboxSelectors.activeId();
	const editor = usePlateEditorState();

	useEffect(() => {
		comboboxActions.setComboboxById({
			id,
			trigger,
			searchPattern,
			controlled,
			onSelectItem,
			maxSuggestions,
			filter,
			sort,
		});
	}, [
		id,
		trigger,
		searchPattern,
		controlled,
		onSelectItem,
		maxSuggestions,
		filter,
		sort,
	]);

	if (
		!combobox ||
		!editor.selection ||
		focusedEditorId !== editor.id ||
		activeId !== id ||
		disabled
	) {
		return null;
	}

	return <ComboboxContent combobox={combobox} {...props} />;
}
