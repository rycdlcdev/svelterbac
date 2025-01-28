import { redirect } from '@sveltejs/kit';

import { checkRole } from '$lib/rbacUtils';
import { ROLES } from '$lib/constants';
//{ session: { cookie } }
/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals, cookies }) {
	const token = cookies.get('token');

	const user = locals.user;
	const isAdmin = checkRole(user, ROLES.ADMIN);

	if (!token) {
		throw redirect(307, '/unauthorized');
	}
	return {
		...locals
	};
}
