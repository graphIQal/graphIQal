import { useRouter } from 'next/router';
import React, { useState } from 'react';
// import register from '../api/authentication/register';
import Link from 'next/link';
import Divider from '../../components/atoms/Divider';

//used for dragging
const SignIn: React.FC = () => {
	const [email, setemail] = useState('icejes8@gmail.com');
	const [password, setpassword] = useState('password');

	const router = useRouter();

	// const login = () => {
	// 	console.log('login');
	// };

	return (
		<div>
			<div className='flex flex-col justify-center items-center h-screen gap-4'>
				<div className='title text-xl font-extrabold'>Error</div>
				<Divider widthCSS='w-10' />
				<p className='text-sm text-lining'>
					<Link
						href='/auth/signin'
						className='underline hover:text-base_black'
					>
						Return to Login page
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
