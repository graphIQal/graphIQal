import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TextButton from '../../components/molecules/TextButton';
// import register from '../api/authentication/register';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Divider from '../../components/atoms/Divider';

//used for dragging
const SignIn: React.FC = () => {
	const [email, setemail] = useState('icejes8@gmail.com');
	const [password, setpassword] = useState('password');
	const [errorMsg, seterrorMsg] = useState('');

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
				{errorMsg && (
					<div className='text-sm text-red-400'>{errorMsg}</div>
				)}
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
						const res = await signIn('credentials', {
							redirect: false,
							password: password,
							email: email,
						});

						console.log('login', res);

						if (res?.error) {
							seterrorMsg('Invalid Credentials');
						}
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
				<p className='text-sm '>
					Don't have an account?{' '}
					<Link href='/auth/signup' className='underline '>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
