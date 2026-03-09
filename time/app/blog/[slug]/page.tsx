import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../../data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug?.trim();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!slug || !post) {
    notFound();
  }

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
