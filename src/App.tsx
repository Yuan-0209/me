import {useEffect, useRef, useState} from 'react';
import {
  CHRISTMAS_PLATES,
  type AtmosphereMood,
  type SnowIntensity,
} from './data/christmasContent';
import {festiveAudio} from './utils/festiveAudio';
import {SnowCanvas} from './components/SnowCanvas';
import {TopBar} from './components/TopBar';
import {HeroExhibition} from './components/HeroExhibition';
import {SecondPlateStory} from './components/SecondPlateStory';
import {AtmosphereWishes} from './components/AtmosphereWishes';
import {GithubDeploySection} from './components/GithubDeploySection';
import {LightboxModal} from './components/LightboxModal';

export default function App() {
  const [mood, setMood] = useState<AtmosphereMood>('candlelight');
  const [snowIntensity, setSnowIntensity] = useState<SnowIntensity>('gentle');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const wishInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      festiveAudio.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    if (audioPlaying) {
      festiveAudio.stop();
      setAudioPlaying(false);
    } else {
      festiveAudio.start();
      setAudioPlaying(true);
    }
  };

  const handleScrollToWishes = () => {
    const target = document.getElementById('wish-studio');
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
      window.setTimeout(() => {
        wishInputRef.current?.focus();
      }, 450);
    }
  };

  return (
    <div
      id="top"
      className={`relative min-h-screen transition-colors duration-500 ${
        mood === 'frostlight'
          ? 'bg-[#080E14] text-[#F5F1E8]'
          : 'bg-[#090D0B] text-[#F5F1E8]'
      }`}
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
          mood === 'candlelight'
            ? 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(212,168,83,0.12),transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(148,186,222,0.12),transparent_70%)]'
        }`}
      />

      <SnowCanvas intensity={snowIntensity} mood={mood} />

      <div className="relative z-10">
        <TopBar onWriteWishClick={handleScrollToWishes} />

        <main>
          <HeroExhibition
            plate={CHRISTMAS_PLATES[0]}
            mood={mood}
            snowIntensity={snowIntensity}
            audioPlaying={audioPlaying}
            onToggleMood={setMood}
            onChangeSnow={setSnowIntensity}
            onToggleAudio={handleToggleAudio}
            onOpenLightbox={() => setLightboxIndex(0)}
          />

          <SecondPlateStory
            plate={CHRISTMAS_PLATES[1]}
            mood={mood}
            onOpenLightbox={() => setLightboxIndex(1)}
          />

          <AtmosphereWishes inputRef={wishInputRef} />

          <GithubDeploySection />
        </main>

        <footer className="border-t border-[#F5F1E8]/10 bg-[#070A08]">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-xs text-[#B8B2A6] lg:px-10">
            <p className="font-editorial text-sm text-[#F5F1E8]">
              Noël Archive 2026 · 冬夜聖誕誌
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#plate-hearth" className="hover:text-[#F5F1E8] transition-colors">
                Plate I 壁爐映像
              </a>
              <span aria-hidden="true">·</span>
              <a href="#plate-table" className="hover:text-[#F5F1E8] transition-colors">
                Plate II 霜窗餐桌
              </a>
              <span aria-hidden="true">·</span>
              <a href="#wish-studio" className="hover:text-[#F5F1E8] transition-colors">
                聖誕賀卡工坊
              </a>
              <span aria-hidden="true">·</span>
              <a href="#github-publish" className="hover:text-[#F5F1E8] transition-colors">
                GitHub 發佈指南
              </a>
            </div>
          </div>
        </footer>
      </div>

      <LightboxModal
        plates={CHRISTMAS_PLATES}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
