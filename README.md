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
# switch to main branch
git checkout main

# generate static project to docs/ directory
GENERATE_DIR=./docs PREFIX=/nuxt2-static yarn generate

# serve the docs/ directory
GENERATE_DIR=./docs PREFIX=/nuxt2-static yarn start --spa

# push main branch
git add ./pages
git commit -m "Update pages"
git push origin main

# switch to build branch
build=build-`git rev-parse --short HEAD`
git branch $build main
git checkout $build

# push build branch to origin/pages
git add ./docs
git commit -m "Update docs"
git push origin $build:pages -f
```
