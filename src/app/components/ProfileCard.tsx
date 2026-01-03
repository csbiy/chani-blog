"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfileCard() {
  return (
    <motion.div
      className="w-full max-w-xs p-6 bg-card-bg rounded-2xl border border-card-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-background-secondary overflow-hidden ring-2 ring-accent/20">
          <img
            src="/profile.jpeg"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground mt-4">@Chani</h3>
        <p className="text-foreground-muted text-center mt-2 text-sm">
          바둑 좋아하는 개발자의
          <br />
          의미있는 학습 기록을 위한 공간입니다.
        </p>
        <div className="flex gap-4 mt-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://github.com/csbiy"
              target="_blank"
              rel="noreferrer"
              className="text-foreground-muted hover:text-accent transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://www.linkedin.com/in/chan-soo-kim-ba2047278"
              target="_blank"
              rel="noreferrer"
              className="text-foreground-muted hover:text-accent transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
