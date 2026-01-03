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

  return (
    <aside className="lg:sticky lg:top-20 max-h-[80vh] overflow-y-auto w-full lg:w-64 text-sm pl-4 border-l border-card-border">
      <h2 className="text-lg font-semibold mb-3 text-foreground">목차</h2>
      <ul className="space-y-1">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li
              key={heading.id}
              className="relative"
              style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`
                  group block pl-2 pr-2 py-1 border-l-2 rounded-sm transition-all duration-300
                  ${
                    isActive
                      ? "border-accent text-accent font-semibold bg-accent/10"
                      : "border-transparent text-foreground-muted hover:text-accent hover:border-accent/50"
                  }
                `}
              >
                <motion.span
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scaleY: isActive ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
