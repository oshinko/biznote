# nuxt2-static

## ページを追加または修正する手順

- [指摘事項を記載した Issue を作成する](../../issues/new)


### 自分で行う場合

- [./assets/pages](./assets/pages) より、ページを追加・修正する
- Pull Request を作成する
- マージ後、ビルドして git-push し [GitHub Pages](https://oshinko.github.com/nuxt2-static) の更新を確認する


## 開発

### 開発サーバーを起動する

```sh
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev
```


### GitHub Pages にデプロイする

```sh
# generate static project to docs/ directory
PREFIX=/nuxt2-static yarn generate

# serve the docs/ directory
yarn start --spa --target static

# push to repository
git add . && git commit -m "Update dist resources" && git push
```
