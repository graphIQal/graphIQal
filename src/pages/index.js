import Link from 'next/link';
import { useState } from 'react';
// import TextButton from '../src/components/molecules/TextButton';
// import { login, register } from '../src/backend/functions/authentication';
import { login, register } from '../backend/functions/authentication';
import TextButton from '../components/molecules/TextButton';
import { deleteAll } from '../backend/functions/writing';
import {
	GenerateCypher,
	addBlockOnNodeCreation,
	cypherGenerator,
	returnCypher,
} from '../backend/cypher-generation/cypherGenerators';
import { useRouter } from 'next/router';

export default function Home() {
	const [email, setemail] = useState('icejes8@gmail.com');
	const [username, setusername] = useState('jesseliii');
	const [password, setpassword] = useState('password');

	const router = useRouter();

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
					onClick={async () => {
						const res = await login(email, username, password);
						console.log('result', res);
						router.push(
							'/' +
								username +
								'/' +
								res.n.properties.id +
								'/document'
						);
					}}
				/>
				<TextButton
					text={'Create Account'}
					onClick={() => register(email, username, password)}
				/>
				<TextButton
					text={'Test Button'}
					onClick={() => {
						console.log(
							GenerateCypher([
								addBlockOnNodeCreation,
								returnCypher,
							])
						);
					}}
				/>
				<div>care</div>
				<TextButton
					text={'Delete ALL NODES'}
					onClick={() => deleteAll()}
				/>
			</div>
		</ul>
	);
}
