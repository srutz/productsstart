import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tailwindcss(),
		tanstackStart({
			prerender: {
				// Switch to true to enable prerendering
				enabled: true,

				// Disable if you need pages to be at `/page.html` instead of `/page/index.html`
				autoSubfolderIndex: true,

				// If disabled, only the root path or the paths defined in the pages config will be prerendered
				autoStaticPathsDiscovery: true,

				// How many prerender jobs to run at once
				concurrency: 1,

				// Whether to extract links from the HTML and prerender them also
				crawlLinks: true,

				// Filter function takes the page object and returns whether it should prerender
				filter: ({ path }) => !path.startsWith("/do-not-render-me"),

				// Number of times to retry a failed prerender job
				retryCount: 1,

				// Delay between retries in milliseconds
				retryDelay: 1000,

				// Maximum number of redirects to follow during prerendering
				maxRedirects: 5,

				// Fail if an error occurs during prerendering
				failOnError: true,

				// Callback when page is successfully rendered
				onSuccess: ({ page }) => {
					console.log(`Rendered ${page.path}!`);
				},
			},
			// Optional configuration for specific pages
			// Note: When autoStaticPathsDiscovery is enabled (default), discovered static
			// routes will be merged with the pages specified below
			pages: [],
		}),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	],
});

export default config;
