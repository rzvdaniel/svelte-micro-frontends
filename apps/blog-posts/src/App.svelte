<script>
	export let app;
	export let page;
	let posts = [];

	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(response => response.json())
		.then(json => posts = json)
	
</script>

<style>
	h3::first-letter, p::first-letter {
  	text-transform: uppercase;
	}

	.post {
		display: inline-block;
		padding: 0.2em 0.5em;
		margin: 0 0.2em 0.2em 0;
		border-radius: 0.2em;
		background-color: #e9e9e9;
	}

	.posts {
		display: grid; 
		grid-template-columns: 1fr 1fr; 
		grip-gap: 1em
	}

	.article {
		margin-bottom: 20px;
	}

</style>

{#each posts as { id, title, body }}
<div class="posts">
	<div class="article">
		<h3><a href="apps/blog-post-view?id={id}">{title}</a></h3>
		<p class="post">{body}.</p>
	</div>
</div>
{/each}
