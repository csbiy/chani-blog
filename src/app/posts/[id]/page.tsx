"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const dummyPosts = [
  {
    id: 1,
    title: "Next.js로 블로그 만들기",
    description: "Next.js와 Tailwind를 활용해서 개인 블로그를 만드는 과정 기록!",
    date: "2025-04-26",
    content: "이건 본문 내용입니다. Next.js로 어떻게 만들었는지 자세히 적어야죠!",
    tags: ["Next.js", "Tailwind", "블로그"],
    discussionId: "1",
  },
  {
    id: 2,
    title: "FastAPI로 백엔드 구축하기",
    description: "FastAPI를 사용해서 빠르게 API 서버를 구축한 경험 공유",
    date: "2025-04-20",
    content: "FastAPI를 왜 썼는지, 어떤 구조로 만들었는지 설명합니다.",
    tags: ["FastAPI", "Python"],
    discussionId: "2",
  },
  {
    id: 3,
    title: "새로운 아이디어 구상",
    description: "머릿속을 떠도는 새로운 프로젝트 아이디어들을 정리해 봅니다.",
    date: "2025-04-15",
    content: "이 아이디어가 어떻게 발전할 수 있을지 고민하는 내용입니다.",
    tags: ["아이디어", "프로젝트"],
    discussionId: "3",
  },
];

export default function PostDetail() {
  const { id } = useParams();
  const currentPostId = Number(id);
  const currentPostIndex = dummyPosts.findIndex((p) => p.id === currentPostId);
  const previousPost = currentPostIndex > 0 ? dummyPosts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < dummyPosts.length - 1 ? dummyPosts[currentPostIndex + 1] : null;
  const post = dummyPosts.find((p) => p.id === currentPostId);

  if (!post) {
    return <div className="p-10">포스트를 찾을 수 없습니다.</div>;
  }

  const githubUsername = "YOUR_GITHUB_USERNAME"; // 본인 GitHub 사용자 이름으로 변경
  const githubProfileUrl = `https://github.com/${githubUsername}`;

  return (
      <main className="w-full max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{post.date}</p>
        <div className="prose mb-10">
          <p>{post.content}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6 mb-8">
          {post.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
            #{tag}
          </span>
          ))}
        </div>

        <div className="border-t border-gray-200 py-6 flex justify-between text-sm text-gray-600">
          {previousPost && (
              <Link href={`/posts/${previousPost.id}`} className="hover:text-indigo-600">
                <span>&larr; 이전 글</span>
                <span className="block mt-1 text-gray-500">{previousPost.title}</span>
              </Link>
          )}
          <div></div> {/* Spacer element */}
          {nextPost && (
              <Link href={`/posts/${nextPost.id}`} className="text-right hover:text-indigo-600">
                <span>다음 글 &rarr;</span>
                <span className="block mt-1 text-gray-500">{nextPost.title}</span>
              </Link>
          )}
        </div>

        <div>

          {/* 주인장 프로필 섹션 (Tailwind CSS 적용) */}
          <div className="mt-10 border-t border-gray-200 py-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              {/* 실제 프로필 이미지 URL로 변경 */}
              {/* <img src="/images/profile.jpg" alt="프로필 이미지" className="w-full h-full object-cover" /> */}
            </div>
            <div>
              <div className="text-lg font-semibold">@{githubUsername}</div>
              <div className="text-sm text-gray-600 mb-2">취미공간</div>
              <div className="flex gap-2">
                <Link href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-indigo-600">
                  {/*<FaGithub className="h-5 w-5" />*/}
                </Link>
                <Link href={"/"} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-indigo-600">
                  {/*<FaLinkedin className="h-5 w-5" />*/}
                </Link>
                {/* 다른 링크 (선택 사항) */}
              </div>
            </div>
        </div>
        <div className="mt-10 border-t border-gray-200 py-6">
          <h2 className="text-lg font-semibold mb-4">댓글</h2>
          <p className="text-gray-500 mb-4">이 게시글에 대한 의견을 공유해주세요!</p>
        </div>
        </div>
      </main>
  );
}
