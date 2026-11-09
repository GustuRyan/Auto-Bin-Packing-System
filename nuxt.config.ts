// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // Keep framework behavior stable against Nuxt changes after this date.
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  // Make the shared Tailwind stylesheet available to every view.
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    // Enables VueUse composables and auto-imports throughout the application.
    '@vueuse/nuxt',
  ],
})
