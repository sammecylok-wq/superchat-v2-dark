# SuperChat Marketing Website V1

SuperChat Marketing 的全新多页面营销网站，优先服务马来西亚美容、美发与头皮护理行业。网站强调真实业务流程、WhatsApp AI 接客、预约、通知与真人接手，不使用虚构客户、评价、数字或案例。

## 技术架构

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 3
- React Router
- Lucide React

## 安装与本地运行

建议使用 Node.js 20。

```bash
npm install
npm run dev
```

Vite 会显示本地网址。打开该网址即可预览。

## 检查与构建

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

Production Build 输出在 `dist/`。

## 内容修改位置

- 品牌、Founder、联系方式与社交链接：`src/config/siteConfig.ts`
- 首页文案与卡片资料：`src/pages/HomePage.tsx`
- Demo 页面：`src/pages/DemoPage.tsx`
- About 页面：`src/pages/AboutPage.tsx`
- Contact 表单：`src/pages/ContactPage.tsx`
- Privacy 与 Terms：`src/pages/LegalPages.tsx`

正式 WhatsApp 顾问号码集中配置在 `src/config/siteConfig.ts`。所有 WhatsApp CTA 使用统一 URL 产生函数与 `601161207960`，公开显示格式为 `+60 11-6120 7960`。

## 替换影片

将真实 MP4 放入 `public/videos/`，并将对应 WebP poster 放入 `public/images/video-posters/`。文件名与路径见 `content-needed.md`。影片不存在或加载失败时，页面自动显示专业占位区，不会显示 broken video。

## 替换图片

将真实 WebP 图片放入 `public/images/founder/` 或 `public/images/proof/`。必须先移除号码、私人资料、API Key、Token、Webhook、Credential 与敏感 Workflow。图片不存在时，页面自动显示文件名与等待真实素材提示。

## Cloudflare Pages Preview

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20`

完整步骤请看 `deployment-guide.md`。

## 正式部署前检查

1. 填写正式 WhatsApp、Email 与社交链接。
2. 加入经过隐私处理的真实影片、poster 与截图。
3. 由专业人士复核 Privacy Policy 与 Terms of Use。
4. 重新执行 typecheck、lint 与 build。
5. 使用新的 Cloudflare Pages Preview Project 检查所有页面。
6. 验证所有正式 URL、Meta、robots 与 sitemap。
7. 确认旧网站回退方案后，才讨论正式切换。

> 重要：本 V1 不得直接绑定 `superchatmarketing.com`，不得覆盖或删除现有 Cloudflare Pages Project 或 Deployment。

## Bilingual content (Chinese / English)

The site uses one shared React component tree and one route set for both languages. Chinese is the default language; English is selected from the Header and persisted under the browser key `superchat-language`.

- Translation dictionary: `src/i18n/translations.ts`
- Language types, default and storage key: `src/i18n/types.ts`
- Provider and document-language synchronization: `src/i18n/LanguageProvider.tsx`
- Consumer hook: `src/i18n/useLanguage.ts`
- Header control: `src/components/LanguageSwitcher.tsx`

To update copy, edit the matching key in both `zh` and `en` inside `translations.ts`. Keep the two language objects structurally identical so every page, form state, SEO field and accessibility label has a translated value.

To change the default language, update `defaultLanguage` in `src/i18n/types.ts`. To add another language, extend the `Language` type and `supportedLanguages`, add a complete dictionary branch, then add its option to `LanguageSwitcher`.

The current implementation intentionally keeps the same canonical URL when switching languages. If dedicated `/zh/...` and `/en/...` URLs are introduced later, update routing, canonical URLs, sitemap entries and `hreflang` tags together.
