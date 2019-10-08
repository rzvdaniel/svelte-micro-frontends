<script>
	export let app;
  export let page;
  
	let loading_component = new Promise(() => {});
	$: if (process.browser) {
		console.log(`loading app bundle '/${app}/bundle.mjs'`);
		loading_component = import(`/${app}/bundle.mjs`);
	}
	
	// onMount is only called when this route is initialized
	// if you click a link from an app to another,
	// this won't be triggered
	import { onMount } from 'svelte'
	onMount(() => console.log(`[app].svelte route was mounted`));
</script>

<svelte:head>
	<link rel="stylesheet" href="{app}/bundle.css">
</svelte:head>

{#await loading_component}
	<strong>Loading...</strong>
{:then module}
<!-- Don't forget to pass the app params like "app" -->
	<svelte:component this="{module.default}" app={app} page={page} />
{:catch err}
	<strong>Ops! Something went wrong: {err}</strong>
{/await}