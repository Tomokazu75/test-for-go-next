# ベースイメージとして公式のGoイメージを使用
FROM golang:1.22.6

# 作業ディレクトリを設定
WORKDIR /app

# Goモジュールをキャッシュするためにgo.modとgo.sumをコピー
COPY go.mod ./
COPY go.sum ./
# RUN go mod download

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
# RUN go build -o main .

# 実行可能ファイルを実行
# CMD ["go", "run", "main.go"]
