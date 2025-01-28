<script lang="ts">
	let products: { nombre: string; precio: string }[] = [];

	async function getProducts() {
		const resp = await fetch('http://localhost:3001/productos', {
			credentials: 'include'
		});
		const data = await resp.json();
		products = data;
	}
</script>

welcome
<button on:click={getProducts}>Trae productos mock</button>
{#each products as product}
	<div>{product.nombre}</div>
{/each}
