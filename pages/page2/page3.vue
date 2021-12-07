<template>
  <div v-html="content"></div>
</template>

<script>
import content from '@/assets/page2/page3/content.md'
import image from '@/assets/page2/page3/1200x630.png'
import meta from '@/assets/page2/page3/meta.yml'

export default {
  async asyncData({ $marked, route, req }) {
    const html = $marked.parse(content)
    const host = process.server ? req.headers.host : ''

    return {
      title: meta.title ?? (html.match(/<h1[^>]+>([^<]+)<\/h1>/) ?? [])[1],
      content: html,
      og: {
        url: `https://${host}${route.path}`,
        image: `https://${host}${image}`
      }
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: meta.description
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: meta.description
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
