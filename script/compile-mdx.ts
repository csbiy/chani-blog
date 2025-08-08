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

const postsDir = path.join(process.cwd(), "posts");
const outputDir = path.join(process.cwd(), "public/generated");

function extractHeadingsFromHtmlAst(tree: any) {
  const headings: { id: string; text: string; level: number }[] = [];
  visit(tree, "element", (node: any) => {
    if (/^h[1-6]$/.test(node.tagName)) {
      const text = node.children.map((n: any) => n.value || "").join("");
      const id = node.properties?.id || "";
      headings.push({ id, text, level: Number(node.tagName.slice(1)) });
    }
  });
  return headings;
}

async function generate() {
  const filenames = await fs.readdir(postsDir);
  const postsMeta: any[] = [];

  for (const file of filenames) {
    const fullPath = path.join(postsDir, file);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify);

    const fileProcessed = await processor.process(content);
    const ast = processor.parse(content);
    const headings = extractHeadingsFromHtmlAst(ast);

    const html = fileProcessed.toString();

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

  await fs.writeFile(path.join(outputDir, `index.json`), JSON.stringify(postsMeta, null, 2));
  console.log("✅ HTML 및 metadata 생성 완료");
}

generate();
