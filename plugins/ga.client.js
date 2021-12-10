export default async ({ $config }, inject) => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {dataLayer.push(arguments);}
  gtag('js', new Date());
  const view = () => gtag('config', $config.google.analytics.target)
  view()
  inject('ga', {
    view,
    event(name, params = {}) {
      gtag('event', name, params)
    },
    login(params = { method: 'Google' }) {
      this.event('login', params)
    },
    logout(params = { method: 'Google' }) {
      this.event('logout', params)
    }
  })
}
