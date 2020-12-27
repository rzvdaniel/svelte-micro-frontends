import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-cpy'

const production = !process.env.ROLLUP_WATCH;

// 1. In Production, we build the App.svelte component that would be injected into the application host
// 2. In Development, we build the stand alone main.js entry which would be used into index.html
const inputFile = production ? 'src/App.svelte' : 'src/main.js';

// 1. In Production, we build an EcmaScript bundle.mjs module
// 2. In Development, we build a standard Javascript bundle.js
const outputFile = production ? 'public/bundle.mjs' : 'public/bundle.js';

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	// 1. In Production, we build the App.svelte component that would be injected into the application host
	// 2. In Development, we build the stand alone main.js entry which would be used into public/index.html
	input: inputFile,

	// 1. In Production, we build an EcmaScript bundle.mjs module
	// 2. In Development, we build a standard Javascript bundle.js
	output: {
		sourcemap: true,
		// In Production, we build an EcmaScript module (ESM)
		// In Development, we build an Immediately Invoked Function Expression (IIFE)
		format: production ? 'esm' : 'iife',
		name: 'app',
		file: outputFile
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// Copy apps to static-apps parent folder to be loaded in the main app at runtime
		// TODO! Only copy at build time
		production && copy({
			// Copy EcmaScript modules and dependent resources from public folder
			files: ['public/*.mjs', 'public/*.mjs.map', 'public/bundle.css', 'public/*.css.map'],
			// To external folder static-apps from where the parent application host can load it
			dest: '../../static-apps/blog-post-add',
			options: {
				verbose: true
			}
		})
	],
	watch: {
		clearScreen: false
	}
};
