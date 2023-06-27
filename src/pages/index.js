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
import { deleteUser } from '../backend/functions/general/deleteUser';

export default function Home() {
	const [email, setemail] = useState('1332@gatech.edu');
	const [username, setusername] = useState('1332');
	const [password, setpassword] = useState('password');
	const [viewType, setViewType] = useState('graph');

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
						if (res.length > 0) {
							// router.push(
							// 	'/' + username + '/' + res[0].n.properties.id
							// );
							localStorage.setItem(
								'homenodeId',
								res[0].n.properties.id
							);
							localStorage.setItem(
								'userId authentication',
								res[0].u.properties.id
							);
						} else {
							console.log('unexisting user');
						}
						//  localStorage.setItem('user', response.data)
					}}
				/>
				<TextButton
					text={'Create Account'}
					onClick={() => register(email, username, password)}
				/>
				<TextButton
					text={'Test Button'}
					onClick={async () => {
						console.log(
							GenerateCypher([
								addBlockOnNodeCreation,
								returnCypher,
							])
						);
					}}
				/>
				<TextButton
					text={'Delete user'}
					onClick={async () => {
						console.log(
							await deleteUser({ username, password, email })
						);
					}}
				/>
				<div>care</div>
				<TextButton
					text={'Add resources'}
					onClick={async () => {
						console.log('add resources');
						await fetch('/api/general/load_resources').then(
							(res) => {
								res.json().then((json) => {
									console.log(json);
								});
							}
						);
					}}
				/>
				{/* <TextButton
					text={'Delete resources'}
					onClick={async () => {
						console.log('add resources');
						await fetch('/api/general/delete_resources').then(
							(res) => {
								res.json().then((json) => {
									console.log(json);
								});
							}
						);
					}}
				/> */}
				{/* <TextButton text={'Delete ALL NODES'} onClick={() => deleteAll()} /> */}
			</div>
		</ul>
	);
}
