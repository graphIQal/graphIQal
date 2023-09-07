import React, { ReactNode } from 'react';
import { FormatBold } from '@styled-icons/material/FormatBold';
import { FormatItalic } from '@styled-icons/material/FormatItalic';
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import { FormatStrikethrough } from '@styled-icons/material/FormatStrikethrough';
import { TippyProps } from '@tippyjs/react';
import {
	BalloonToolbar,
	BlockToolbarButton,
	getPluginType,
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
	MarkToolbarButton,
} from '@udecode/plate';
import { ELEMENT_CUT, MARK_COLOUR, useMyPlateEditorRef } from '../plateTypes';
import { Cut } from '@styled-icons/ionicons-sharp/Cut';
import { Icons } from '@/components/icons';

export const markTooltip: TippyProps = {
	arrow: true,
	delay: 0,
	duration: [200, 0],
	hideOnClick: false,
	offset: [0, 17],
	placement: 'top',
};

export const EditorFloatingMenu = ({ children }: { children?: ReactNode }) => {
	const editor = useMyPlateEditorRef();

	const arrow = false;
	const theme = 'dark';

	// const boldTooltip: TippyProps = { content: 'Bold (⌘+B)', ...markTooltip };
	// const italicTooltip: TippyProps = {
	// 	content: 'Italic (⌘+I)',
	// 	...markTooltip,
	// };
	// const underlineTooltip: TippyProps = {
	// 	content: 'Underline (⌘+U)',
	// 	...markTooltip,
	// };

	return (
		<BalloonToolbar
			theme={theme}
			arrow={arrow}
			floatingOptions={{ placement: 'top' }}
		>
			<MarkToolbarButton
				type={getPluginType(editor, MARK_BOLD)}
				icon={<FormatBold />}
				// tooltip={boldTooltip}
			/>
			<MarkToolbarButton
				type={getPluginType(editor, MARK_ITALIC)}
				icon={<FormatItalic />}
				// tooltip={italicToolTip}
			/>
			<MarkToolbarButton
				type={getPluginType(editor, MARK_UNDERLINE)}
				icon={<FormatUnderlined />}
				// tooltip={underlineTooltip}
			/>
			<MarkToolbarButton
				type={getPluginType(editor, MARK_STRIKETHROUGH)}
				icon={<FormatStrikethrough />}
				// tooltip={underlineTooltip}
			/>
			{/* <BlockToolbarButton
				type={getPluginType(editor, ELEMENT_CUT)}
				icon={<Cut />}
				// tooltip={underlineTooltip}
			/> */}
			<MarkToolbarButton
				type={getPluginType(editor, MARK_COLOUR)}
				icon={<Icons.brush />}
				// tooltip={underlineTooltip}
			/>
			{children}
		</BalloonToolbar>
	);
};
