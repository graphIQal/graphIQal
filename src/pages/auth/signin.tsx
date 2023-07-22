import React, { useState } from 'react';
import CustomIconCircleButton from '../../components/molecules/CustomIconCircleButton';
import { Plus } from '@styled-icons/fa-solid/Plus';
import TextButton from '../../components/molecules/TextButton';
import { useRouter } from 'next/router';
import {
	GenerateCypher,
	returnCypher,
} from '../../backend/cypher-generation/cypherGenerators';
// import register from '../api/authentication/register';
import deleteUser from '../api/general/deleteUser';
import { login } from '../../backend/functions/authentication';
import { signIn } from 'next-auth/react';
import Divider from '../../components/atoms/Divider';
import Link from 'next/link';

//used for dragging
const SignIn: React.FC = () => {
	const [email, setemail] = useState('1332@gatech.edu');
	const [username, setusername] = useState('1332');
	const [password, setpassword] = useState('password');

	const router = useRouter();

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
						signIn(
							'credentials',
							{
								redirect: false,
								password: password,
								email: email,
							},
							{ password: password, email: email }
						);
						// const res = await login(email, username, password);
						// console.log('result', res);
						// if (res.length > 0) {
						// 	router.push(
						// 		'/' + username + '/' + res[0].n.properties.id
						// );
						// localStorage.setItem('authentication', {
						// 	id: res[0].u.properties.id,
						// 	username: res[0].u.properties.username,
						// 	time: new Date(),
						// 	homenodeId: res[0].n.properties.id,
						// });
						// } else {
						// 	console.log('unexisting user');
						// }
						//  localStorage.setItem('user', response.data)
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
