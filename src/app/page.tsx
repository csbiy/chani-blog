import Header from "@/app/components/Header";
import Main from "@/app/components/Main";
import { getAllPosts } from "@/app/lib/posts";

export default function App() {
  const posts = getAllPosts();
  return (
      <section className="relative w-full h-screen">
        <Header/>
        <Main posts={posts}/>
      </section>

  );
}
