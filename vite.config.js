// import * as path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import svgr from "vite-plugin-svgr";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()],
//   server: {
//     port: 8080,
//   },
//   resolve: {
//     alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			// svgr options: https://react-svgr.com/docs/options/
			svgrOptions: {
				exportType: "default",
				ref: true,
				svgo: false,
				titleProp: true,
			},
			include: "**/*.svg",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 8080,
	},
	base: "/",
	publicDir: "public",
});
