import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import TextButton from '../molecules/TextButton';
import Divider from '../atoms/Divider';

type SettingsProps = {};

//
const SettingsPanel: React.FC<SettingsProps> = () => {
	const { data: session, status } = useSession();

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
		</div>
	);
};

export default SettingsPanel;
