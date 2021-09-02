import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: './public',
	plugins: [
		reactRefresh(),
		VitePWA({
			manifest: require('./public/manifest.json'),
			mode: 'development',
			injectRegister: 'script',
		}),
	],
	server: {
		host: true,
	},
});
