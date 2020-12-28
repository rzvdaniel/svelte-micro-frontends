<script>
	import Nav from "../components/Nav.svelte";

	export let segment;
</script>

<Nav {segment} />

<main>
	<slot />
</main>

<!--Footer-->

<footer>
	<div class="footer-margin">
		<div class="social-footer">
			<a href="https://www.facebook.com/thomsooncom"><i
					class="fa fa-facebook" /></a>
			<a href="https://www.behance.net/TomaszMazurczak"><i
					class="fa fa-behance" /></a>
		</div>
		<div class="copyright">
			© Copyright 2015 Thomsoon.com. All Rights Reserved.
		</div>
	</div>
</footer>
