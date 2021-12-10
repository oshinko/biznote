const baseURL = process.env.BASE_URL ?
  new URL(process.env.BASE_URL) :
  {}

const scripts = []

if (process.env.GOOGLE_ANALYTICS)
  scripts.push({ src: process.env.GOOGLE_ANALYTICS, async: true })

export default {
  build: {
    extend(config) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.ya?ml$/,
        type: 'json',
        loader: 'yaml-loader',
        exclude: /(node_modules)/
      })
    }
  },

  components: true,

  css: [
    '~/assets/css/main'
  ],

  generate: {
    dir: process.env.GENERATE_DIR
  },

  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    script: scripts
  },

  publicRuntimeConfig: {
    baseURL,
    title: process.env.TITLE
  },

  router: {
    base: baseURL.pathname,
    middleware: 'redirect-trailing-slash',
    trailingSlash: true
  },

  target: 'static'
}
