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
import { useSession } from 'next-auth/react';

export default function Home() {
	const [email, setemail] = useState('1332@gatech.edu');
	const [password, setpassword] = useState('password');

	const router = useRouter();
	const { session, status } = useSession();

	console.log('session, status');
	console.log(session, status);

	return (
		<ul>
			<li>
				<Link href='/auth/signin'>Real Signin</Link>
			</li>
			<div className='flex flex-col bg-blue-400 '>
				<input
					placeholder='email'
					value={email}
					onChange={(e) => setemail(e.target.value)}
				/>
				<input
					placeholder='password'
					value={password}
					onChange={(e) => setpassword(e.target.value)}
				/>
				<TextButton
					text={'Login'}
					onClick={async () => {
						const res = await login(email, password);
						console.log('result', res);
						if (res.length > 0) {
							router.push(
								'/' + username + '/' + res[0].n.properties.id
							);
							localStorage.setItem('authentication', {
								id: res[0].u.properties.id,
								username: res[0].u.properties.username,
								time: new Date(),
								homenodeId: res[0].n.properties.id,
							});
							// res[0].u.properties.favourites
							// 	? localStorage.setItem(
							// 			'favourites',
							// 			res[0].u.properties.favourites
							// 	  )
							// 	: localStorage.setItem('favourites', []);
						} else {
							console.log('unexisting user');
						}
						//  localStorage.setItem('user', response.data)
					}}
				/>
				{/* <TextButton
					text={'Create Account'}
					onClick={() => register(email, password)}
				/> */}
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
