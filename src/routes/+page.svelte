<script lang="ts">
	import { goto } from '$app/navigation';

	let username = 'emilys';
	let password = 'emilyspass';

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const resp = await fetch('https://dummyjson.com/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password
			})
			//credentials: 'include' // Include cookies (e.g., accessToken) in the request
		});
		const data = await resp.json();
		document.cookie = `access_token=${data.accessToken}`;
		goto('/welcome');
	};
</script>

<main>
	<h1>Login</h1>
	<form on:submit={handleSubmit}>
		<div>
			<label for="username">Username:</label>
			<input type="text" id="username" bind:value={username} required />
		</div>
		<div>
			<label for="password">Password:</label>
			<input type="password" id="password" bind:value={password} required />
		</div>
		<button type="submit">Login</button>
	</form>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 300px;
	}

	div {
		margin-bottom: 15px;
	}

	label {
		margin-bottom: 5px;
	}

	input {
		padding: 8px;
		font-size: 16px;
	}

	button {
		padding: 10px;
		font-size: 16px;
		cursor: pointer;
	}
</style>
