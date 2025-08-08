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
