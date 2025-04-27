'use client';

import Giscus from "@giscus/react";
import { usePathname } from "next/navigation";

interface GiscusCommentProps {}

export default function GiscusComment({}: GiscusCommentProps) {
  const pathname = usePathname();

  return (
      <div className="mt-10 border-t border-gray-200 py-6">
        <h2 className="text-lg font-semibold mb-4">댓글</h2>
        <Giscus
            id="comments"
            repo="csbiy/chani-blog"
            repoId="R_kgDOORGwzQ"
            category="General"
            categoryId="DIC_kwDOORGwzc4CpgXs"
            mapping="pathname"
            term={pathname}
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="light"
            lang="ko"
            loading="lazy"
        />
      </div>
  );
}
