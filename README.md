# Svelte Micro Frontends

This is an experiment to use a Sapper / Svelte combination in a so called "micro frontend" way.

* The maing project is a basic Sapper project
* In the **/apps** folder we have independent Svelte apps. 
* Building Svelte apps (npm build) also copy them to **/static-apps** folder.
* Sapper project has a **/routes/apps/app.svelte** page that knows how to load Svelte apps on runtime
* Whenever you want to navigate to a specific app (from inside the Sapper application), use http://localhost:3000/apps/name-of-your-app-folder
and you'll get to the app while still retaining the Sapper application layout (header, footer etc).

