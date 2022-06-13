# 牛马搜索-React

> 字节跳动青训营大作业前端部分

后端地址：[Patrick-Star-CN/search-engine](https://github.com/Patrick-Star-CN/search-engine)

## Quick start

Before you launch this, you should add config file `config.ts` in `/src` that clarifies your backend service host.

```tsx
export const DevContext = {
  baseURL: "http://localhost:8080"
};
```

Then

```bash
yarn
yarn dev
```

Finally, you can visit the page for preview on `http://localhost:3000/`

## Todo

- [ ] 图片搜索固定高度
- [ ] 图片搜索虚拟列表支持
- [ ] 打包后反向代理研究

## Files

```tree
src
├── api
│   ├── axios.ts
│   ├── deleteCollection.ts
│   ├── getCollection.ts
│   ├── login.ts
│   ├── postCollection.ts
│   ├── related.ts
│   ├── search.ts
│   ├── searchImg.ts
│   └── submitHistory.ts
├── components
│   ├── RelatedList.tsx
│   ├── ResultItem
│   │   ├── index.css
│   │   └── index.tsx
│   ├── RichText.tsx
│   ├── SEFooter.tsx
│   ├── SEHeader
│   │   ├── index.css
│   │   └── index.tsx
│   ├── SELoading.tsx
│   ├── SESider
│   │   ├── index.css
│   │   └── index.tsx
│   ├── SESwitch.tsx
│   └── UserProfile.tsx
├── config.ts
├── favicon.svg
├── index.css
├── logo.svg
├── main.tsx
├── pages
│   ├── App.css
│   ├── App.tsx
│   └── SearchResult
│       ├── index.css
│       └── index.tsx
├── routes
│   ├── ImageResult
│   │   ├── index.css
│   │   └── index.tsx
│   └── TextResult
│       ├── index.css
│       └── index.tsx
└── vite-env.d.ts
```
