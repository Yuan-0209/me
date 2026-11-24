interface TopBarProps {
  onWriteWishClick: () => void;
}

export function TopBar({onWriteWishClick}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#F5F1E8]/10 bg-[#090D0B]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4 lg:px-10">
        {/* Zone 1: Single-element wordmark */}
        <a
          href="#top"
          className="font-editorial text-xl font-semibold tracking-tight text-[#F5F1E8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
        >
          Noël Archive 2026
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="主導覽列"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B8B2A6]"
        >
          <a
            href="#plate-hearth"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#F5F1E8] hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            冬夜映像
          </a>
          <a
            href="#plate-table"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#F5F1E8] hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            節慶故事
          </a>
          <a
            href="#wish-studio"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#F5F1E8] hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            祝福賀卡
          </a>
          <a
            href="#github-publish"
            className="whitespace-nowrap shrink-0 py-1 hover:text-[#F5F1E8] hover:underline underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            發佈指南
          </a>
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onWriteWishClick}
            className="whitespace-nowrap shrink-0 rounded-md bg-[#D4A853] px-4 py-2 text-sm font-medium text-[#090D0B] transition-colors duration-150 hover:bg-[#E2BA6B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853] cursor-pointer"
          >
            寫下聖誕祝福
          </button>
        </div>
      </div>
    </header>
  );
}
