// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-headlessui',
    'nuxt-icon',
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      WAREHOUSE_API_URL: process.env.WAREHOUSE_API_URL,
      WAREHOUSE_URL: process.env.WAREHOUSE_URL,
      ThreePLURL: process.env.THREEPL_URL,
    },
  },
  plugins: ['~/plugins/vue-multiselect'],
  css: ['~/assets/css/style.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/variables.scss";',
        },
      },
    },
  },
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  headlessui: {
    prefix: 'Headless',
  },
  ssr: false,
});
