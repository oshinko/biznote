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
  image1200x630: {
    pattern: /\/\*+ +image1200x630 +\*+\//,
    default: '@/assets/pages/1200x630.png'
  },
  meta: {
    pattern: /\/\*+ +meta +\*+\//,
    default: '@/assets/pages/meta.yml'
  }
}
const relAnchor = /<a +.*href="([^"]*)"[^>]*>([^<]+)<\/a>/g

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

fs.promises.rm(pagesDir, { recursive: true, force: true })

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
        .replace(
          /<a +.*href="(\/[^"]*)"[^>]*>([^<]+)<\/a>/g,
          '<NuxtLink to="$1">$2</NuxtLink>'
        )

      for (const [matched, href, text] of html.matchAll(relAnchor)) {
        if (href.match(/[^:]+:/))
          continue
        if (path.isAbsolute(href))
          continue
        const to = '/' + path.relative(pagesDir, path.join(pageDir, href))
          .split(path.sep).join('/')
        html = html.replace(matched, `<NuxtLink to="${to}">${text}</NuxtLink>`)
      }

      page = page.replace(tmplPlaceholders.content.pattern, html)
    }

    else if (stem === '1200x630' && ext.match(/\.pi?ng/))
      page =
        page.replace(tmplPlaceholders.image1200x630.pattern, importablePath)

    else if (stem === 'meta' && ext.match(/\.ya?ml/))
      page = page.replace(tmplPlaceholders.meta.pattern, importablePath)
  }

  const pageFilled = Object.entries(tmplPlaceholders).reduce(
    (acc, [_, { pattern, default: value }]) =>
      [null, undefined].includes(value) ? acc : acc.replace(pattern, value),
    page)

  await fs.promises.writeFile(path.join(pageDir, 'index.vue'), pageFilled)
}
