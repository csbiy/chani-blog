'use client';

import { motion } from 'framer-motion';
import { useActiveHeading } from '@/app/lib/useActiveHeading';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const activeId = useActiveHeading(headings.map(h => h.id));

  return (
      <aside className="lg:sticky lg:top-20 max-h-[80vh] overflow-y-auto w-full lg:w-64 text-sm pl-4 border-l border-gray-200">
        <h2 className="text-lg font-semibold mb-3">📑 목차</h2>
        <ul className="space-y-1">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
                <li key={heading.id} className={`relative ml-${(heading.level - 2) * 4}`}>
                  <a
                      href={`#${heading.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`
                  group block pl-2 pr-2 border-l-4 rounded-sm transition-all duration-300
                  ${isActive
                          ? 'border-indigo-500 text-indigo-600 font-bold scale-[1.05] bg-indigo-50'
                          : 'border-transparent text-gray-600 hover:text-indigo-500'}
                `}
                  >
                    <motion.span
                        layoutId="active-toc-line"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"
                        initial={false}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{ display: isActive ? 'block' : 'none' }}
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
