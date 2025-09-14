import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { configDotenv } from "dotenv";

configDotenv(); // Load .env file for Vite process

export default defineConfig({
  plugins: [sveltekit()],
});
