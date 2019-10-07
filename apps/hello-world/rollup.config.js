import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-cpy'

const production = !process.env.ROLLUP_WATCH;

// 1. In Production, we build the App.svelte component that would be injected into the application host
// 2. In Development, we build the stand alone main.js entry which would be used into index.html
const inputFile = production ? 'src/App.svelte' : 'src/main.js';

// 1. In Production, we build an EcmaScript bundle.mjs module
// 2. In Development, we build a standard Javascript bundle.js
const outputFile = production ? 'public/bundle.mjs' : 'public/bundle.js';

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
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
		
		// TODO! Only copy at build time
		production && copy({
			// Copy EcmaScript modules and dependent resources from public folder
			files: ['public/*.mjs', 'public/*.mjs.map', 'public/bundle.css', 'public/*.css.map'],
			// To external folder static-apps from where the parent application host can load it
			dest: '../../static-apps/hello-world',
			options: {
				verbose: true
			}
		})
	]
};
