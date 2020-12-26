# Svelte Micro Frontends

This is an experiment that uses Sapper/Svelte combination in a so called **micro frontends** way.

* The main project is the basic Sapper template
* In the **/apps** folder I've published independent Svelte apps (npx degit sveltejs/template blog-posts) 
* During Svelte apps build (npm run build) the result is copied to **/static-apps** folder
* There are some tweaks being (explained later) to the basic Svelte apps so they work with the main Sapper project
* Sapper project has a **/routes/apps/app.svelte** page that knows how to load Svelte apps on runtime
* Whenever you want to navigate to a specific app (from inside the Sapper application), use http://localhost:3000/apps/name-of-your-app-folder
and you'll get to the app while still having the Sapper application layout (header, footer etc)



