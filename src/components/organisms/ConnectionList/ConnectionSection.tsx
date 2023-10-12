import React, { useContext, useEffect, useState } from 'react';
import IconCircleButton from '../../molecules/IconCircleButton';
import { OnHoverMenu } from '../OnHoverMenu';
import { title } from 'process';
import { useViewData } from '../../context/ViewContext';
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft';
import { ArrowRight } from '@styled-icons/fa-solid/ArrowRight';
// import { ChevronDownIcon } from '@udecode/plate';
import { connectionColours } from '@/theme/colors';
import { Icons } from '@/components/icons';

type ConnectionSectionProps = {
	title: string | JSX.Element;
	colour: string;
	children: React.ReactNode;
};

const ConnectionSection: React.FC<ConnectionSectionProps> = ({
	title,
	colour,
	children,
}) => {
	const { windowVar } = useViewData();
	if (!windowVar) return <div></div>;

	const [isOpen, setIsOpen] = useState(
		colour === connectionColours['Parents'] ? true : false
	);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};
	const maxHeight = '10em';

	return (
		<div
			className={'border-t border-lining w-full'}
			style={{ backgroundColor: colour }}
			key={colour}
		>
			<div
				className='border-lining cursor-pointer flex items-center h-10 px-2 w-full '
				onClick={toggleAccordion}
			>
				<Icons.chevronDown
					className={`h-4 w-4 mr-1 shrink-0 text-muted-foreground transition-transform duration-200 ${
						isOpen ? 'rotate-180' : 'rotate-0'
					}`}
				/>
				<div className='font-bold'>{title}</div>
			</div>
			{/* maxHeight must be fixed and same as in taiwind config */}
			<div
				className={`overflow-y-auto transition-all ${
					isOpen ? 'animate-accordion-down' : 'animate-accordion-up'
				}`}
				style={{ maxHeight: isOpen ? `${maxHeight}` : '0' }}
			>
				<div className=''>{children}</div>
			</div>
			{/* <div
  className={`overflow-y-auto transition-all duration-300 ${
    isOpen ? `max-h-${maxHeight}` : 'max-h-0'
  }`}
>
  <div className="mt-2">{children}</div>
</div> */}
		</div>
	);
};
export default ConnectionSection;
