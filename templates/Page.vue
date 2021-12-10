<template>
  <div class="d-flex flex-direction-column">
    <header>
      <Header />
    </header>

    <main>
      /* content */
    </main>
  </div>
</template>

<script>
import image1200x630 from '/* image1200x630 */'

export default {
  async asyncData({ $config, route }) {
    return {
      title: '/* title */' || $config.title,
      og: {
        url: `${$config.baseURL.href}${route.path}`,
        image: `${$config.baseURL.origin}${image1200x630}`
      }
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '/* description */' || this.$config.description
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: '/* description */' || this.$config.description
        },
        { hid: 'og:image', property: 'og:image', content: this.og.image },
        { hid: 'og:image:alt', property: 'og:image:alt', content: this.title },
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: this.og.url }
      ]
    }
  }
}
</script>
