import Link from "next/link";
import { notFound } from "next/navigation";
import { getCachedBlogPosts } from "../../lib/blog-cache";
import { blogPosts } from "../../data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug?.trim();

  if (!slug) {
    notFound();
  }

  const posts = await getCachedBlogPosts();
  const jsonPost = posts.find((item) => item.slug === slug);

  if (jsonPost) {
    return (
      <article className="page-section">
        <h1>{jsonPost.title}</h1>
        <div className="detail-content" dangerouslySetInnerHTML={{ __html: jsonPost.content }} />
        <a href={jsonPost.sourceLink} className="back-link" target="_blank" rel="noreferrer">
          View original post
        </a>
        <Link href="/blog" className="back-link">
          Back to list
        </Link>
      </article>
    );
  }

  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article className="page-section">
      <h1>{post.title}</h1>
      <p className="detail-content">{post.content}</p>
      <Link href="/blog" className="back-link">
        Back to list
      </Link>
    </article>
  );
}
