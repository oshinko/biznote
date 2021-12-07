export default {
  build: {
    extend(config) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(md|txt)$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/
      })
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

  plugins: [
    '~/plugins/marked'
  ],

  publicRuntimeConfig: {
    baseURL: 'http://localhost:3000'
  }
}
