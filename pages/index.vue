<template>
  <div><h1 id="welcome">Welcome!</h1>
<p>Hello!</p>
<ul>
<li><NuxtLink to="/page1">/page1</NuxtLink></li>
<li><NuxtLink to="/page2">/page2</NuxtLink></li>
<li><NuxtLink to="/page2/page3">/page3</NuxtLink></li>
<li><NuxtLink to="/page4">/page4</NuxtLink></li>
</ul>
</div>
</template>

<script>
import image1200x630 from '@/assets/pages/1200x630.png'
import meta from '@/assets/pages/meta.yml'

export default {
  async asyncData({ $config, route }) {
    return {
      title: meta.title,
      og: {
        url: `${$config.baseURL}${route.path}`,
        image: `${$config.baseURL}${image1200x630}`
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
