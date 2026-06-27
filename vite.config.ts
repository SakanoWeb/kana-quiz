import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// IMPORTANT for GitHub Pages (project pages):
// `base` must match the repository name exactly, e.g. if the repo is
// github.com/your-user/kana-quiz  ->  base: '/kana-quiz/'.
// For a custom domain or user pages (user.github.io), use base: '/'.
//
// It is read from an env var so this file does not need editing:
//   BASE_PATH=/kana-quiz/ npm run build
// and defaults to '/kana-quiz/'.
const base = process.env.BASE_PATH ?? '/kana-quiz/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
    target: 'es2022',
  },
});
