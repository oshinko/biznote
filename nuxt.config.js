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

  generate: {
    dir: 'docs'
  },

  publicRuntimeConfig: {
    baseURL: 'http://localhost:3000'
  },

  router: {
    base: process.env.PREFIX
  }
}
