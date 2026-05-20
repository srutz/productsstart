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
	build: {
		// Sourcemaps: standardmäßig deaktiviert (kein Größen-Overhead im Build)
		sourcemap: false,
		//   true     => .map-Dateien neben dem Bundle (für externe Tools)
		//   'inline' => Base64-codiert direkt im Bundle (bequem, aber größer)
		//   'hidden' => .map-Datei vorhanden, aber kein //# sourceMappingURL-Kommentar

		// Minification: esbuild ist der Default - schnell und gut
		minify: "oxc",
		//   'esbuild' => Standard: sehr schnell, leicht schlechtere Kompression
		//   'terser'  => langsamer, aber höhere Kompressionsrate (~5-10% kleiner)
		//   false     => kein Minify (nur für Debugging/Analyse sinnvoll)

		// CSS-Minification: seit Vite 4.4 separat steuerbar
		cssMinify: true,
		//   true           => verwendet denselben Minifier wie `minify` (esbuild)
		//   false          => CSS bleibt unminifiziert
		//   'lightningcss' => alternatives CSS-Tool, schneller und moderner als esbuild
		//   'esbuild'      => explizit esbuild für CSS

		// Chunk-Größen-Warnung: Warnung ab 500 KB (Default)
		chunkSizeWarningLimit: 50,
	},
});

export default config;
