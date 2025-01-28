import { redirect, type Handle } from '@sveltejs/kit';
//import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const requestedPath = event.url.pathname;
	event.locals.user = null;

	// get access token from cookies
	const accessToken = event.cookies.get('token');

	console.log('access token:', accessToken);
	if (accessToken) {
		/* const fetchUserData = async () => {
			const userData = await fetch('http://localhost:3001/me', {
				method: 'GET',
				credentials: 'include'
				headers: {
				Authorization: `Bearer ${accessToken}`
			}
			}).then(async (res) => await res.json());

			return userData;
		};

		const test = await fetchUserData();
		console.log('test:', test); */
		/* try {
			const decodedToken = jwt.decode(accessToken);
			event.locals.user = decodedToken;
			console.log('decoded token:', decodedToken);
		} catch (error) {
			console.error('Failed to decode token:', error);
		} */
	}

	//await fetchUserData().then((res) => (event.locals.user = res));
	event.locals.user = {
		username: 'admin',
		role: 'admin'
	};

	if (requestedPath === '/' && accessToken) {
		console.log('redirecting to /welcome');

		throw redirect(303, '/welcome');
	}
	if (!accessToken && event.route.id?.startsWith('/(protected)')) {
		console.log('redirecting to /');
		throw redirect(303, '/');
	}

	const response = await resolve(event);
	return response;
};
