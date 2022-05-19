# nm-search-engine-React

字节跳动青训营大作业前端部分

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

## Files

```tree
src
├── api
│   ├── axios.ts
│   └── search.ts
├── components
│   ├── ResultItem.tsx
│   ├── RichText.tsx
│   ├── SEFooter.tsx
│   ├── SEHeader
│   │   ├── index.css
│   │   └── index.tsx
│   └── SESwitch.tsx
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
└── vite-env.d.ts
```
