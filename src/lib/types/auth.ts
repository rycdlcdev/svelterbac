interface LoginRequest {
	email: string;
	password: string;
}

interface RegisterRequest extends LoginRequest {
	name: string;
	confirmPassword: string;
}

export type { LoginRequest, RegisterRequest };
