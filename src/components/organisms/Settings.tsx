import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import TextButton from '../molecules/TextButton';
import Divider from '../atoms/Divider';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SettingsProps = {};

//
const SettingsPanel: React.FC<SettingsProps> = () => {
	const { data: session, status } = useSession();

	const router = useRouter();
	console.log(session, status);
	if (status === 'authenticated') {
		return (
			<div>
				<div>Hi, {session.user?.name}</div>
				<div>
					You're currently logged in as <b>{session.user?.email}</b>
				</div>
				<Divider />
				<TextButton
					text='Logout'
					onClick={() => signOut()}
				></TextButton>
			</div>
		);
	} else {
	}
	return (
		<div>
			<div>Not logged in atm</div>
			<Divider />
			<TextButton
				text='Sign in'
				onClick={() => router.push('/auth/signin')}
			/>
		</div>
	);
};

export default SettingsPanel;
