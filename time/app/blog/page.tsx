import Link from "next/link";
import { getCachedBlogPosts } from "../lib/blog-cache";
import { blogPosts } from "../data";

type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  pubDate?: string;
};

function formatPubDate(input?: string): string {
  if (!input) return "Draft";
  const normalized = input.trim();
  const match = normalized.match(/^(\d{4})\.\s?(\d{1,2})\.\s?(\d{1,2})\.?$/);

  if (!match) return normalized;

  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default async function BlogListPage() {
  const cached = await getCachedBlogPosts();
  const hasCached = cached.length > 0;

  const posts: BlogListItem[] = hasCached
    ? cached
    : blogPosts.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
      }));

  return (
    <section className="page-section">
      <h1>Blog</h1>
      <p className="page-description">기록과 리뷰를 모아둔 포스트 아카이브입니다.</p>

      <ul className="list">
        {posts.map((item) => (
          <li key={item.slug} className="list-item blog-list-item">
            <div className="blog-list-item__meta">{formatPubDate(item.pubDate)}</div>
            <Link href={`/blog/${item.slug}`} className="item-title">
              {item.title}
            </Link>
            <p>{item.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
