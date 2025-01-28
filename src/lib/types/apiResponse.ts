interface APIResponse<T> {
	ok: boolean;
	status: number;
	message?: string;
	data?: T;
	error?: string[];
}

export type { APIResponse };
