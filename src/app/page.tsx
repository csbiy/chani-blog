import Header from "@/components/Header";
import { getAllPosts } from "@/app/lib/posts";

import Main from "@/components/Main";


export default function App() {
  const posts = getAllPosts();
  return (
      <section className="relative w-full h-screen">
        <Header/>
        <Main posts={posts}/>
      </section>

  );
}
