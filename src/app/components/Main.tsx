"use client";
import { useState, useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

type MainProps = {
  posts: Post[];
};

export default function Main({ posts }: MainProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [autocompleteTags, setAutocompleteTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showAllTags, setShowAllTags] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // filtering + autocomplete
  useEffect(() => {
    let updatedPosts = posts;

    if (searchTerm) {
      updatedPosts = updatedPosts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      updatedPosts = updatedPosts.filter((post) =>
          post.tags.includes(selectedTag)
      );
    }

    setFilteredPosts(updatedPosts);

    if (searchTerm) {
      const suggestions = Array.from(new Set(updatedPosts.flatMap(post => post.tags)))
      .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
      setAutocompleteTags(suggestions);
    } else {
      setAutocompleteTags([]);
    }

    setVisibleCount(10); // 검색하거나 태그 선택 시 초기화
  }, [searchTerm, selectedTag, posts]);

  // infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((prev) => prev + 10);
          }
        },
        { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedTag(null);
  };

  const tagCounts: { [key: string]: number } = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const uniqueTagsWithCount = Object.entries(tagCounts).map(([tag, count]) => ({ tag, count }));

  // "더보기" 기능
  const tagsToShow = showAllTags
      ? uniqueTagsWithCount
      : uniqueTagsWithCount.sort((a, b) => b.count - a.count).slice(0, 10);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
      <main className="w-full max-w-6xl mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-10 relative">
          {/* 왼쪽 - 포스트 리스트 */}
          <div className="flex-1">
            <div className="mb-8 relative">
              <input
                  type="text"
                  placeholder="블로그 글 검색..."
                  className="w-full p-2 border rounded-md"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
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

            <div className="flex flex-col gap-6">
              {visiblePosts.map((post) => (
                  <Link key={post.id} href={`/posts/${post.id}`} className="block">
                    <article className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-white">
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

              {visiblePosts.length === 0 && searchTerm !== "" && selectedTag === null && (
                  <p className="text-gray-500">검색 결과가 없습니다.</p>
              )}
              {visiblePosts.length === 0 && selectedTag !== null && (
                  <p className="text-gray-500">'{selectedTag}' 태그와 관련된 글이 없습니다.</p>
              )}
              {visiblePosts.length > 0 && selectedTag !== null && (
                  <p className="text-gray-500">'{selectedTag}' 태그로 필터링된 글 {filteredPosts.length}개</p>
              )}

              {visibleCount < filteredPosts.length && (
                  <div ref={loaderRef} className="h-10" />
              )}
            </div>
          </div>

          {/* 오른쪽 - 프로필 카드 및 태그 리스트 */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 top-20 self-start">
            <ProfileCard />
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">🏷️ 모든 태그</h3>
              <div className="flex flex-wrap gap-2">
                {tagsToShow.map(({ tag, count }, index) => (
                    <button
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition cursor-pointer"
                        onClick={() => handleTagClick(tag)}
                    >
                      #{tag} <span className="text-gray-500 text-xs">({count})</span>
                    </button>
                ))}
              </div>
              {uniqueTagsWithCount.length > 10 && (
                  <button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    {showAllTags ? "접기 ▲" : "태그 더보기 ▼"}
                  </button>
              )}
            </div>
          </div>
        </div>
      </main>
  );
}
