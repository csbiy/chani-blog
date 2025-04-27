import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

// components/ProfileCard.tsx
export default function ProfileCard() {
  return (
      <div className="w-full max-w-xs p-6 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
            <img src="/profile.jpeg" alt="프로필 이미지" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-semibold">@Chani</h3>
          <p className="text-gray-500 text-center mt-2">바둑 좋아하는 개발자의 <br/> 의미있는 학습 기록을 위한 공간입니다.</p>
          <div className="flex gap-4 mt-4">
            <Link
                href={`https://github.com/csbiy`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 hover:text-indigo-600"
            >
              <FontAwesomeIcon icon={faGithub}/>
            </Link>
            <Link
                href={"https://www.linkedin.com/in/chan-soo-kim-ba2047278"}
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 hover:text-indigo-600 "
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          </div>
        </div>
      </div>
  );
}
