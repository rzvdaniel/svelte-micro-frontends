<script>
	export let app;
	export let page;

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

	.post {
		display: inline-block;
		padding: 0.2em 0.5em;
		margin: 0 0.9em 0.9em 0;
		border-radius: 0.2em;
		background-color: #e9e9e9;
	}

	.posts {
		display: grid; 
		grid-template-columns: 1fr 1fr; 
		grip-gap: 1em
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

