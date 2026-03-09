import Link from "next/link";
import { XMLParser } from "fast-xml-parser";
import { blogPosts } from "../data";

export const dynamic = "force-dynamic";

type RssItem = {
  title: string;
  link: string;
  description: string;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

async function getRssItems(): Promise<RssItem[] | null> {
  const feedUrl = process.env.RSS_FEED_URL;
  if (!feedUrl) return null;

  try {
    const res = await fetch(feedUrl, { cache: "no-store" });
    if (!res.ok) return null;

    const xml = await res.text();
    const parsed = parser.parse(xml) as {
      rss?: { channel?: { item?: Array<Record<string, unknown>> | Record<string, unknown> } };
    };
    const rawItems = parsed?.rss?.channel?.item;
    if (!rawItems) return null;

    const items = (Array.isArray(rawItems) ? rawItems : [rawItems])
      .map((item) => ({
        title: String(item.title ?? ""),
        link: String(item.link ?? ""),
        description: String(item.description ?? item["content:encoded"] ?? ""),
      }))
      .filter((item) => item.title && item.link);

    return items;
  } catch {
    return null;
  }
}

export default async function BlogListPage() {
  const rssItems = await getRssItems();
  const hasRss = !!rssItems && rssItems.length > 0;

  return (
    <section className="page-section">
      <h1>Blog</h1>
      <ul className="list">
        {hasRss
          ? rssItems.map((item) => (
            <li key={item.link} className="list-item">
              <a href={item.link} className="item-title" target="_blank" rel="noreferrer">
                {item.title}
              </a>
              <p>{item.description}</p>
            </li>
          ))
          : blogPosts.map((post) => (
            <li key={post.slug} className="list-item">
              <Link href={`/blog/${post.slug}`} className="item-title">
                {post.title}
              </Link>
              <p>{post.excerpt}</p>
            </li>
          ))}
      </ul>
    </section>
  );
}
