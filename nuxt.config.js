const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? ''
    : 'https://howie12207-blog.herokuapp.com'

export default {
  head: {
    title: "Howie's blog",
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'blog' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [
    '@/assets/css/global.scss',
    '@/assets/css/elementUI.css',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
  ],

  plugins: [
    '@/plugins/api',
    '@/plugins/elementUI',
    '@/plugins/format',
    { src: '@/plugins/quillEditor', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],

  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],

  publicRuntimeConfig: {
    BASE_URL,
  },

  axios: {
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
  },

  build: {},

  router: {
    middleware: ['auth'],
  },

  loading: {
    color: '#3b82f6',
    height: '4px',
  },

  serverMiddleware: ['~/server/index.ts'],
}
