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

export const login = (username: string, password: string, email: string) => {
	console.log('login attempted ');

	fetch(
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
};
