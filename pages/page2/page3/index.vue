<template>
  <div><h1 id="インボイス制度について">インボイス制度について</h1>
<p><img src="1200x630.png" alt="Image"></p>
<p>インボイス制度 (適格請求書等保存方式) の概要パンフレット P19 によると、免税事業者が 23/3/31 までに適格請求書発行登録をしておけば、特例として 23/10/1 から課税事業者となることが可能 (通常は年度開始日から) であり「課税事業者選択届出書」の提出は必要ないらしい。</p>
<p>ただし 2021 年度に 1,000 万円 (税込) を超える売上がある場合は、2023 年度の課税期間開始日から課税事業者になってしまうので、この特例は適用されない。</p>
<p>インボイス制度 (適格請求書等保存方式) の概要パンフレット P20 によると、免税事業者が 23/10/1 に適格請求書発行事業者になると自動で課税事業者になる上に、簡易課税制度選択届出をその課税期間中に提出すれば 23/10/1 から簡易課税制度を適用できる。つまり、どういうことか分かるか？</p>
<p>適格請求書発行者申請は今してもいいが、簡易課税制度選択届出と提出先が違うため、インボイス制度開始期の基準期間となる今年分の確定申告後がベストタイミング。これは、基準期間売上高が一千万円以下であることを確定させた後の方が、事務処理がスムーズにいく可能性が高いため (国税局に相談済)。</p>
</div>
</template>

<script>
import image1200x630 from '@/assets/pages/page2/page3/1200x630.png'
import meta from '@/assets/pages/page2/page3/meta.yml'

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
