// components/TableOfContents.tsx
'use client';

import { useEffect, useState } from 'react';

export default function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveId(heading.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
      <aside className="lg:block sticky top-20 max-h-[80vh] overflow-y-auto w-64 text-sm pl-4 border-l border-gray-200">
        <h2 className="text-lg font-semibold mb-2">목차</h2>
        <ul className="space-y-1">
          {headings.map((heading) => (
              <li key={heading.id} className={`ml-${(heading.level - 2) * 4}`}>
                <a
                    href={`#${heading.id}`}
                    className={`block hover:text-indigo-600 ${activeId === heading.id ? 'text-indigo-600 font-semibold' : ''}`}
                >
                  {heading.text}
                </a>
              </li>
          ))}
        </ul>
      </aside>
  );
}
