import { Router } from 'next/router';
import { write } from '../driver/helpers';
import { Neo4jAdapter } from '../driver/neo4jAuthAdapter';

export const register = async (
	email: string,
	password: string,
	name: string
) => {
	console.log('register');

	// const login = await fetch(
	// 	`/api/authentication/login?password=${password}&email=${email}`
	// )
	// 	.then((res) => {
	// 		console.log('res ', res);
	// 		return res.json();
	// 	})
	// 	.then((json) => {
	// 		console.log('json: ', json);
	// 		return json;
	// 	});

	// if (login.length > 0) {
	// 	console.log('login length', login);
	// 	return { status: 'user exists' };
	// }

	const res = await fetch(
		`/api/authentication/register?password=${password}&email=${email}&name=${name}`
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

export const login = async (email: string, password: string) => {
	console.log('login attempted ');

	try {
		const res = await fetch(
			`/api/authentication/login?password=${password}&email=${email}`
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
	} catch (e) {
		console.log(e);
	}
};
