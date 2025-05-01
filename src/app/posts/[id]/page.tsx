import Link from "next/link";
import { getAllPosts, getPostById } from "@/app/lib/posts";
import GiscusComment from "@/app/components/GiscusComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";


export default async function PostDetail({ params }: {params: Promise<{ id: string }>}) {
  const { id: postId } = await params;
  const currentPostId = Number(postId);
  const post = await getPostById(currentPostId);


  if (!post) {
    return <div className="p-10">포스트를 찾을 수 없습니다.</div>;
  }

  const posts = await getAllPosts();
  const currentPostIndex = posts.findIndex((p) => p.id === currentPostId);
  const previousPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  return (
      <main className="w-full max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{post.date}</p>
        <div className="prose mb-10">
        </div>
        <div className="flex flex-wrap gap-2 mt-6 mb-8">
          {post.tags.map((tag :string, idx:number) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
            #{tag}
          </span>
          ))}
        </div>

        <div className="prose mb-10">
          {post.mdxSource}
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
          {/* 주인장 프로필 섹션 */}
          <div className="mt-10 border-t border-gray-200 py-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              <img src="/profile.jpeg" alt="프로필 이미지" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-lg font-semibold">@chani</div>
              <div className="text-sm text-gray-600 mb-2">바둑 좋아하는 개발자의 의미있는 학습 기록을 위한 공간입니다.</div>
              <div className="flex gap-2">
              <Link
                  href={`https://github.com/csbiy`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-indigo-600"
              >
                <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
              </Link>
              <Link
                  href={"https://www.linkedin.com/in/chan-soo-kim-ba2047278"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-indigo-600"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
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
        {/* Giscus 댓글 컴포넌트 */}
        <GiscusComment />
      </main>
  );
}
