import Link from "next/link";
import GiscusComment from "@/app/components/GiscusComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import TableOfContents from "@/app/components/TableOfContents";
import ScrollProgress from "@/app/components/ScrollProgress";
import Header from "@/app/components/Header";
import { getAllPostsData, getPostData } from "@/app/lib/posts";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;
  const currentPostId = Number(postId);
  const post = await getPostData(currentPostId);

  const posts = await getAllPostsData();
  const currentPostIndex = posts.findIndex(
    (p: { id: number }) => p.id === currentPostId
  );
  const previousPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollProgress />

      <div className="flex justify-center px-4">
        <main className="w-full max-w-3xl py-10">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
          <p className="text-foreground-muted text-sm mb-8">{post.date}</p>

          <div className="flex flex-wrap gap-2 mt-6 mb-8">
            {post.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div
            className="prose mb-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="border-t border-card-border py-6 flex justify-between text-sm">
            {previousPost ? (
              <Link
                href={`/posts/${previousPost.id}`}
                className="group hover:text-accent transition-colors"
              >
                <span className="text-foreground-muted group-hover:text-accent">
                  &larr; 이전 글
                </span>
                <span className="block mt-1 text-foreground-muted group-hover:text-foreground transition-colors">
                  {previousPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/posts/${nextPost.id}`}
                className="text-right group hover:text-accent transition-colors"
              >
                <span className="text-foreground-muted group-hover:text-accent">
                  다음 글 &rarr;
                </span>
                <span className="block mt-1 text-foreground-muted group-hover:text-foreground transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-10 border-t border-card-border py-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-background-secondary overflow-hidden ring-2 ring-accent/20">
              <img
                src="/profile.jpeg"
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">@chani</div>
              <div className="text-sm text-foreground-muted mb-2">
                바둑,스타크래프트 등 고전 게임을 좋아하는 내향인 개발자입니다
              </div>
              <div className="flex gap-3">
                <Link
                  href="https://github.com/csbiy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground-muted hover:text-accent transition-colors"
                >
                  <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/chan-soo-kim-ba2047278"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground-muted hover:text-accent transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <GiscusComment />
        </main>

        <aside className="hidden lg:block ml-10 w-64 shrink-0">
          <TableOfContents headings={post.headings} />
        </aside>
      </div>
    </div>
  );
}
