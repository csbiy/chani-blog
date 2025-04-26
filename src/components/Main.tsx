"use client";

import ProfileCard from "./ProfileCard";
import Link from "next/link";
import { useState, useEffect } from "react";

type Post = {
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

const dummyPosts: Post[] = [
  {
    id: 1,
    title: "Next.js로 블로그 만들기",
    description: "Next.js와 Tailwind를 활용해서 개인 블로그를 만드는 과정 기록!",
    date: "2025-04-26",
    tags: ["Next.js", "Tailwind", "블로그"],
  },
  {
    id: 2,
    title: "FastAPI로 백엔드 구축하기",
    description: "FastAPI를 사용해서 빠르게 API 서버를 구축한 경험 공유",
    date: "2025-04-20",
    tags: ["FastAPI", "Python"],
  },
  {
    id: 3,
    title: "새로운 JavaScript 기능 탐험",
    description: "ES2023에 추가된 흥미로운 기능들을 살펴봅니다.",
    date: "2025-04-15",
    tags: ["JavaScript", "ES2023"],
  },
  {
    id: 4,
    title: "React Hooks 성능 최적화",
    description: "React Hooks를 사용할 때 성능을 개선할 수 있는 몇 가지 팁!",
    date: "2025-04-10",
    tags: ["React", "Hooks", "성능"],
  },
];

export default function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(dummyPosts);
  const [autocompleteTags, setAutocompleteTags] = useState<string[]>([]);

  useEffect(() => {
    const results = dummyPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(results);

    // 자동 완성 태그 필터링
    if (searchTerm) {
      const suggestions = Array.from(new Set(dummyPosts.flatMap(post => post.tags)))
      .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5); // 최대 5개 추천
      setAutocompleteTags(suggestions);
    } else {
      setAutocompleteTags([]);
    }
  }, [searchTerm]);

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  const allTags = new Set<string>();
  dummyPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      allTags.add(tag);
    });
  });
  const uniqueTags = Array.from(allTags);

  return (
      <main className="w-full max-w-6xl mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 왼쪽 - 포스트 리스트 */}
          <div className="flex-1">
            <div className="mb-8 relative">
              <input
                  type="text"
                  placeholder="블로그 글 검색..."
                  className="w-full p-2 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              {autocompleteTags.length > 0 && (
                  <ul className="absolute w-full bg-white border border-gray-200 rounded-md shadow-sm mt-1 z-10">
                    {autocompleteTags.map((tag) => (
                        <li
                            key={tag}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleTagClick(tag)}
                        >
                          #{tag}
                        </li>
                    ))}
                  </ul>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-8">📚 개발 블로그</h2>
            <div className="flex flex-col gap-6">
              {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/posts/${post.id}`} className="block">
                    <article key={post.id} className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-white">
                      <h3 className="text-2xl font-semibold">{post.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                      <p className="text-gray-700 mb-4">{post.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                      #{tag}
                    </span>
                        ))}
                      </div>
                    </article>
                  </Link>
              ))}
              {filteredPosts.length === 0 && searchTerm !== "" && (
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
              )}
            </div>
          </div>
          {/* 오른쪽 - 프로필 카드 및 태그 리스트 */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
            <ProfileCard />
            {/* 태그 리스트 */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">🏷️ 모든 태그</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag, index) => (
                    <Link key={index} href={`/tags/${tag}`} className="px-2 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition">
                      #{tag}
                    </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
