const baseURL = process.env.BASE_URL ?
  new URL(process.env.BASE_URL) :
  {}

const meta = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' }
]

if (process.env.GOOGLE_SITE_VERIFICATION)
  meta.push({
    name: 'google-site-verification',
    content: process.env.GOOGLE_SITE_VERIFICATION
  })

const script = []
const google = { analytics: {} }

if (process.env.GOOGLE_ANALYTICS) {
  script.push({ src: process.env.GOOGLE_ANALYTICS, async: true })
  google.analytics.target =
    new URL(process.env.GOOGLE_ANALYTICS).searchParams.id
}

export default {
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
    meta,
    script
  },

  plugins: [
    '~/plugins/ga.client'
  ],

  publicRuntimeConfig: {
    baseURL,
    description: process.env.DESCRIPTION,
    google,
    title: process.env.TITLE
  },

  router: {
    base: baseURL.pathname,
    middleware: 'redirect-trailing-slash',
    trailingSlash: true
  },

  target: 'static'
}
