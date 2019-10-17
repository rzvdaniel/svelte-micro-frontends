<script>
	export let app;
	export let page;

	// If page doesn't exist, this mean that we are running the app in isolation.
	// When page is defined, it meas that the app is running in the parent website
	// which fills the "page" parameter like below:
	// <svelte:component this="{module.default}" app={app} page={page} />
	const id = page ? page.query.id : 1;
	let post;

	let loading = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
		.then(response => response.json())
		.then(json => post = json)
	
</script>

<style>
	h1::first-letter, p::first-letter {
  	text-transform: uppercase;
	}

</style>

{#await loading}
	<strong>Loading...</strong>
{:then module}
	<div class="posts">
		<div>
			<h1>{post.title}</h1>
			<p class="post">{post.body}.</p>
		</div>
	</div>
{:catch err}
	<strong>Ops! Something went wrong: {err}</strong>
{/await}

<a href="/">Back to Home</a>

