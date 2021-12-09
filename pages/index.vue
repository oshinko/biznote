<template>
  <div>
    <Header />

    <main>
      <h1 id="welcome">Welcome!</h1>
<p>事業者のナレッジベースです。</p>
<ul>
<li><NuxtLink to="/taxes/%E6%B6%88%E8%B2%BB%E7%A8%8E/%E8%BB%BD%E6%B8%9B%E7%A8%8E%E7%8E%87">軽減税率</NuxtLink><!-- - [課税事業者](taxes/消費税/課税事業者) -->
<!-- - [給与所得](taxes/所得税/給与所得) --></li>
</ul>

    </main>
  </div>
</template>

<script>
import image1200x630 from '@/assets/pages/1200x630.png'
import meta from '@/assets/pages/meta.yml'

export default {
  async asyncData({ $config, route }) {
    return {
      title: meta.title ?? 'Welcome!' ?? $config.title,
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
