"use client";

import Giscus from "@giscus/react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function GiscusComment() {
  const pathname = usePathname();
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="mt-10 border-t border-card-border py-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">댓글</h2>
        <div className="h-32 bg-card-bg rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-card-border py-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">댓글</h2>
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
        theme={theme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
