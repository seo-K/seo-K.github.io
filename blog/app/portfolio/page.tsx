import Link from "next/link";
import { portfolioItems } from "../data";

export default function PortfolioListPage() {
  return (
    <section className="page-section">
      <h1>Portfolio</h1>
      <ul className="list">
        {portfolioItems.map((item) => (
          <li key={item.slug} className="list-item">
            <Link href={`/portfolio/${item.slug}`} className="item-title">
              {item.title}
            </Link>
            <p>{item.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
