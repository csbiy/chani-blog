import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Main from "@/app/components/Main";
import { getAllSortedPostsData } from "@/app/lib/posts";

export default async function App() {
  const posts = await getAllSortedPostsData();

  return (
    <section className="relative w-full min-h-screen bg-background">
      <Header />
      <Hero />
      <Main posts={posts} />
    </section>
  );
}
