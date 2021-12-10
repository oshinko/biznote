import fs from 'fs'
import path from 'path'
import url from 'url'

import { marked } from 'marked'

async function *walk(dir) {
  const paths = await fs.promises.readdir(dir)

  if (paths.length === 0)
    return

  for (const relative of paths) {
    const absPath = path.resolve(dir, relative)

    const stats = await fs.promises.stat(absPath)

    yield { absolute: absPath, stats }

    if (stats.isDirectory())
      for await (const path of walk(absPath))
        yield path
  }
}

const here = path.dirname(url.fileURLToPath(import.meta.url))
const pageAssetsDir = path.join(here, 'assets/pages')
const pagesDir = path.join(here, 'pages')
const tmplDir = path.join(here, 'templates')
const tmplPageFile = path.join(tmplDir, 'Page.vue')
const tmplPageFileContent =
  await fs.promises.readFile(tmplPageFile, { encoding: 'utf8' })
const tmplPlaceholders = {
  content: {
    pattern: /\/\*+ +content +\*+\//
  },
  description: {
    pattern: /\/\*+ +description +\*+\//,
    default: ''
  },
  image1200x630: {
    pattern: /\/\*+ +image1200x630 +\*+\//,
    default: '@/assets/pages/1200x630.png'
  },
  title: {
    pattern: /\/\*+ +title +\*+\//,
    default: ''
  }
}
const absHrefAnchorTag = /<a +href="(\/[^"]*)"[^>]*>([^<]+)<\/a>/g
const allHrefAnchorTag = /<a +href="([^"]*)"[^>]*>([^<]+)<\/a>/g
const imageTag = /<img +src="([^"]*)"[^>]*>/g

async function getPageBundles() {
  const results = {}

  for await (const pageAssetPath of walk(pageAssetsDir)) {
    if (pageAssetPath.stats.isDirectory())
      continue
  
    const relPageAssetFile = path.relative(pageAssetsDir, pageAssetPath.absolute)
    const bundleDir = path.dirname(relPageAssetFile)

    if (!(bundleDir in results))
      results[bundleDir] = []

    results[bundleDir].push(path.basename(relPageAssetFile))
  }

  return results
}

await fs.promises.rm(pagesDir, { recursive: true, force: true })

for (const [bundleDir, files] of Object.entries(await getPageBundles())) {
  const pageDir = path.join(pagesDir, bundleDir)
  await fs.promises.mkdir(pageDir, { recursive: true })

  let page = tmplPageFileContent

  for (const file of files) {
    const ext = path.extname(file)
    const stem = path.basename(file, ext)
    const pageAssetFile = path.join(pageAssetsDir, bundleDir, file)
    const relPageAssetFile = path.relative(here, pageAssetFile)
    const importablePath = '@/' + relPageAssetFile.split(path.sep).join('/')

    if (stem === 'content' && ext === '.md') {
      const markdown =
        await fs.promises.readFile(pageAssetFile, { encoding: 'utf8' })
      let html = marked.parse(markdown)
        .replace(absHrefAnchorTag, '<NuxtLink to="$1">$2</NuxtLink>')

      for (const [matched, href, text] of html.matchAll(allHrefAnchorTag)) {
        if (href.match(/[^:]+:/))
          continue
        if (path.isAbsolute(href))
          continue
        const to = '/' + path.relative(pagesDir, path.join(pageDir, href))
          .split(path.sep).join('/')
        html = html.replace(matched, `<NuxtLink to="${to}">${text}</NuxtLink>`)
      }

      for (const [matched, src] of html.matchAll(imageTag)) {
        if (src.match(/[^:]+:/))
          continue
        const assetSrc = '@' + path.join('/assets/pages', bundleDir, src)
          .split(path.sep).join('/')
        html = html.replace(
          matched,
          matched.replace(/src="[^"]*"/, `src="${assetSrc}"`)
        )
      }

      page = page.replace(tmplPlaceholders.content.pattern, html)

      const h1 = (html.match(/<h1[^>]*>([^<]+)<\/h1>/) ?? [])[1]

      if (h1)
        page = page.replace(tmplPlaceholders.title.pattern, h1)

      const p = (html.match(/<p[^>]*>([^<]+)<\/p>/) ?? [])[1]

      if (p)
        page = page.replace(tmplPlaceholders.description.pattern, p)
    }

    else if (stem === '1200x630' && ext.match(/\.pi?ng/))
      page =
        page.replace(tmplPlaceholders.image1200x630.pattern, importablePath)
  }

  const pageFilled = Object.entries(tmplPlaceholders).reduce(
    (acc, [_, { pattern, default: value }]) =>
      [null, undefined].includes(value) ? acc : acc.replace(pattern, value),
    page)

  await fs.promises.writeFile(path.join(pageDir, 'index.vue'), pageFilled)
}
