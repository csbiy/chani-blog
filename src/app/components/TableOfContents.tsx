"use client";

import { motion } from "framer-motion";
import { useActiveHeading } from "@/app/lib/useActiveHeading";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const activeId = useActiveHeading(headings.map((h) => h.id));

  // h2, h3만 표시
  const filteredHeadings = headings.filter((h) => h.level <= 3);

  return (
    <aside className="lg:sticky lg:top-24 max-h-[80vh] overflow-y-auto w-full lg:w-64 text-sm">
      <div className="p-4 rounded-xl bg-card-bg border border-card-border shadow-card">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-card-border">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <h2 className="text-base font-bold text-foreground">목차</h2>
        </div>
        <ul className="space-y-1">
          {filteredHeadings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li
                key={heading.id}
                className="relative"
                style={{ marginLeft: `${(heading.level - 2) * 0.75}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`
                    group block pl-3 pr-2 py-2 rounded-lg transition-all duration-200 relative
                    ${
                      isActive
                        ? "text-accent font-semibold bg-accent/10 border-l-2 border-accent"
                        : "text-foreground-muted hover:text-accent hover:bg-accent/5 border-l-2 border-transparent hover:border-accent/30"
                    }
                  `}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
