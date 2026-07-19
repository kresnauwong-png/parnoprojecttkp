import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Plugin wajib untuk compile Tailwind v4
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias path standar milik shadcn
    },
  },
})
