import {useEffect, useState} from 'react';
import {Maximize2, Snowflake, Volume2, VolumeX, Flame, Moon} from 'lucide-react';
import type {AtmosphereMood, ChristmasPlate, SnowIntensity} from '../data/christmasContent';

interface HeroExhibitionProps {
  plate: ChristmasPlate;
  mood: AtmosphereMood;
  snowIntensity: SnowIntensity;
  audioPlaying: boolean;
  onToggleMood: (mood: AtmosphereMood) => void;
  onChangeSnow: (intensity: SnowIntensity) => void;
  onToggleAudio: () => void;
  onOpenLightbox: () => void;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isChristmasDay: boolean;
  targetYear: number;
}

function getChristmasCountdown(): CountdownState {
  const now = new Date();
  let year = now.getFullYear();
  const isTodayChristmas = now.getMonth() === 11 && now.getDate() === 25;

  if (isTodayChristmas) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isChristmasDay: true,
      targetYear: year,
    };
  }

  let target = new Date(year, 11, 25, 0, 0, 0);
  if (now.getTime() > target.getTime()) {
    year += 1;
    target = new Date(year, 11, 25, 0, 0, 0);
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isChristmasDay: false,
    targetYear: year,
  };
}

export function HeroExhibition({
  plate,
  mood,
  snowIntensity,
  audioPlaying,
  onToggleMood,
  onChangeSnow,
  onToggleAudio,
  onOpenLightbox,
}: HeroExhibitionProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => getChristmasCountdown());
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getChristmasCountdown());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const pad = (val: number) => String(val).padStart(2, '0');

  return (
    <section id="plate-hearth" className="mx-auto max-w-[1280px] px-6 pt-10 pb-12 lg:px-10 lg:pt-14">
      {/* 2-Column Hero Split with items-stretch */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Typographic Column */}
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <div>
            <p className="text-xs tracking-widest text-[#D4A853]">
              Winter Monograph · December 2026 · Plate I
            </p>

            <h1 className="font-editorial mt-5 text-[clamp(2.25rem,3.6vw,3.35rem)] leading-[1.15] font-semibold tracking-tight text-[#F5F1E8] [text-wrap:balance]">
              在壁爐微光與初雪之間，收藏冬夜最溫柔的聖誕時刻
            </h1>

            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-[#B8B2A6]">
              我們以兩幅冬夜攝影為起點，將松木香氣、蜂蠟燭火與飄雪窗景凝結成一座安靜的線上聖誕特展。你可以點亮壁爐八音盒聲景、調整雪勢，並寫下一張可保存的冬夜祝福賀卡。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onToggleAudio}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md bg-[#D4A853] px-5 py-3 text-sm font-medium text-[#090D0B] transition-colors duration-150 hover:bg-[#E2BA6B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853] cursor-pointer"
              >
                {audioPlaying ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span>暫停壁爐八音盒</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    <span>開啟壁爐與八音盒聲景</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenLightbox}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md border border-[#F5F1E8]/20 px-5 py-3 text-sm font-medium text-[#F5F1E8] transition-colors duration-150 hover:border-[#F5F1E8]/45 hover:bg-[#F5F1E8]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853] cursor-pointer"
              >
                <Maximize2 className="h-4 w-4" />
                <span>全螢幕欣賞典藏映像</span>
              </button>
            </div>
          </div>

          {/* Unboxed Metadata Footer */}
          <div className="border-t border-[#F5F1E8]/12 pt-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#B8B2A6]">
              <span className="text-[#F5F1E8] font-medium">{plate.plateNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{plate.title}</span>
              <span aria-hidden="true">·</span>
              <span>{plate.lightingTemp}</span>
            </div>
          </div>
        </div>

        {/* Right Visual Plate I Column */}
        <div className="lg:col-span-7">
          <figure className="group relative h-full min-h-[340px] overflow-hidden rounded-xl border border-[#F5F1E8]/12 bg-[#121A16] lg:min-h-[490px]">
            {imgError ? (
              <div className="flex h-full min-h-[340px] w-full flex-col items-center justify-center bg-[#121A16] p-8 text-center">
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

            {/* Measured Scrim for Caption Legibility */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#090D0B]/90 via-[#090D0B]/45 to-transparent"
            />

            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="text-xs text-[#D4A853]">{plate.englishSubtitle}</p>
                <p className="mt-1 text-sm text-[#F5F1E8]">{plate.caption}</p>
              </div>
              <button
                type="button"
                onClick={onOpenLightbox}
                aria-label="放大檢視 Plate I"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#F5F1E8]/25 bg-[#090D0B]/70 text-[#F5F1E8] backdrop-blur-sm transition-colors hover:bg-[#D4A853] hover:text-[#090D0B] focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Full-Width Countdown & Atmosphere Control Strip below Hero Split */}
      <div
        id="countdown"
        className="mt-8 grid grid-cols-1 gap-6 rounded-xl border border-[#F5F1E8]/12 bg-[#121A16] p-6 lg:grid-cols-12 lg:items-center lg:gap-8"
      >
        {/* 4-Column Tabular Countdown */}
        <div className="lg:col-span-6">
          <p className="text-xs text-[#B8B2A6]">
            {countdown.isChristmasDay
              ? `Merry Christmas ${countdown.targetYear} · 今日正是聖誕節`
              : `距離 ${countdown.targetYear} 聖誕節平安時刻`}
          </p>
          <div className="mt-3 grid grid-cols-4 gap-4">
            <div className="border-r border-[#F5F1E8]/10 pr-3">
              <div className="font-mono-tabular text-2xl font-medium text-[#F5F1E8] sm:text-3xl">
                {pad(countdown.days)}
              </div>
              <div className="mt-0.5 text-xs text-[#B8B2A6]">天 Days</div>
            </div>
            <div className="border-r border-[#F5F1E8]/10 pr-3">
              <div className="font-mono-tabular text-2xl font-medium text-[#F5F1E8] sm:text-3xl">
                {pad(countdown.hours)}
              </div>
              <div className="mt-0.5 text-xs text-[#B8B2A6]">時 Hours</div>
            </div>
            <div className="border-r border-[#F5F1E8]/10 pr-3">
              <div className="font-mono-tabular text-2xl font-medium text-[#F5F1E8] sm:text-3xl">
                {pad(countdown.minutes)}
              </div>
              <div className="mt-0.5 text-xs text-[#B8B2A6]">分 Mins</div>
            </div>
            <div>
              <div className="font-mono-tabular text-2xl font-medium text-[#D4A853] sm:text-3xl">
                {pad(countdown.seconds)}
              </div>
              <div className="mt-0.5 text-xs text-[#B8B2A6]">秒 Secs</div>
            </div>
          </div>
        </div>

        {/* Interactive Atmosphere Controls */}
        <div className="flex flex-col gap-4 border-t border-[#F5F1E8]/10 pt-5 lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium text-[#B8B2A6]">冬夜飄雪</span>
            <div className="inline-flex items-center gap-1 rounded-lg bg-[#090D0B] p-1">
              {(
                [
                  {key: 'gentle', label: '細雪微飄'},
                  {key: 'blizzard', label: '瑞雪紛飛'},
                  {key: 'off', label: '雪停靜夜'},
                ] as const
              ).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onChangeSnow(item.key)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                    snowIntensity === item.key
                      ? 'bg-[#D4A853] text-[#090D0B]'
                      : 'text-[#B8B2A6] hover:text-[#F5F1E8]'
                  }`}
                >
                  <Snowflake className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium text-[#B8B2A6]">光影色溫</span>
            <div className="inline-flex items-center gap-1 rounded-lg bg-[#090D0B] p-1">
              <button
                type="button"
                onClick={() => onToggleMood('candlelight')}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                  mood === 'candlelight'
                    ? 'bg-[#D4A853] text-[#090D0B]'
                    : 'text-[#B8B2A6] hover:text-[#F5F1E8]'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                <span>燭光暖夜</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleMood('frostlight')}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                  mood === 'frostlight'
                    ? 'bg-[#D4A853] text-[#090D0B]'
                    : 'text-[#B8B2A6] hover:text-[#F5F1E8]'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>霜雪清輝</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
