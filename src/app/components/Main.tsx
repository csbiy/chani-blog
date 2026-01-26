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
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="블로그 글 검색..."
                className="w-full pl-12 pr-4 py-3.5 border border-card-border rounded-xl bg-card-bg text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent shadow-sm hover:shadow-md transition-all duration-200"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
            {autocompleteTags.length > 0 && (
              <ul className="absolute w-full bg-card-bg border border-card-border rounded-xl shadow-xl mt-2 z-10 overflow-hidden backdrop-blur-sm">
                {autocompleteTags.map((tag) => (
                  <li
                    key={tag}
                    className="px-4 py-3 hover:bg-accent/10 cursor-pointer text-foreground transition-all duration-200 flex items-center gap-2 group"
                    onClick={() => handleTagClick(tag)}
                  >
                    <svg className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="font-medium">#{tag}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedTag && (
            <motion.div
              className="mb-6 flex items-center gap-3 p-3 bg-accent/5 rounded-xl border border-accent/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-foreground-muted font-medium">필터:</span>
              <span className="px-3 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                #{selectedTag}
              </span>
              <button
                onClick={clearFilter}
                className="ml-auto text-foreground-muted hover:text-accent transition-colors p-1 hover:bg-accent/10 rounded-lg"
                aria-label="필터 제거"
              >
                <svg
                  className="w-5 h-5"
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
                    className="p-6 rounded-xl border border-card-border bg-card-bg shadow-card transition-all duration-300 hover:shadow-card-hover overflow-hidden relative"
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-200 mb-2 tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-foreground-muted text-sm mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </p>
                    <p className="text-foreground-muted mb-4 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full hover:bg-accent/20 transition-colors duration-200 font-medium"
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
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                모든 태그
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tagsToShow.map(({ tag, count }, index) => (
                <motion.button
                  key={index}
                  className="px-3 py-1.5 bg-accent/10 text-sm rounded-full text-accent hover:bg-accent/20 transition-all duration-200 cursor-pointer font-medium border border-accent/20 hover:border-accent/40"
                  onClick={() => handleTagClick(tag)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  #{tag}{" "}
                  <span className="text-foreground-muted text-xs font-semibold">
                    ({count})
                  </span>
                </motion.button>
              ))}
            </div>
            {uniqueTagsWithCount.length > 10 && (
              <motion.button
                onClick={() => setShowAllTags(!showAllTags)}
                className="mt-4 text-sm text-accent hover:text-accent-hover transition-colors font-medium flex items-center gap-1"
                whileHover={{ x: 2 }}
              >
                {showAllTags ? (
                  <>
                    <span>접기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>태그 더보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
