# ベースイメージとしてNode.jsを使用
FROM node:latest

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

RUN cat /app/package.json
# ビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "run", "dev"]

# ポート3000を公開
EXPOSE 3000
