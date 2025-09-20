import { defineConfig } from 'vite';
import { resolve } from 'path';
import nunjucksRender from 'vite-plugin-nunjucks';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/templates/index.njk'),
        about: resolve(__dirname, 'src/templates/about.njk'),
        contact: resolve(__dirname, 'src/templates/contact.njk')
      }
    }
  },
  plugins: [
    nunjucksRender()
  ]
});
