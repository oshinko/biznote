# Biznote

## ページを追加または修正する手順

- [指摘事項を記載した Issue を作成する](../../issues/new)


### 自分で行う場合

- [./assets/pages](./assets/pages) より、ページを追加・修正する
- [Pull Request](../../pulls) を作成する
- マージ後 [GitHub Pages](https://oshinko.github.io/biznote) の更新を確認する


## 開発

### 環境変数ファイルを作成する

```sh
cat << EOF > .env
BASE_URL=http://localhost:3000/biznote
EOF
```


### 開発サーバーを起動する

```sh
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev
```


### 静的ホスティングを試す

```sh
# generate static project to dist/ directory
yarn generate

# serve the dist/ directory
yarn start --spa
