<script lang="ts">
	export let session: any; // Puedes personalizar esto según cómo manejes tus sesiones

	import { checkRole } from '$lib/rbacUtils';
	import { ROLES } from '$lib/constants';
	import { user } from '$stores/userStore';

	$: isAdmin = checkRole($user, ROLES.ADMIN);

	// Lógica para colapsar/expandir el sidebar
	let sidebarCollapsed = false;
	const toggleSidebar = () => {
		sidebarCollapsed = !sidebarCollapsed;
	};
</script>

<div class="layout">
	<!-- Sidebar -->
	<aside class={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
		<ul>
			{#if isAdmin}
				<li on:click={() => console.log('Admin clicked')}>Admin</li>
			{/if}
			<li on:click={() => console.log('Dashboard clicked')}>Dashboard</li>
			<li on:click={() => console.log('Users clicked')}>Users</li>
			<li on:click={() => console.log('Settings clicked')}>Settings</li>
		</ul>
	</aside>

	<!-- Main content -->
	<div style="flex: 1; display: flex; flex-direction: column;">
		<!-- Navbar -->
		<header class="navbar">
			<button class="toggle-btn" on:click={toggleSidebar}>
				{sidebarCollapsed ? '☰' : '✖'}
			</button>
			<div>Admin Panel</div>
			<div>
				<span>{session?.user?.name || 'Guest'}</span>
			</div>
		</header>

		<!-- Content -->
		<main class="content">
			<slot />
		</main>
	</div>
</div>

<style>
	:root {
		--sidebar-width: 250px;
		--sidebar-width-collapsed: 70px;
		--navbar-height: 60px;
	}

	body {
		margin: 0;
		font-family: Arial, sans-serif;
	}

	.layout {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}

	.sidebar {
		width: var(--sidebar-width);
		background-color: #2c3e50;
		color: white;
		transition: width 0.3s;
	}

	.sidebar.collapsed {
		width: var(--sidebar-width-collapsed);
	}

	.sidebar ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.sidebar li {
		padding: 15px;
		text-align: left;
		cursor: pointer;
	}

	.sidebar li:hover {
		background-color: #34495e;
	}

	.navbar {
		height: var(--navbar-height);
		background-color: #34495e;
		color: white;
		display: flex;
		align-items: center;
		padding: 0 20px;
		justify-content: space-between;
	}

	.content {
		flex: 1;
		background-color: #ecf0f1;
		overflow-y: auto;
	}

	.toggle-btn {
		cursor: pointer;
		background: none;
		border: none;
		color: white;
		font-size: 1.2rem;
	}
</style>
