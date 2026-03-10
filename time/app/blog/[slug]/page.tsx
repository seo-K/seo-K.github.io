import Link from "next/link";
import { notFound } from "next/navigation";
import { getCachedBlogPosts } from "../../lib/blog-cache";
import { stripHtml } from "../../lib/rss";
import { blogPosts } from "../../data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type DetailPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  sourceLink: string;
  pubDate: string;
};

function sanitizeBlogHtml(raw: string): string {
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<\/?(?:html|body)[^>]*>/gi, "")
    .replace(/\son[a-z]+="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/<img([^>]*?)data-lazy-src="([^"]+)"([^>]*)>/gi, (_, before, lazySrc, after) => {
      const cleaned = `${before}${after}`.replace(/\ssrc="[^"]*"/i, "");
      return `<img${cleaned} src="${lazySrc}" loading="lazy" />`;
    });
}

function formatPubDate(input: string): string {
  if (!input) return "날짜 없음";
  const normalized = input.trim();

  const match = normalized.match(/^(\d{4})\.\s?(\d{1,2})\.\s?(\d{1,2})\.?$/);
  if (match) {
    const [, y, m, d] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  const parsed = Date.parse(normalized);
  if (!Number.isNaN(parsed)) {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(parsed));
  }

  return normalized;
}

function readingMinutes(content: string): number {
  const clean = stripHtml(content);
  const charsPerMinute = 450;
  return Math.max(1, Math.ceil(clean.length / charsPerMinute));
}

function sourceHost(sourceLink: string): string {
  try {
    return new URL(sourceLink).hostname.replace(/^www\./, "");
  } catch {
    return "internal";
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug?.trim();

  if (!slug) {
    notFound();
  }

  const cachedPosts = await getCachedBlogPosts();
  const fallbackPosts: DetailPost[] = blogPosts.map((post) => ({
    ...post,
    sourceLink: "",
    pubDate: "",
  }));

  const feedEnabled = cachedPosts.length > 0;
  const allPosts: DetailPost[] = feedEnabled ? cachedPosts : fallbackPosts;
  const current = allPosts.find((item) => item.slug === slug);

  if (!current) {
    notFound();
  }

  const sanitized = sanitizeBlogHtml(current.content);
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(sanitized);
  const relatedPosts = allPosts.filter((item) => item.slug !== current.slug).slice(0, 3);

  return (
    <article className="page-section blog-detail">
      <header className="blog-detail__header">
        <span className="blog-detail__badge">Blog</span>
        <h1>{current.title}</h1>
        <p className="blog-detail__excerpt">{current.excerpt}</p>

        <dl className="blog-detail__meta">
          <div>
            <dt>Published</dt>
            <dd>{formatPubDate(current.pubDate)}</dd>
          </div>
          <div>
            <dt>Reading</dt>
            <dd>{readingMinutes(current.content)} min</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{sourceHost(current.sourceLink)}</dd>
          </div>
        </dl>
      </header>

      <section className="blog-detail__content">
        {looksLikeHtml ? (
          <div className="blog-rich-content" dangerouslySetInnerHTML={{ __html: sanitized }} />
        ) : (
          <p className="detail-content">{current.content}</p>
        )}
      </section>

      <footer className="blog-detail__footer">
        {current.sourceLink ? (
          <a href={current.sourceLink} className="back-link" target="_blank" rel="noreferrer">
            View original post
          </a>
        ) : null}
        <Link href="/blog" className="back-link">
          Back to list
        </Link>
      </footer>

      {relatedPosts.length > 0 ? (
        <aside className="blog-detail__related" aria-label="Related posts">
          <h2>Related posts</h2>
          <ul className="list">
            {relatedPosts.map((post) => (
              <li key={post.slug} className="list-item">
                <Link href={`/blog/${post.slug}`} className="item-title">
                  {post.title}
                </Link>
                <p>{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  );
}
