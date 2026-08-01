import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, "dist");
const indexPath = join(distRoot, "index.html");
const template = await readFile(indexPath, "utf8");

const domain = "https://superchatmarketing.com";
const image = `${domain}/images/logo/superchat-logo.png`;

const pages = [
  {
    path: "/",
    title: "马来西亚 AI WhatsApp 自动化 | SuperChat Marketing",
    description: "SuperChat Marketing 帮助马来西亚企业通过 AI 自动处理 WhatsApp 客服、客户筛选、预约、跟进和人工介入。",
    h1: "为马来西亚企业打造的 AI WhatsApp 自动化",
    keepStructuredData: true,
  },
  {
    path: "/demo",
    title: "AI WhatsApp 系统 Demo（马来西亚）| SuperChat Marketing",
    description: "观看 SuperChat Marketing 的真实 AI WhatsApp 自动化 Demo，了解 FAQ 回复、客户筛选、预约、语音消息与负责人通知流程。",
    h1: "真实系统 Demo",
  },
  {
    path: "/about",
    title: "关于我们 | 马来西亚 AI WhatsApp 自动化 | SuperChat Marketing",
    description: "了解 SuperChat Marketing 如何为马来西亚企业建立实用的 AI WhatsApp 客服、客户筛选、预约与跟进自动化系统。",
    h1: "关于 SuperChat Marketing",
  },
  {
    path: "/contact",
    title: "预约 AI WhatsApp 自动化 Demo | SuperChat Marketing",
    description: "联系 SuperChat Marketing 顾问，预约适合马来西亚企业的 AI WhatsApp 客服与业务自动化系统 Demo。",
    h1: "预约 SuperChat Demo",
  },
  {
    path: "/privacy",
    title: "隐私政策｜SuperChat Marketing",
    description: "SuperChat Marketing 网站隐私政策。",
    h1: "隐私政策",
  },
  {
    path: "/terms",
    title: "使用条款｜SuperChat Marketing",
    description: "SuperChat Marketing 网站使用条款。",
    h1: "使用条款",
  },
];

const notFound = {
  path: "/404",
  title: "页面不存在｜SuperChat Marketing",
  description: "找不到你要查看的页面。",
  h1: "找不到这个页面",
  noindex: true,
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Unable to replace ${label}`);
  return html.replace(pattern, replacement);
}

function renderPage(page) {
  const canonical = `${domain}${page.path === "/" ? "/" : page.path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const h1 = escapeHtml(page.h1);
  let html = template;

  html = replaceRequired(html, /<html lang="[^"]+"/, '<html lang="zh"', "html lang");
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, "title");
  html = replaceRequired(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`, "description");
  html = replaceRequired(html, /<meta name="robots" content="[^"]*"\s*\/>/, `<meta name="robots" content="${page.noindex ? "noindex, nofollow" : "index, follow"}" />`, "robots");
  html = replaceRequired(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`, "canonical");
  html = replaceRequired(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`, "og:title");
  html = replaceRequired(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`, "og:description");
  html = replaceRequired(html, /<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`, "og:url");
  html = replaceRequired(html, /<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`, "og:image");
  html = replaceRequired(html, /<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`, "twitter:title");
  html = replaceRequired(html, /<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`, "twitter:description");
  html = replaceRequired(html, /<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${image}" />`, "twitter:image");

  if (!page.keepStructuredData) {
    html = html.replace(/\s*<script id="(?:organization|website)-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
  }

  const fallback = `<noscript><main><h1>${h1}</h1><p>${description}</p></main></noscript>`;
  html = replaceRequired(html, /<div id="root"><\/div>/, `<div id="root">${fallback}</div>`, "root fallback");

  const titleCount = (html.match(/<title>/g) || []).length;
  const canonicalCount = (html.match(/rel="canonical"/g) || []).length;
  if (titleCount !== 1 || canonicalCount !== 1) {
    throw new Error(`${page.path} generated duplicate title or canonical tags`);
  }

  return html;
}

for (const page of pages) {
  const html = renderPage(page);
  if (page.path === "/") {
    await writeFile(indexPath, html, "utf8");
    continue;
  }

  const slug = page.path.slice(1);
  const directoryOutput = join(distRoot, slug, "index.html");
  const cleanUrlOutput = join(distRoot, `${slug}.html`);
  await mkdir(dirname(directoryOutput), { recursive: true });
  await writeFile(directoryOutput, html, "utf8");
  await writeFile(cleanUrlOutput, html, "utf8");
}

await writeFile(join(distRoot, "404.html"), renderPage(notFound), "utf8");
console.log(`Generated ${pages.length} public route HTML files and 404.html.`);
