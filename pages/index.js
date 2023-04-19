import Link from 'next/link';
import { useState } from 'react';
import TextButton from '../src/components/molecules/TextButton';
import { login, register } from '../src/backend/functions/authentication';

export default function Home() {
	const [username, setusername] = useState('');
	const [password, setpassword] = useState('');
	const [email, setemail] = useState('');

	return (
		<ul>
			<li>
				<Link href='/'>Home</Link>
			</li>
			<li>
				<Link href='/username/SplitPaneWrapper'>Document</Link>
			</li>
			<li>
				<Link href='/username/graph'>Blog Post</Link>
			</li>
			<div className='flex flex-col bg-blue-400 '>
				<input
					placeholder='email'
					value={email}
					onChange={(e) => setemail(e.target.value)}
				/>
				<input
					placeholder='username'
					value={username}
					onChange={(e) => setusername(e.target.value)}
				/>
				<input
					placeholder='password'
					value={password}
					onChange={(e) => setpassword(e.target.value)}
				/>
				<TextButton
					text={'Login'}
					onClick={() => login(email, username, password)}
				/>
				<TextButton
					text={'Create Account'}
					onClick={() => register(email, username, password)}
				/>
			</div>
		</ul>
	);
}
