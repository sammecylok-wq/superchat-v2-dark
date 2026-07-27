# Cloudflare Pages Preview 部署说明

本阶段只建立独立 Preview，不连接或切换正式域名。

## 安全原则

- 使用新的 Cloudflare Pages Project，建议名称：`superchat-website-preview`
- 不使用或修改现有正式 Project
- 不绑定 `superchatmarketing.com`
- 只使用 Cloudflare 提供的 `pages.dev` URL 检查
- 不删除现有 Cloudflare Pages Deployment
- 完成验收后才考虑正式切换
- 正式切换前必须保留旧网站与明确的回退方案

## Cloudflare Build 设置

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Node.js version: 20
```

React Router 的 SPA fallback 已通过 `public/_redirects` 配置。

## 方式一：GitHub 连接

1. 为本 V1 建立一个全新的 GitHub Repository。
2. 只把当前项目代码推送到该 Repository，不混入其他项目。
3. 在 Cloudflare Dashboard 选择 Workers & Pages → Create application → Pages → Connect to Git。
4. 选择刚建立的新 Repository。
5. Project name 填写 `superchat-website-preview`。
6. Framework preset 选择 Vite，并填写上方 Build 设置。
7. 确认没有 Custom Domain。
8. 部署后只打开新产生的 `pages.dev` URL。
9. 检查 `/`、`/demo`、`/about`、`/contact`、`/privacy`、`/terms` 与不存在页面。

之后每次推送可产生新的 Preview。不要把此 Preview Project 连接到现有正式域名。

## 方式二：Direct Upload

1. 在本机执行 `npm install`。
2. 执行 `npm run typecheck`、`npm run lint` 与 `npm run build`。
3. 确认 `dist/` 已产生且检查通过。
4. 在 Cloudflare Dashboard 建立新的 Pages Project，或使用 Wrangler 对新的 Preview Project 上传 `dist/`。
5. Project name 使用 `superchat-website-preview`。
6. 上传后只使用 Cloudflare 提供的 `pages.dev` URL。
7. 不新增 Custom Domain，不编辑现有正式 DNS。

## Preview 验收

- 所有路径直接打开或重新整理后仍可显示。
- WhatsApp 正式号码尚未填入时，不产生错误链接。
- 所有缺少的真实媒体显示专业 Placeholder。
- Contact 表单验证、FAQ Accordion、Mobile Menu 与键盘操作正常。
- 手机与桌面布局无横向滚动或重叠。
- Browser Console 没有错误。

## 未来正式切换前

1. 补齐所有真实联系资料与媒体。
2. 完成 Privacy 与 Terms 专业复核。
3. 在 Preview URL 完成业务、技术、Accessibility 与多装置验收。
4. 记录现有网站、DNS、Project 与 Deployment 状态。
5. 制定回退步骤并保留旧 Deployment。
6. 取得明确批准后，才进行独立的正式切换工作。
