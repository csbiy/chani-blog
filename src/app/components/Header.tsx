"use client";
import Link from "next/link";

export default function Header() {
  return (
      <header className="sticky top-0 z-50 bg-gray-100/90 backdrop-blur-md shadow-md transition-shadow">
        <div className="mx-auto flex items-center justify-between py-2 px-3 md:px-8">
          <h1 className="text-xl md:text-1xl tracking-tight">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Chani.Blog</Link>
          </h1>
        </div>
      </header>
  );
}
