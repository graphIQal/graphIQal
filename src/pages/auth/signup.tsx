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
import { login, register } from '../../backend/functions/authentication';
import { signIn } from 'next-auth/react';
import Divider from '../../components/atoms/Divider';
import Link from 'next/link';

//used for dragging
const SignUp: React.FC = () => {
	const [email, setemail] = useState('');
	const [name, setname] = useState('');
	const [password, setpassword] = useState('');

	const router = useRouter();

	// const login = () => {
	// 	console.log('login');
	// };

	return (
		<div>
			<div className='flex flex-col justify-center items-center h-screen gap-4'>
				<div className='title text-xl font-extrabold'>
					Sign Up for GraphIQal!
				</div>
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
						// const res = register(password, email);

						signIn('credentials', {
							redirect: false,
							name: name,
							password: password,
							email: email,
							newUser: true,
						});

						console.log('signin results');
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
			{/* <CustomIconCircleButton onClick={() => {}} icon={<Plus />} /> */}
		</div>
	);
};

export default SignUp;
