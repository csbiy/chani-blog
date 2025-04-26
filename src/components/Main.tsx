import ProfileCard from "./ProfileCard";
import Link from "next/link";

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
];

export default function Main() {
  return (
      <main className="w-full max-w-6xl mx-auto py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 왼쪽 - 포스트 리스트 */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8">📚 개발 블로그</h2>
            <div className="flex flex-col gap-6">
              {dummyPosts.map((post) => (
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
            </div>
          </div>

          {/* 오른쪽 - 프로필 카드 */}
          <div className="w-full lg:w-80 shrink-0">
            <ProfileCard />
          </div>
        </div>
      </main>
  );
}
