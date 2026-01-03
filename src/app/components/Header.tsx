"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 md:px-12">
        <Link href="/" className="flex items-center space-x-2 hover:text-accent transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
          </svg>
          <h1 className="text-2xl font-mono font-semibold tracking-wide">Chani.Blog</h1>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
