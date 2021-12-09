const TITLE = 'nuxt2-static'
const GOOGLE_ANALYTICS = undefined

const scripts = []

if (GOOGLE_ANALYTICS)
  scripts.push({ src: GOOGLE_ANALYTICS, async: true })

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
    baseURL: 'http://localhost:3000',
    title: TITLE
  },

  router: {
    base: process.env.PREFIX
  }
}
