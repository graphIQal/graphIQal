import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TextButton from '../../components/molecules/TextButton';
// import register from '../api/authentication/register';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { emailUsed, register } from '../../backend/functions/authentication';
import Divider from '../../components/atoms/Divider';

//used for dragging
const SignUp: React.FC = () => {
	const [email, setemail] = useState('');
	const [name, setname] = useState('');
	const [password, setpassword] = useState('');
	const [errorMsg, seterrorMsg] = useState('');

	const router = useRouter();
	const { data: session, status } = useSession();

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

	const invalidEntries = () => {
		if (name === '' || password === '' || email === '') {
			seterrorMsg('Empty fields');
			return true;
		}

		if (
			!String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			seterrorMsg('Invalid email');
			return true;
		}

		if (password.length < 8) {
			seterrorMsg('Password length must be 8 characters');
			return true;
		}

		return false;
	};

	return (
		<div>
			<div className='flex flex-col justify-center items-center h-screen gap-4'>
				<div className='title text-xl font-extrabold'>
					Sign Up for GraphIQal!
				</div>
				{errorMsg && (
					<div className='text-sm text-red-400'>{errorMsg}</div>
				)}
				<input
					className='border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-sm'
					placeholder='name'
					value={name}
					onChange={(e) => setname(e.target.value)}
				/>
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
					text={'Sign Up'}
					onClick={async () => {
						// Add register information

						if (invalidEntries()) return null;

						const loginRes = await emailUsed(email);

						if (loginRes.length > 0) {
							seterrorMsg('Email already registered');
							return;
						}

						const res = await register(email, password, name);

						// if(res.status === 'registered' && )

						console.log('register', res);

						const signinRes = await signIn('credentials', {
							redirect: false,
							password: password,
							email: email,
							newUser: true,
						});
					}}
				/>
				<TextButton
					text={'Signup using Google'}
					// onClick={() => register(email, username, password)}
					onClick={() => {
						signIn('google');
					}}
				/>
				<Divider widthCSS='w-10' />
				<p className='text-sm text-lining'>
					Already have an account?{' '}
					<Link
						href='/auth/signin'
						className='underline hover:text-base_black'
					>
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
