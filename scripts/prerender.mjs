import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, "dist");
const indexPath = join(distRoot, "index.html");
const template = await readFile(indexPath, "utf8");
const geoContent = JSON.parse(await readFile(join(projectRoot, "src", "i18n", "geoContent.json"), "utf8"));
const solutionContent = JSON.parse(await readFile(join(projectRoot, "src", "i18n", "solutionContent.json"), "utf8"));

const domain = "https://superchatmarketing.com";
const image = `${domain}/images/logo/superchat-logo.png`;

const pages = [
  {
    path: "/",
    title: "马来西亚 AI WhatsApp 自动化 | SuperChat Marketing",
    description: "SuperChat Marketing 帮助马来西亚企业通过 AI 自动处理 WhatsApp 客服、客户筛选、预约、跟进和人工介入。",
    h1: "为马来西亚企业打造的 AI WhatsApp 自动化",
    keepStructuredData: true,
    geoKey: "home",
  },
  {
    path: "/demo",
    title: "AI WhatsApp 系统 Demo（马来西亚）| SuperChat Marketing",
    description: "观看 SuperChat Marketing 的真实 AI WhatsApp 自动化 Demo，了解 FAQ 回复、客户筛选、预约、语音消息与负责人通知流程。",
    h1: "真实系统 Demo",
    geoKey: "demo",
  },
  {
    path: "/about",
    title: "关于我们 | 马来西亚 AI WhatsApp 自动化 | SuperChat Marketing",
    description: "了解 SuperChat Marketing 如何为马来西亚企业建立实用的 AI WhatsApp 客服、客户筛选、预约与跟进自动化系统。",
    h1: "关于 SuperChat Marketing",
    geoKey: "about",
  },
  {
    path: "/contact",
    title: "预约 AI WhatsApp 自动化 Demo | SuperChat Marketing",
    description: "联系 SuperChat Marketing 顾问，预约适合马来西亚企业的 AI WhatsApp 客服与业务自动化系统 Demo。",
    h1: "预约 SuperChat Demo",
    geoKey: "contact",
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

pages.push(...Object.values(solutionContent.zh).map((solution) => ({
  path: solution.path,
  title: solution.seo.title,
  description: solution.seo.description,
  h1: solution.hero.title,
  solution,
})));

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

function renderGeoContent(page) {
  if (!page.geoKey) return "";
  const content = geoContent.zh[page.geoKey];
  if (page.geoKey === "home") {
    const questions = content.qa.map((item) => `<article><h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p></article>`).join("");
    const solutions = Object.values(solutionContent.zh).map((item) => `<li><a href="${item.path}">${escapeHtml(item.navLabel)}</a></li>`).join("");
    return `<section><h2>${escapeHtml(content.qaTitle)}</h2><p>${escapeHtml(content.brandSummary)}</p><p>${escapeHtml(content.qaIntro)}</p>${questions}</section><nav aria-label="解决方案"><ul>${solutions}</ul></nav>`;
  }
  if (page.geoKey === "about") {
    return `<section><h2>SuperChat Marketing</h2><p>${escapeHtml(content.entitySummary)}</p><p>${escapeHtml(content.mission)}</p><p>${escapeHtml(content.marketLanguages)}</p></section>`;
  }
  if (page.geoKey === "demo") {
    const steps = content.process.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
    return `<section><p>${escapeHtml(content.capabilitySummary)}</p><h2>${escapeHtml(content.processTitle)}</h2><p>${escapeHtml(content.processIntro)}</p><ol>${steps}</ol></section>`;
  }
  if (page.geoKey === "contact") {
    return `<section><h2>联系 SuperChat Marketing</h2><p>${escapeHtml(content.serviceIntro)}</p><p>${escapeHtml(content.marketLanguages)}</p></section>`;
  }
  return "";
}

function renderSolutionContent(content) {
  const cards = (items) => items.map((item) => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("");
  const steps = content.how.steps.map((step, index) => `<li><h3>${index + 1}. ${escapeHtml(step.title)}</h3><p>${escapeHtml(step.text)}</p></li>`).join("");
  const lists = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const faqs = content.faq.items.map((item) => `<article><h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p></article>`).join("");
  const related = Object.values(solutionContent.zh).filter((item) => item.path !== content.path).map((item) => `<li><a href="${item.path}">${escapeHtml(item.navLabel)}</a></li>`).join("");
  return [
    `<p>${escapeHtml(content.hero.intro)}</p>`,
    `<section><h2>${escapeHtml(content.problem.title)}</h2><p>${escapeHtml(content.problem.intro)}</p>${cards(content.problem.items)}</section>`,
    `<section><h2>${escapeHtml(content.how.title)}</h2><p>${escapeHtml(content.how.intro)}</p><ol>${steps}</ol></section>`,
    `<section><h2>${escapeHtml(content.benefits.title)}</h2>${cards(content.benefits.items)}</section>`,
    `<section><h2>${escapeHtml(content.human.title)}</h2><p>${escapeHtml(content.human.intro)}</p><h3>${escapeHtml(content.human.aiTitle)}</h3><ul>${lists(content.human.aiItems)}</ul><h3>${escapeHtml(content.human.staffTitle)}</h3><ul>${lists(content.human.staffItems)}</ul></section>`,
    `<section><h2>${escapeHtml(content.demo.title)}</h2><p>${escapeHtml(content.demo.text)}</p><a href="/demo">真实 Demo</a></section>`,
    `<section><h2>${escapeHtml(content.faq.title)}</h2>${faqs}</section>`,
    `<nav aria-label="相关解决方案"><p>${escapeHtml(content.relatedIntro)}</p><ul>${related}</ul><a href="/">首页</a> <a href="/contact">联系我们</a></nav>`,
    `<section><h2>${escapeHtml(content.cta.title)}</h2><p>${escapeHtml(content.cta.text)}</p><a href="/contact">${escapeHtml(content.cta.secondary)}</a></section>`,
  ].join("");
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

  if (!page.keepStructuredData && !page.solution) {
    html = html.replace(/\s*<script id="(?:organization|website|service)-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
  }

  if (page.solution) {
    html = html.replace(/\s*<script id="service-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: page.solution.hero.title,
      description: page.description,
      serviceType: page.solution.hero.title,
      url: canonical,
      provider: { "@type": "Organization", "@id": `${domain}/#organization`, name: "SuperChat Marketing" },
      areaServed: { "@type": "Country", name: "Malaysia" },
      availableChannel: { "@type": "ServiceChannel", serviceUrl: `${domain}/contact`, availableLanguage: ["Chinese", "English", "Malay"] },
    };
    html = replaceRequired(html, /<\/head>/, `<script id="service-structured-data" type="application/ld+json">${JSON.stringify(serviceSchema)}</script>\n  </head>`, "solution service schema");
  }

  const rawContent = page.solution ? renderSolutionContent(page.solution) : renderGeoContent(page);
  const fallback = `<noscript><main><h1>${h1}</h1><p>${description}</p>${rawContent}</main></noscript>`;
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
