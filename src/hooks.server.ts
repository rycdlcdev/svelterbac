import { redirect, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const requestedPath = event.url.pathname;
	event.locals.user = null;

	// get access token from cookies
	const accessToken = event.cookies.get('token');

	if (accessToken) {
		try {
			const decodedToken = jwt.decode(accessToken);
			if (decodedToken && typeof decodedToken !== 'string') {
				event.locals.user = {
					username: decodedToken.username,
					role: decodedToken.role
				};
			}
		} catch (error) {
			console.error('Failed to decode token:', error);
		}
	}

	//await fetchUserData().then((res) => (event.locals.user = res));
	/* event.locals.user = {
		username: 'admin',
		role: 'admin'
	}; */

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
