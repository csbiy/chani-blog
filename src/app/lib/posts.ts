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

export async function getAllPosts() {

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

  return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostById(id: number) {

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
