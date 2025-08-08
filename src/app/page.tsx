import Header from "@/app/components/Header";
import Main from "@/app/components/Main";
import {getAllSortedPostsData} from "@/app/posts/[id]/page";

export default async function App() {
  const posts = await getAllSortedPostsData();

  return (
      <section className="relative w-full h-screen">
        <Header />
        <Main posts={posts} />
      </section>
  );
}
