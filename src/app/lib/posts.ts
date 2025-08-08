import path from "path";
import fs from "fs/promises";

async function getPostData(id: number) {
  const jsonPath = path.join(process.cwd(), "public", "generated", `${id}.json`);
  const json = await fs.readFile(jsonPath, "utf8");
  return JSON.parse(json);
}

async function getAllPostsData() {
  const jsonPath = path.join(process.cwd(), "public", "generated", "index.json");
  const json = await fs.readFile(jsonPath, "utf8");
  return JSON.parse(json);
}

async function getAllSortedPostsData() {
  const jsonPath = path.join(process.cwd(), "public", "generated", "index.json");
  const json = await fs.readFile(jsonPath, "utf8");
  const posts = JSON.parse(json);

  posts.sort((a: any, b: any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return posts;
}

export { getPostData, getAllPostsData, getAllSortedPostsData };
