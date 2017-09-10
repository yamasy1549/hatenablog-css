# はてなブログをいいかんじにするCSS

example: http://yamasy1549.hateblo.jp/

## ファイル構成

```
.
├── gulpfile.js
├── package.json
├── src
│   ├── _reset.css
│   └── style.css
├── style.css (output)
└── yarn.lock
```

## コマンド

`/src` 以下の CSS を watch して、autoprefixer でゴニョゴニョする
```
yarn watch
```

`/src` 以下の CSS を autoprefixer でゴニョゴニョして、圧縮して、 `style.css` として吐く
```
yarn build
```
