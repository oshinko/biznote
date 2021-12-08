import fs from 'fs'
import path from 'path'
import url from 'url'

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

for (const [bundleDir, files] of Object.entries(await getPageBundles())) {
  const pageDir = path.join(pagesDir, bundleDir)
  await fs.promises.mkdir(pageDir, { recursive: true })

  const page = files.reduce((acc, file) => {
    const ext = path.extname(file)
    const stem = path.basename(file, ext)
    const pageAssetFile = path.join(pageAssetsDir, bundleDir, file)
    const relPageAssetFile = path.relative(here, pageAssetFile)
    const importablePath = '@/' + relPageAssetFile.replace(/\\/g, '/')

    if (stem === 'content' && ext === '.md')
      acc = acc.replace(/\/\*+ +content +\*+\//, importablePath)

    else if (stem === 'meta' && ext.match(/\.ya?ml/))
      acc = acc.replace(/\/\*+ +meta +\*+\//, importablePath)

    else if (stem === '1200x630' && ext.match(/\.pi?ng/))
      acc = acc.replace(/\/\*+ +image1200x630 +\*+\//, importablePath)

    return acc
  }, tmplPageFileContent)

  await fs.promises.writeFile(path.join(pageDir, 'index.vue'), page)
}
