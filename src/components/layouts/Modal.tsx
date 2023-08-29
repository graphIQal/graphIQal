import React from 'react';

type ModalProps = {
	children: React.ReactNode;
	open: boolean;
	setOpen: (arg0: boolean) => void;
};

//
const Modal: React.FC<ModalProps> = (props) => {
	const { open, setOpen } = props;

	const result = open ? (
		<div className='w-screen h-screen absolute z-50'>
			<div
				className='opacity-80 bg-base_black w-full h-full'
				onClick={() => setOpen(false)}
			></div>
			<div className='p-10 opacity-100 bg-base_white border-lining border-1 rounded-md w-[90%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
				{props.children}
			</div>
		</div>
	) : (
		<div className='absolute'></div>
	);
	return result;
};

export default Modal;
