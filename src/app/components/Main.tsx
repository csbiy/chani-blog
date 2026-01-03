"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => {
    let updatedPosts = posts;

    if (searchTerm) {
      updatedPosts = updatedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedTag) {
      updatedPosts = updatedPosts.filter((post) =>
        post.tags.includes(selectedTag)
      );
    }

    setFilteredPosts(updatedPosts);

    if (searchTerm) {
      const suggestions = Array.from(
        new Set(updatedPosts.flatMap((post) => post.tags))
      )
        .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);
      setAutocompleteTags(suggestions);
    } else {
      setAutocompleteTags([]);
    }

    setVisibleCount(10);
  }, [searchTerm, selectedTag, posts]);

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

  const clearFilter = () => {
    setSelectedTag(null);
    setSearchTerm("");
  };

  const tagCounts: { [key: string]: number } = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const uniqueTagsWithCount = Object.entries(tagCounts).map(([tag, count]) => ({
    tag,
    count,
  }));

  const tagsToShow = showAllTags
    ? uniqueTagsWithCount
    : uniqueTagsWithCount.sort((a, b) => b.count - a.count).slice(0, 10);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <main id="posts" className="w-full max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-10 relative">
        {/* 왼쪽 - 포스트 리스트 */}
        <div className="flex-1">
          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="블로그 글 검색..."
              className="w-full p-3 border border-card-border rounded-lg bg-card-bg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            {autocompleteTags.length > 0 && (
              <ul className="absolute w-full bg-card-bg border border-card-border rounded-lg shadow-lg mt-1 z-10 overflow-hidden">
                {autocompleteTags.map((tag) => (
                  <li
                    key={tag}
                    className="px-4 py-2 hover:bg-accent/10 cursor-pointer text-foreground transition-colors"
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedTag && (
            <motion.div
              className="mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-foreground-muted">필터:</span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                #{selectedTag}
              </span>
              <button
                onClick={clearFilter}
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          )}

          <div className="flex flex-col gap-6">
            {visiblePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/posts/${post.id}`} className="block group">
                  <motion.article
                    className="p-6 rounded-2xl border border-card-border bg-card-bg transition-all"
                    whileHover={{ y: -4, borderColor: "var(--accent)" }}
                  >
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-2">
                      {post.date}
                    </p>
                    <p className="text-foreground-muted mb-4">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-accent/10 text-accent text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}

            {visiblePosts.length === 0 && searchTerm !== "" && selectedTag === null && (
              <p className="text-foreground-muted">검색 결과가 없습니다.</p>
            )}
            {visiblePosts.length === 0 && selectedTag !== null && (
              <p className="text-foreground-muted">
                '{selectedTag}' 태그와 관련된 글이 없습니다.
              </p>
            )}
            {visiblePosts.length > 0 && selectedTag !== null && (
              <p className="text-foreground-muted">
                '{selectedTag}' 태그로 필터링된 글 {filteredPosts.length}개
              </p>
            )}

            {visibleCount < filteredPosts.length && (
              <div ref={loaderRef} className="h-10" />
            )}
          </div>
        </div>

        {/* 오른쪽 - 프로필 카드 및 태그 리스트 */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 lg:sticky lg:top-20 self-start">
          <ProfileCard />
          <div className="bg-card-bg rounded-2xl border border-card-border p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              모든 태그
            </h3>
            <div className="flex flex-wrap gap-2">
              {tagsToShow.map(({ tag, count }, index) => (
                <motion.button
                  key={index}
                  className="px-2 py-1 bg-accent/10 text-sm rounded-full text-accent hover:bg-accent/20 transition-colors cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  #{tag}{" "}
                  <span className="text-foreground-muted text-xs">
                    ({count})
                  </span>
                </motion.button>
              ))}
            </div>
            {uniqueTagsWithCount.length > 10 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors"
              >
                {showAllTags ? "접기" : "태그 더보기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
