import { redirect } from '@sveltejs/kit';

import { checkRole } from '$lib/rbacUtils';
import { ROLES } from '$lib/constants';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	const user = locals.user;
	const isAdmin = checkRole(user, ROLES.ADMIN);

	if (!isAdmin) {
		redirect(307, '/unauthorized');
	}
}
