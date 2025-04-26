"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/posts" },
];

export default function Header() {
  const pathname = usePathname();

  return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-shadow">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            <Link href="/" className="hover:text-blue-600 transition-colors">Chani</Link>
          </h1>
          <nav className="space-x-6 hidden md:flex">
            {navItems.map(({ label, href }) => (
                <Link
                    key={href}
                    href={href}
                    className={`transition-colors duration-200 hover:text-blue-600 ${
                        pathname === href ? "text-blue-600 font-semibold" : "text-gray-800"
                    }`}
                >
                  {label}
                </Link>
            ))}
          </nav>
        </div>
      </header>
  );
}
