"use client";

import { useState } from "react";

type Props = {
  previewHtml: string;
  code: string;
};

export default function LibraryTabs({ previewHtml, code }: Props) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <section className="library-tabs" aria-label="Library detail tabs">
      <div className="library-tabs__header" role="tablist" aria-label="Preview and code tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "preview"}
          className={`library-tabs__button ${activeTab === "preview" ? "is-active" : ""}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "code"}
          className={`library-tabs__button ${activeTab === "code" ? "is-active" : ""}`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
      </div>

      <div className="library-tabs__panel" role="tabpanel">
        {activeTab === "preview" ? (
          <iframe
            className="library-tabs__preview"
            title="Swiper preview"
            srcDoc={previewHtml}
            loading="lazy"
            sandbox="allow-scripts"
          />
        ) : (
          <pre className="library-tabs__code">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </section>
  );
}
