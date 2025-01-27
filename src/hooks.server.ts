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

	console.log(
		'fetching user data from hookserver',
		await fetchUserData().then((res) => (event.locals.user = res))
	);

	// Lógica de redirección
	/* if (requestedPath === '/') {
		console.log('Redirecting to /login');
		throw redirect(303, '/login');
	} */
	if (requestedPath === '/' && accessToken) {
		throw redirect(303, '/welcome');
	}
	if (!accessToken && event.route.id?.startsWith('/(protected)')) {
		throw redirect(303, '/');
	}

	const response = await resolve(event);
	return response;
};
