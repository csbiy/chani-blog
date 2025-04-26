
패키지 구조 


```text
my-blog/
├── public/                # 정적 파일 (이미지, favicon 등)
├── src/
│   ├── app/               # Next.js 페이지 구조
│   │   ├── layout.tsx     # 공통 레이아웃
│   │   ├── page.tsx       # 홈 (소개 + 최근 글)
│   │   ├── about/         # 자기소개 페이지
│   │   │   └── page.tsx
│   │   ├── projects/      # 프로젝트 리스트
│   │   │   └── page.tsx
│   │   ├── posts/         # 블로그 글 상세
│   │   │   └── [slug]/    # 슬러그 기반 동적 라우팅
│   │   │       └── page.tsx
│   ├── components/        # 재사용 UI 컴포넌트 (Header, Footer 등)
│   ├── lib/               # 마크다운 처리, 날짜 포맷 등 유틸 함수
│   ├── styles/            # Tailwind 관련 스타일 커스터마이징
│   └── content/           # 마크다운 블로그 글 저장소 (.md 파일)
├── tailwind.config.ts     # Tailwind 설정
├── postcss.config.js      # PostCSS 설정
├── next.config.js         # Next.js 설정
├── tsconfig.json          # TypeScript 설정
└── package.json           # 패키지 목록

```
