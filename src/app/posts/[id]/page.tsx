"use client";

import { useParams } from "next/navigation";

const dummyPosts = [
  {
    id: 1,
    title: "Next.js로 블로그 만들기",
    description: "Next.js와 Tailwind를 활용해서 개인 블로그를 만드는 과정 기록!",
    date: "2025-04-26",
    content: "이건 본문 내용입니다. Next.js로 어떻게 만들었는지 자세히 적어야죠!",
    tags: ["Next.js", "Tailwind", "블로그"],
  },
  {
    id: 2,
    title: "FastAPI로 백엔드 구축하기",
    description: "FastAPI를 사용해서 빠르게 API 서버를 구축한 경험 공유",
    date: "2025-04-20",
    content: "FastAPI를 왜 썼는지, 어떤 구조로 만들었는지 설명합니다.",
    tags: ["FastAPI", "Python"],
  },
];

export default function PostDetail() {
  const { id } = useParams();

  const post = dummyPosts.find((p) => p.id === Number(id));

  if (!post) {
    return <div className="p-10">포스트를 찾을 수 없습니다.</div>;
  }

  return (
      <main className="w-full max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{post.date}</p>
        <div className="prose">
          <p>{post.content}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
            #{tag}
          </span>
          ))}
        </div>
      </main>
  );
}
