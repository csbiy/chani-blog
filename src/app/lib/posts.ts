import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
export function getPostById(id: number) {
  const fileNames = fs.readdirSync(postsDirectory);

  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.id === id) {
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
        discussionId: data.discussionId,
        content,
      };
    }
  }

  return null;
}
