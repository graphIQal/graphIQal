import { createHash } from 'crypto';

// const scryptAsync = promisify(scrypt);

// export class Password {
// 	static async hashPassword(password: string) {
// 		const salt = randomBytes(16).toString('hex');
// 		const buf = (await scryptAsync(password, salt, 64)) as Buffer;
// 		return `${buf.toString('hex')}.${salt}`;
// 	}

// 	static async comparePassword(
// 		storedPassword: string,
// 		suppliedPassword: string
// 	): Promise<boolean> {
// 		// split() returns array
// 		const [hashedPassword, salt] = storedPassword.split('.');
// 		// we need to pass buffer values to timingSafeEqual
// 		const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
// 		// we hash the new sign-in password
// 		const suppliedPasswordBuf = (await scryptAsync(
// 			suppliedPassword,
// 			salt,
// 			64
// 		)) as Buffer;
// 		// compare the new supplied password with the stored hashed password
// 		return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
// 	}
// }

export const hashPassword = (password: string) => {
	return createHash('sha256').update(password).digest('hex');
};

export const compareHashPassword = (
	password: string,
	hashedPassword: string
) => {
	if (hashPassword(password) === hashedPassword) {
		return { success: true, message: 'Password matched' };
	}
	return { success: false, message: 'Password not matched' };
};

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
		`/api/authentication/register?password=${hashPassword(
			password
		)}&email=${email}&name=${name}`
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
// deprecated. Use signin flow.
// Used just to check if account exists
export const emailUsed = async (email: string) => {
	console.log('login attempted ');

	try {
		const res = await fetch(`/api/authentication/emailUsed?email=${email}`)
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
