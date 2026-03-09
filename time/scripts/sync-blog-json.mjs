import fs from "node:fs/promises";
import path from "node:path";

const BLOG_ID = process.env.NAVER_BLOG_ID || "seo-kkk";
const COUNT_PER_PAGE = 30;
const LIST_API = "https://blog.naver.com/PostTitleListAsync.naver";

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeTitle(raw) {
  try {
    return decodeURIComponent(String(raw || "").replace(/\+/g, " ")).trim();
  } catch {
    return String(raw || "").trim();
  }
}

function pickMeta(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`<meta\\s+property=[\"']${escaped}[\"']\\s+content=[\"']([^\"']*)[\"']`, "i");
  const m = html.match(regex);
  return m ? m[1].trim() : "";
}

function extractSeMainContainer(html) {
  const startToken = '<div class="se-main-container">';
  const start = html.indexOf(startToken);
  if (start < 0) return "";

  const footerMarker = "<!-- SE_DOC_FOOTER_START -->";
  const end = html.indexOf(footerMarker, start);
  if (end < 0) return html.slice(start);
  return html.slice(start, end);
}

async function fetchPostListPage(page) {
  const url = `${LIST_API}?blogId=${BLOG_ID}&currentPage=${page}&categoryNo=0&countPerPage=${COUNT_PER_PAGE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`List API failed: ${res.status}`);
  const text = await res.text();

  const items = [];
  const re = /"logNo":"(\d+)".*?"title":"(.*?)".*?"addDate":"(.*?)"/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    items.push({
      logNo: m[1],
      title: m[2],
      addDate: m[3],
    });
  }
  return items;
}

async function collectAllLogNos() {
  const all = [];
  const seen = new Set();

  for (let page = 1; page <= 1000; page += 1) {
    const list = await fetchPostListPage(page);
    if (list.length === 0) break;

    let addedOnPage = 0;
    for (const item of list) {
      const logNo = String(item.logNo || "");
      if (!logNo || seen.has(logNo)) continue;
      seen.add(logNo);
      all.push({
        logNo,
        title: decodeTitle(item.title),
        pubDate: String(item.addDate || "").trim(),
      });
      addedOnPage += 1;
    }

    if (addedOnPage === 0) break;
    if (list.length < COUNT_PER_PAGE) break;
  }

  return all;
}

async function fetchPostDetail(logNo, fallbackTitle, fallbackDate) {
  const sourceLink = `https://blog.naver.com/${BLOG_ID}/${logNo}`;
  const viewUrl =
    `https://blog.naver.com/PostView.naver?blogId=${BLOG_ID}&logNo=${logNo}` +
    "&redirect=Dlog&widgetTypeCall=true&directAccess=false";

  const res = await fetch(viewUrl);
  if (!res.ok) {
    return {
      slug: logNo,
      title: fallbackTitle || logNo,
      excerpt: "",
      content: "",
      sourceLink,
      pubDate: fallbackDate,
    };
  }

  const html = await res.text();
  const metaTitle = pickMeta(html, "og:title");
  const metaDesc = pickMeta(html, "og:description");
  const content = extractSeMainContainer(html);
  const excerpt = stripHtml(metaDesc || content).slice(0, 220);

  return {
    slug: logNo,
    title: metaTitle || fallbackTitle || logNo,
    excerpt,
    content,
    sourceLink,
    pubDate: fallbackDate,
  };
}

const list = await collectAllLogNos();
const results = [];

for (const post of list) {
  const detail = await fetchPostDetail(post.logNo, post.title, post.pubDate);
  results.push(detail);
}

const outPath = path.join(process.cwd(), "data", "blog-cache.json");
await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, `${JSON.stringify(results, null, 2)}\n`, "utf8");

console.log(`Saved ${results.length} posts -> data/blog-cache.json`);
