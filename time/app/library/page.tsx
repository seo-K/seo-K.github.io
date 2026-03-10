import Link from "next/link";
import { libraryItems } from "../data";

export default function LibraryListPage() {
  return (
    <section className="page-section">
      <h1>Library</h1>
      <p className="page-description">Swiper 중심으로 정리한 UI 패턴 모음입니다.</p>

      <ul className="list library-list">
        {libraryItems.map((item) => (
          <li key={item.slug} className="list-item library-list__item">
            <span className="library-tag">{item.category}</span>
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
