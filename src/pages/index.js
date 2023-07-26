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

	if (status === 'authenticated' && session.user && session.user.homenodeId) {
		router.push(
			'/' +
				(session.user.name ? session.user?.name : 'username') +
				'/' +
				session.user.homenodeId
		);
	} else if (status === 'unauthenticated') {
		router.push('/auth/signin');
	}

	return (
		<ul>
			<li>
				<Link href='/auth/signin'>Real Signin</Link>
			</li>
		</ul>
	);
}
