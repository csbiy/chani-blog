"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfileCard() {
  return (
    <motion.div
      className="w-full max-w-xs p-6 bg-card-bg rounded-2xl border border-card-border shadow-card hover:shadow-card-hover transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent-hover/20 p-1"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-full h-full rounded-full bg-background-secondary overflow-hidden ring-2 ring-accent/30">
            <img
              src="/profile.jpeg"
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        <h3 className="text-xl font-bold text-foreground mt-4 tracking-tight">@Chani</h3>
        <p className="text-foreground-muted text-center mt-3 text-sm leading-relaxed">
          바둑, 스타크래프트 등 고전 게임을 좋아하는
          <br />
          내향인 개발자입니다
        </p>
        <div className="flex gap-3 mt-5">
          <motion.div whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://github.com/csbiy"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-background-secondary hover:bg-accent/10 text-foreground-muted hover:text-accent transition-all duration-200 border border-card-border hover:border-accent"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://www.linkedin.com/in/chan-soo-kim-ba2047278"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-background-secondary hover:bg-accent/10 text-foreground-muted hover:text-accent transition-all duration-200 border border-card-border hover:border-accent"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
