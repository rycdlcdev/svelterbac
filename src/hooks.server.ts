import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const requestedPath = event.url.pathname;
	event.locals.user = null;

	// get access token from cookies
	const accessToken = event.cookies.get('access_token');

	const fetchUserData = async () => {
		const userData = await fetch('https://dummyjson.com/auth/me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then(async (res) => await res.json());

		return userData;
	};

	console.log('fetching user data from hookserver', await fetchUserData());

	// Lógica de redirección
	if (requestedPath === '/') {
		console.log('Redirecting to /login');
		throw redirect(303, '/login');
	}
	if ((requestedPath === '/' || requestedPath === '/login') && accessToken) {
		console.log('Redirecting to /dashboard');
		throw redirect(303, '/dashboard');
	}
	if (!accessToken && event.route.id?.startsWith('/(protected)')) {
		console.log('Redirecting to /login due to missing token');
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};
