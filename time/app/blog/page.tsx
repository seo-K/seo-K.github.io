import Link from "next/link";
import { blogPosts } from "../data";

export default function BlogListPage() {
  return (
    <section className="page-section">
      <h1>Blog</h1>
      <ul className="list">
        {blogPosts.map((post) => (
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
