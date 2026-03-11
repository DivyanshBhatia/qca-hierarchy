import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'qca-hierarchy' with your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/qca-hierarchy/',
})
