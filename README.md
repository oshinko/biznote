# nuxt2-static

## ページの追加と修正

- [./assets/pages](./assets/pages) より、ページを追加・修正する
- Pull Request を作成する
- マージ後、ビルドして git-push し [GitHub Pages](https://oshinko.github.com/nuxt2-static) の更新を確認する

## Build Setup

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev
```


## Deploy to GitHub Pages

```sh
# generate static project to docs/ directory
PREFIX=/nuxt2-static yarn generate

# serve the docs/ directory
yarn start --spa --target static
```
