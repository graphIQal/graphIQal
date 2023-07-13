import React, { useEffect } from 'react';

type SettingsProps = {};

//
const SettingsPanel: React.FC<SettingsProps> = () => {
	useEffect(() => {
		console.log(localStorage.getItem('userId'));
		console.log(sessionStorage.getItem('userId'));
		console.log(!sessionStorage.getItem('favourites'));
	}, []);

	return (
		<div>
			<div>Settings</div>
			<div>okay more settings</div>
		</div>
	);
};

export default SettingsPanel;
