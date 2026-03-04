import Link from "next/link";
import { libraryItems } from "../data";

export default function LibraryListPage() {
  return (
    <section className="page-section">
      <h1>Library</h1>
      <ul className="list">
        {libraryItems.map((item) => (
          <li key={item.slug} className="list-item">
            <Link href={`/library/${item.slug}`} className="item-title">
              {item.title}
            </Link>
            <p>{item.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
