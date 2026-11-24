import {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut} from 'lucide-react';
import type {ChristmasPlate} from '../data/christmasContent';

interface LightboxModalProps {
  plates: ChristmasPlate[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function LightboxModal({
  plates,
  activeIndex,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  const [zoomed, setZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setZoomed(false);
    setImageError(false);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % plates.length);
      } else if (event.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + plates.length) % plates.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onClose, onSelectIndex, plates.length]);

  if (activeIndex === null) return null;
  const plate = plates[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${plate.plateNumber} ${plate.title}`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050706]/95 p-4 md:p-8 backdrop-blur-sm"
    >
      {/* Top Bar */}
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 border-b border-[#F5F1E8]/12 pb-4">
        <div className="flex items-center gap-3 text-xs text-[#B8B2A6]">
          <span className="font-medium text-[#D4A853]">{plate.plateNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{plate.title}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{plate.location}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setZoomed((prev) => !prev)}
            className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md border border-[#F5F1E8]/15 px-3 py-2 text-xs font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8]/10 focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
          >
            {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            <span>{zoomed ? '恢復原尺寸' : '放大檢視'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="關閉全螢幕檢視"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#F5F1E8]/15 text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8]/10 focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image Canvas */}
      <div className="relative mx-auto my-4 flex w-full max-w-[1200px] flex-1 items-center justify-center overflow-hidden">
        {imageError ? (
          <div className="flex h-[60vh] w-full flex-col items-center justify-center rounded-xl border border-[#F5F1E8]/12 bg-[#121A16] p-8 text-center">
            <p className="font-editorial text-2xl text-[#F5F1E8]">{plate.title}</p>
            <p className="mt-2 text-sm text-[#B8B2A6]">{plate.caption}</p>
          </div>
        ) : (
          <div className="flex max-h-[72vh] w-full items-center justify-center overflow-auto rounded-lg">
            <img
              src={plate.imageSrc}
              alt={plate.alt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className={`max-h-[70vh] w-auto rounded-lg object-contain transition-transform duration-300 ease-out ${
                zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setZoomed((prev) => !prev)}
            />
          </div>
        )}
      </div>

      {/* Footer Switcher */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-[#F5F1E8]/12 pt-4">
        <p className="max-w-2xl text-xs leading-relaxed text-[#B8B2A6]">
          {plate.caption}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex - 1 + plates.length) % plates.length)}
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md border border-[#F5F1E8]/15 px-3 py-2 text-xs font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8]/10 focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>上一幅</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex + 1) % plates.length)}
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md border border-[#F5F1E8]/15 px-3 py-2 text-xs font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8]/10 focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
          >
            <span>下一幅</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
