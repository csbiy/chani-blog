import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import {compileMDX} from "next-mdx-remote/rsc";
import 'highlight.js/styles/atom-one-dark.css';
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

const postsDirectory = path.join(process.cwd(), "posts");

// 모든 글 목록 가져오기 (메타데이터만)
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContents);

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags,
      discussionId: data.discussionId,
    };
  });

  // 날짜 내림차순 정렬
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 특정 id에 해당하는 글 가져오기 (메타 + 본문)
export async function getPostById(id: number) {
  const fileNames = fs.readdirSync(postsDirectory);

  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.id === id) {
      const { content: mdxContent } = await compileMDX({
        source: content,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight]
          },
        },
      });

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
        discussionId: data.discussionId,
        content: content,
        mdxSource: mdxContent
      };
    }
  }

  return null;
}


export function extractHeadings(markdown: string) {
  const tree = unified().use(remarkParse).parse(markdown);
  const headings: { id: string; text: string; level: number }[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children.map((n: any) => n.value).join('');
    const id = text.toLowerCase().replace(/\s+/g, '-');
    headings.push({ id, text, level: node.depth });
  });
  return headings;
}
