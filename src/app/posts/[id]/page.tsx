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
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight leading-tight">{post.title}</h1>
            <div className="flex items-center gap-3 text-foreground-muted text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{post.date}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-card-border">
            {post.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-full font-medium border border-accent/20 hover:bg-accent/20 transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div
            className="prose mb-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-t border-card-border">
            {previousPost ? (
              <Link
                href={`/posts/${previousPost.id}`}
                className="group p-4 rounded-xl border border-card-border bg-card-bg hover:border-accent hover:shadow-card transition-all duration-200"
              >
                <div className="flex items-center gap-2 text-foreground-muted group-hover:text-accent mb-2 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">이전 글</span>
                </div>
                <span className="block text-foreground group-hover:text-accent transition-colors font-semibold line-clamp-2">
                  {previousPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/posts/${nextPost.id}`}
                className="group p-4 rounded-xl border border-card-border bg-card-bg hover:border-accent hover:shadow-card transition-all duration-200 md:text-right"
              >
                <div className="flex items-center gap-2 text-foreground-muted group-hover:text-accent mb-2 transition-colors md:justify-end">
                  <span className="text-sm font-medium">다음 글</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <span className="block text-foreground group-hover:text-accent transition-colors font-semibold line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-10 p-6 rounded-xl bg-gradient-to-br from-accent/5 to-background-secondary border border-card-border">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent-hover/20 p-1 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-background-secondary overflow-hidden ring-2 ring-accent/30">
                  <img
                    src="/profile.jpeg"
                    alt="프로필 이미지"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-foreground mb-1">@chani</div>
                <div className="text-sm text-foreground-muted mb-3 leading-relaxed">
                  바둑, 스타크래프트 등 고전 게임을 좋아하는 내향인 개발자입니다
                </div>
                <div className="flex gap-2">
                  <Link
                    href="https://github.com/csbiy"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-background hover:bg-accent/10 text-foreground-muted hover:text-accent transition-all border border-card-border hover:border-accent"
                    aria-label="GitHub"
                  >
                    <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/chan-soo-kim-ba2047278"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-background hover:bg-accent/10 text-foreground-muted hover:text-accent transition-all border border-card-border hover:border-accent"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
                  </Link>
                </div>
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
