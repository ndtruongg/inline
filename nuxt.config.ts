import process from "node:process";

const isDev = process.env.NODE_ENV === "development";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  experimental: {
    viewTransition: true,
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
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
    "/": {
      ssr: true,
      prerender: true,
      ...(isDev ? {} : { cache: { swr: true, maxAge: 120 } }),
    },
    "/admin/*": { ssr: false },
    // NOTE: Work on both client-side and server-side
    // '/api/**': {
    //   proxy: `${process.env.API_ENDPOINT}/**`
    // }
  },

  site: {
    url: process.env.PUBLIC_SITE_URL,
    name: "My Awesome Website",
  },

  sitemap: {
    sources: [`${process.env.PUBLIC_SITE_URL}/sitemap.xml`],
    exclude: ["/admin/**", "/example"],
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: "weekly",
    },
  },

  robots: {
    sitemap: `${process.env.PUBLIC_SITE_URL || 'https://toivacuocsong.com'}/sitemap.xml`,
    disallow: ["/admin/**", "/example"],
  },

  runtimeConfig: {
    apiProxyUrl: process.env.API_ENDPOINT,
    githubToken: process.env.GITHUB_TOKEN,
    githubRepo: process.env.GITHUB_REPO,
    githubOwner: process.env.GITHUB_OWNER,
    githubBranch: process.env.GITHUB_BRANCH,

    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },
});
