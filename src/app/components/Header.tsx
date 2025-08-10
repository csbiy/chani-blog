"use client";
import Link from "next/link";

export default function Header() {
  return (
      <header className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 md:px-12">
          {/* 로고 + 아이콘 */}
          <Link href="/" className="flex items-center space-x-2 hover:text-indigo-600 transition-colors">
            {/* 코드 아이콘 (SVG) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
            </svg>
            <h1 className="text-2xl font-mono font-semibold tracking-wide">Chani.Blog</h1>
          </Link>

          {/* todo 오픈소스 컨트리뷰션도해보자 */}
          {/* 네비게이션 메뉴 */}
          {/*<nav className="hidden md:flex space-x-8 font-mono text-sm text-gray-700">*/}
          {/*  <Link href="/about" className="hover:text-indigo-600 transition-colors">*/}
          {/*    About*/}
          {/*  </Link>*/}
          {/*  <Link href="/projects" className="hover:text-indigo-600 transition-colors">*/}
          {/*    Projects*/}
          {/*  </Link>*/}
          {/*  <Link href="/contact" className="hover:text-indigo-600 transition-colors">*/}
          {/*    Contact*/}
          {/*  </Link>*/}
          {/*</nav>*/}
        </div>
      </header>
  );
}
