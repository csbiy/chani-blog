import path from "path";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import fs from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

const postsDirectory = path.join(process.cwd(), "posts");

// 메타데이터 캐시
let cachedPostsMeta: Array<{
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  discussionId?: string;
}> | null = null;

// 개별 포스트 캐시 (id → 컴파일된 결과)
const postCache = new Map<
    number,
    {
      id: number;
      title: string;
      description: string;
      date: string;
      tags: string[];
      discussionId?: string;
      content: string;
      mdxSource: any;
    }
>();

export async function getAllPosts() {
  if (cachedPostsMeta) return cachedPostsMeta;

  const fileNames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          id: data.id,
          title: data.title,
          description: data.description,
          date: data.date,
          tags: data.tags || [],
          discussionId: data.discussionId,
        };
      })
  );

  cachedPostsMeta = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return cachedPostsMeta;
}

export async function getPostById(id: number) {
  if (postCache.has(id)) {
    return postCache.get(id)!;
  }

  const fileNames = await fs.readdir(postsDirectory);

  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.id === id) {
      const { content: MDXContent } = await compileMDX({
        source: content,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeHighlight,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ],
          },
        },
      });

      const post = {
        id: data.id,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        discussionId: data.discussionId,
        content,
        mdxSource: MDXContent,
      };

      postCache.set(id, post);
      return post;
    }
  }

  return null;
}

export function extractHeadings(markdown: string) {
  const tree = unified().use(remarkParse).parse(markdown);
  const headings: { id: string; text: string; level: number }[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children.map((n: any) => n.value).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    headings.push({ id, text, level: node.depth });
  });
  return headings;
}
