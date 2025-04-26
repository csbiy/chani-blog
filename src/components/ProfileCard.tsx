// components/ProfileCard.tsx
export default function ProfileCard() {
  return (
      <div className="w-full max-w-xs p-6 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
          <h3 className="text-xl font-semibold">난개발자</h3>
          <p className="text-gray-500 text-center mt-2">안녕하세요! 개발과 사이드 프로젝트를 좋아하는 난개발자입니다.</p>
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/" target="_blank" className="text-gray-400 hover:text-black">
              GitHub
            </a>
            <a href="https://linkedin.com/" target="_blank" className="text-gray-400 hover:text-black">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
  );
}
