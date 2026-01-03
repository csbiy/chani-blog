"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background-secondary" />

      {/* 그리드 패턴 (Vercel 스타일) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(var(--card-border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--card-border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 글로우 효과 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            개발자의 학습 기록
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Chani.Blog
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground-muted mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          바둑 좋아하는 개발자의
          <br />
          의미있는 학습 기록을 위한 공간
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="#posts"
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all hover:scale-105"
          >
            글 둘러보기
          </Link>
          <Link
            href="https://github.com/csbiy"
            target="_blank"
            className="px-6 py-3 border border-card-border hover:border-accent text-foreground rounded-lg font-medium transition-all hover:scale-105"
          >
            GitHub
          </Link>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg
          className="w-6 h-6 text-foreground-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
