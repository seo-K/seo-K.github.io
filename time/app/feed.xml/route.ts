import { NextResponse } from "next/server";
import { buildCustomRssXml, getRssItemsFromSource } from "../lib/rss";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const items = await getRssItemsFromSource(100);
  const siteUrl = new URL(request.url).origin;
  const xml = buildCustomRssXml(items, siteUrl);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
