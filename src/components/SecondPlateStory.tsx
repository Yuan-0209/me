import {useState} from 'react';
import {Maximize2} from 'lucide-react';
import type {AtmosphereMood, ChristmasPlate} from '../data/christmasContent';

interface SecondPlateStoryProps {
  plate: ChristmasPlate;
  mood: AtmosphereMood;
  onOpenLightbox: () => void;
}

export function SecondPlateStory({
  plate,
  mood,
  onOpenLightbox,
}: SecondPlateStoryProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="plate-table"
      className="mx-auto max-w-[1280px] border-t border-[#F5F1E8]/10 px-6 py-16 lg:px-10 lg:py-24"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#F5F1E8]/10 pb-6">
        <div>
          <p className="text-xs tracking-widest text-[#D4A853]">
            02. Winter Table &amp; Streetlight · {plate.plateNumber}
          </p>
          <h2 className="font-editorial mt-2 text-3xl font-semibold tracking-tight text-[#F5F1E8] sm:text-4xl [text-wrap:balance]">
            霜窗之外的石板雪街，與一桌熱紅酒的團聚溫度
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenLightbox}
          className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md border border-[#F5F1E8]/20 px-4 py-2 text-xs font-medium text-[#F5F1E8] transition-colors duration-150 hover:border-[#F5F1E8]/45 hover:bg-[#F5F1E8]/5 focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          <span>放大檢視 Plate II</span>
        </button>
      </div>

      {/* Asymmetric Editorial Split (7 / 5) */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        {/* Main 4:3 Plate II Presentation */}
        <figure className="lg:col-span-7">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#F5F1E8]/12 bg-[#121A16]">
            {imgError ? (
              <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                <p className="font-editorial text-2xl text-[#F5F1E8]">{plate.title}</p>
                <p className="mt-2 text-sm text-[#B8B2A6]">{plate.caption}</p>
              </div>
            ) : (
              <img
                src={plate.imageSrc}
                alt={plate.alt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                onClick={onOpenLightbox}
                className={`h-full w-full cursor-pointer object-cover transition-all duration-500 group-hover:scale-[1.015] ${
                  mood === 'frostlight'
                    ? 'brightness-95 saturate-85 contrast-105'
                    : 'brightness-100 saturate-105'
                }`}
              />
            )}
          </div>
          <figcaption className="mt-3 font-editorial text-sm italic text-[#B8B2A6]">
            {plate.caption}
          </figcaption>
        </figure>

        {/* Right Editorial Essay + Definition List Notes */}
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <div className="space-y-6">
            <p className="max-w-[65ch] text-base leading-[1.85] text-[#E6E0D3] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-editorial first-letter:text-5xl first-letter:font-semibold first-letter:text-[#D4A853]">
              聖誕夜最動人的畫面，往往存在於窗內與窗外的溫差裡。窗框外是零下飄雪的深藍暮色與黃銅街燈；窗內則是剛切開的風乾甜橙、肉桂棒、松枝花環與慢慢升溫的陶杯熱紅酒。當黃銅燭台的火光輕輕晃動，整個冬天便在笑聲與談話聲裡慢了下來。
            </p>

            {/* Pull Quote bounded by subtle top/bottom hairlines (no thick left border) */}
            <blockquote className="border-y border-[#F5F1E8]/12 py-5">
              <p className="font-editorial text-xl leading-relaxed italic text-[#F5F1E8]">
                「冬天的意義，也許就是讓遠行的人有理由回到一盞燈下，在松針與肉桂香氣裡重新確認彼此的陪伴。」
              </p>
            </blockquote>
          </div>

          {/* Accession-style Plate Notes */}
          <dl className="divide-y divide-[#F5F1E8]/10 border-t border-b border-[#F5F1E8]/10 text-sm">
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-xs text-[#B8B2A6]">場景時刻</dt>
              <dd className="text-right text-[#F5F1E8]">{plate.location}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-xs text-[#B8B2A6]">畫面比例</dt>
              <dd className="text-right text-[#F5F1E8]">{plate.aspectLabel}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-xs text-[#B8B2A6]">光影色溫</dt>
              <dd className="text-right text-[#F5F1E8]">{plate.lightingTemp}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-xs text-[#B8B2A6]">冬夜氣味</dt>
              <dd className="text-right text-[#F5F1E8]">{plate.scentNotes}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
