import { ROLES, PERMISSIONS } from '$lib/constants';
import { rolePermissions } from './rolePermissions';

// Function to check if a user has a specific role
export function checkRole(user: any, requiredRole: string): boolean {
	if (!user) {
		return false;
	}
	return user.role === requiredRole;
}

// Function to check if a user has specific permissions
export function checkPermissions(user: any, requiredPermissions: any): boolean {
	if (!user) {
		return false;
	}

	const userPermissions = rolePermissions[user.role];
	return userPermissions?.includes(requiredPermissions);
}

// Function to check if a user has both a specific role and permissions
export function checkRoleAndPermissions(
	user: any,
	requiredRole: any,
	requiredPermissions: any
): boolean {
	return checkRole(user, requiredRole) && checkPermissions(user, requiredPermissions);
}
