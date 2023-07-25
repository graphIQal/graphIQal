import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TextButton from '../../components/molecules/TextButton';
// import register from '../api/authentication/register';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import Divider from '../../components/atoms/Divider';

//used for dragging
const SignIn: React.FC = () => {
	const [email, setemail] = useState('icejes8@gmail.com');
	const [password, setpassword] = useState('password');

	const router = useRouter();

	const { data: session, status } = useSession();

	console.log('session, status');
	console.log(session, status);

	if (status === 'authenticated' && session.user && session.user.homenodeId) {
		router.push(
			'/' +
				(session.user.name ? session.user?.name : 'username') +
				'/' +
				session.user.homenodeId
		);
	}

	// const login = () => {
	// 	console.log('login');
	// };

	return (
		<div>
			<div className='flex flex-col justify-center items-center h-screen gap-4'>
				<div className='title text-xl font-extrabold'>
					Login to GraphIQal
				</div>
				<input
					className='border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-sm'
					placeholder='email'
					value={email}
					onChange={(e) => setemail(e.target.value)}
				/>
				<input
					className='border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-sm'
					placeholder='password'
					value={password}
					onChange={(e) => setpassword(e.target.value)}
				/>
				<TextButton
					text={'Login'}
					onClick={async () => {
						signIn('credentials', {
							redirect: false,
							password: password,
							email: email,
						});
					}}
				/>
				<TextButton
					text={'Google Login'}
					// onClick={() => register(email, username, password)}
					onClick={() => {
						signIn('google');
					}}
				/>
				<Divider widthCSS='w-10' />
				<p className='text-sm text-lining'>
					Don't have an account?{' '}
					<Link
						href='/auth/signup'
						className='underline hover:text-base_black'
					>
						Sign Up
					</Link>
				</p>
			</div>
			{/* <CustomIconCircleButton onClick={() => {}} icon={<Plus />} /> */}
		</div>
	);
};

export default SignIn;
