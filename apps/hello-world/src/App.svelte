<script context="module">
	export async function preload({ params: { app } }) {
		console.log(`loading app bundle '${app}.js'`)
		return { app };
	}
</script>

<script>
	export let root;	
</script>

<style>
	h1 {
		color: yellowgreen;
	}
</style>

<svelte:head>
	<link rel="stylesheet" href="{root}/bundle.css">
</svelte:head>

<h1>Hello World!</h1>
