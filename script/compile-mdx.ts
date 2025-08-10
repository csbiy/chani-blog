import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

const postsDir = path.join(process.cwd(), "posts");
const outputDir = path.join(process.cwd(), "public/generated");

function extractHeadingsFromHtmlAst(tree: Root) {
  const headings: { id: string; text: string; level: number }[] = [];

  visit(tree, "element", (node: Element) => {
    if (/^h[1-6]$/.test(node.tagName)) {
      const level = Number(node.tagName.slice(1));
      const id = (node.properties?.id as string) || "";
      const text = node.children
      .map((child: any) => {
        if (child.type === "text") return child.value;
        if (child.type === "element") {
          return child.children?.map((c: any) => c.value || "").join("") || "";
        }
        return "";
      })
      .join("")
      .trim();
      headings.push({ id, text, level });
    }
  });

  return headings;
}

async function generate() {
  const filenames = await fs.readdir(postsDir);
  const postsMeta: any[] = [];

  for (const file of filenames) {
    const fullPath = path.join(postsDir, file);
    const stat = await fs.stat(fullPath);
    if (!stat.isFile()) continue;

    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const headingsProcessor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" });

    const hastTree = await headingsProcessor.run(headingsProcessor.parse(content));
    const headings = extractHeadingsFromHtmlAst(hastTree as Root);

    const htmlProcessor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify);

    const html = String(await htmlProcessor.process(content));

    // 3) 메타데이터 저장
    const postMeta = {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      discussionId: data.discussionId,
      headings,
      html,
    };

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(
        path.join(outputDir, `${data.id}.json`),
        JSON.stringify(postMeta, null, 2),
        "utf8"
    );

    postsMeta.push(postMeta);
  }

  await fs.writeFile(
      path.join(outputDir, `index.json`),
      JSON.stringify(postsMeta, null, 2),
      "utf8"
  );
}

generate().catch((err) => {
  console.error("오류 발생:", err);
});
