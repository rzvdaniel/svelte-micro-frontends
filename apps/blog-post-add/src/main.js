import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		app: '',
		userId: 1
	}
});

export default app;