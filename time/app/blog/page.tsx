import Link from "next/link";
import { getCachedBlogPosts } from "../lib/blog-cache";
import { blogPosts } from "../data";

export default async function BlogListPage() {
  const posts = await getCachedBlogPosts();
  const hasJson = posts.length > 0;

  return (
    <section className="page-section">
      <h1>Blog</h1>
      <ul className="list">
        {hasJson
          ? posts.map((item) => (
            <li key={item.slug} className="list-item">
              <Link href={`/blog/${item.slug}`} className="item-title">
                {item.title}
              </Link>
              <p>{item.excerpt}</p>
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
