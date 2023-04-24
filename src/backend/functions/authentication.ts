import { Router } from 'next/router';
import { write } from '../driver/helpers';

export const register = async (
	email: string,
	username: string,
	password: string
) => {
	console.log('register');

	fetch(
		`/api/authentication/register?username=${username}&password=${password}&email=${email}`
	)
		.then((res) => {
			console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			console.log('json: ', json);
			return json;
		});
};

export const login = async (
	email: string,
	username: string,
	password: string
) => {
	console.log('login attempted ');

	const res = await fetch(
		`/api/authentication/login?username=${username}&password=${password}&email=${email}`
	)
		.then((res) => {
			console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			console.log('json: ', json);
			return json;
		});

	return res;
};
