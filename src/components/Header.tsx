"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
];

export default function Header() {
  const pathname = usePathname();

  return (
      <header className="sticky top-0 z-50 bg-gray-100/90 backdrop-blur-md shadow-md transition-shadow">
        <div className="mx-auto flex items-center justify-between py-2 px-3 md:px-8">
          <h1 className="text-xl md:text-1xl tracking-tight">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Chani-Blog</Link>
          </h1>
          <nav className="space-x-4 md:space-x-6 hidden md:flex">
            {navItems.map(({ label, href }) => (
                <Link
                    key={href}
                    href={href}
                    className={`relative transition-colors duration-300 hover:text-indigo-600 ${
                        pathname === href
                            ? "text-indigo-600 font-semibold"
                            : "text-gray-700"
                    }`}
                >
                  {label}
                  {pathname === href && (
                      <span className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-indigo-600 rounded-full"></span>
                  )}
                </Link>
            ))}
          </nav>
        </div>
      </header>
  );
}
