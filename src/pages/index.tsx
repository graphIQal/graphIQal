import Link from 'next/link';
import { useState } from 'react';
// import TextButton from '../src/components/molecules/TextButton';
// import { login, register } from '../src/backend/functions/authentication';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
	const [email, setemail] = useState('1332@gatech.edu');
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
