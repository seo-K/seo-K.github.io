import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioItems } from "../../data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug?.trim();
  const item = portfolioItems.find((entry) => entry.slug === slug);

  if (!slug || !item) {
    notFound();
  }

  return (
    <article className="page-section">
      <h1>{item.title}</h1>
      <p className="detail-content">{item.content}</p>
      <Link href="/portfolio" className="back-link">
        Back to list
      </Link>
    </article>
  );
}
