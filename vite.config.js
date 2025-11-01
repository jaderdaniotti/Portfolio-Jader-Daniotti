import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['gsap', 'aos', 'react-fast-marquee'],
          ui: ['swiper', 'typed.js', 'fullpage.js']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy per Google Places API - risolve il problema CORS
      '/api/google-places': {
        target: 'https://maps.googleapis.com/maps/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/google-places/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        },
      }
    }
  },
  preview: {
    port: 4173,
    open: true
  }
});