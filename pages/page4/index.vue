<template>
  <div><h1 id="page4">page4</h1>
<p>router-link testing.</p>
<ul>
<li><NuxtLink to="/">../</NuxtLink></li>
<li><NuxtLink to="/">/</NuxtLink></li>
<li><NuxtLink to="/page4">/page4</NuxtLink></li>
<li><NuxtLink to="/page4">../page4</NuxtLink></li>
</ul>
</div>
</template>

<script>
import image1200x630 from '@/assets/pages/1200x630.png'
import meta from '@/assets/pages/meta.yml'

export default {
  async asyncData({ $config, route }) {
    return {
      title: meta.title ?? 'page4' ?? $config.title,
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
