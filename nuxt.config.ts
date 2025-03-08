import process from 'node:process'

const isDev = process.env.NODE_ENV === 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/icon"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  experimental: {
    viewTransition: true,
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  routeRules: {
    '/': { ssr: true, prerender: true, ...(isDev ? {} : { cache: { swr: true, maxAge: 120 } }) },
    '/admin/*': { ssr: false },
    // NOTE: Work on both client-side and server-side
    // '/api/**': {
    //   proxy: `${process.env.API_ENDPOINT}/**`
    // }
  },
});
