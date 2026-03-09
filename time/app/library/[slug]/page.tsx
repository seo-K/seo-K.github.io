import Link from "next/link";
import { notFound } from "next/navigation";
import { libraryItems } from "../../data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LibraryDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug?.trim();
  const item = libraryItems.find((entry) => entry.slug === slug);

  if (!slug || !item) {
    notFound();
  }

  return (
    <article className="page-section">
      <h1>{item.title}</h1>
      <p className="detail-content">{item.content}</p>
      <Link href="/library" className="back-link">
        Back to list
      </Link>
    </article>
  );
}
