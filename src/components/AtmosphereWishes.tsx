import {useEffect, useRef, useState} from 'react';
import {Download, Flame, Snowflake, Star, Trash2, Trees} from 'lucide-react';
import {
  INITIAL_WISHES,
  type MotifType,
  type WishCard,
} from '../data/christmasContent';

const STORAGE_KEY = 'noel-2026-wishes-v1';

const MOTIFS: Array<{key: MotifType; label: string}> = [
  {key: 'pine', label: '冷杉松枝'},
  {key: 'candle', label: '蜂蠟燭火'},
  {key: 'star', label: '冬夜星芒'},
  {key: 'snowflake', label: '初雪結晶'},
];

function MotifIcon({motif, className = 'h-4 w-4'}: {motif: MotifType; className?: string}) {
  switch (motif) {
    case 'pine':
      return <Trees className={className} />;
    case 'candle':
      return <Flame className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'snowflake':
      return <Snowflake className={className} />;
  }
}

interface AtmosphereWishesProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function AtmosphereWishes({inputRef}: AtmosphereWishesProps) {
  const [wishes, setWishes] = useState<WishCard[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as WishCard[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage error
    }
    return INITIAL_WISHES;
  });

  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [motif, setMotif] = useState<MotifType>('candle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore storage quota error
    }
  }, [wishes]);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const showFeedback = (text: string) => {
    setFeedback(text);
    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(feedbackTimerRef.current);
    }
    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, 3200);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanRecipient = recipient.trim() || '親愛的朋友';
    const cleanMessage = message.trim();
    const cleanSender = sender.trim() || '冬夜來信者';

    if (!cleanMessage) {
      showFeedback('請先寫下一段聖誕祝福內容。');
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const newCard: WishCard = {
      id: `wish-${Date.now()}`,
      recipient: cleanRecipient,
      message: cleanMessage,
      sender: cleanSender,
      motif,
      createdAt: today,
      isCustom: true,
    };

    setWishes((prev) => [newCard, ...prev]);
    setRecipient('');
    setMessage('');
    setSender('');
    showFeedback('已將你的祝福張貼到冬夜祝福牆。');
  };

  const handleDeleteWish = (id: string) => {
    setWishes((prev) => prev.filter((item) => item.id !== id));
    showFeedback('已移除該則祝福卡片。');
  };

  const handleDownloadCardPng = () => {
    const cleanRecipient = recipient.trim() || '親愛的朋友';
    const cleanMessage =
      message.trim() || '願這個冬夜的燭火與初雪，替你留住一整年最溫柔的時刻。';
    const cleanSender = sender.trim() || 'Noël Archive 2026';

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 750;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Deep pine canvas background
    ctx.fillStyle = '#090D0B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle inner frame
    ctx.strokeStyle = 'rgba(212, 168, 83, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);

    // Kicker
    ctx.fillStyle = '#D4A853';
    ctx.font = '500 22px "Plus Jakarta Sans", "Noto Sans TC", sans-serif';
    ctx.fillText('NOËL ARCHIVE 2026  ·  SEASONAL GREETING', 88, 118);

    // Recipient
    ctx.fillStyle = '#F5F1E8';
    ctx.font = '600 44px "Cormorant Garamond", "Noto Serif TC", serif';
    ctx.fillText(cleanRecipient, 88, 210);

    // Wrapped Message
    ctx.fillStyle = '#E6E0D3';
    ctx.font = '400 28px "Plus Jakarta Sans", "Noto Sans TC", sans-serif';
    const maxWidth = 1020;
    const lineHeight = 48;
    let y = 290;
    let currentLine = '';

    for (const char of cleanMessage) {
      const testLine = currentLine + char;
      if (ctx.measureText(testLine).width > maxWidth || char === '\n') {
        ctx.fillText(currentLine, 88, y);
        currentLine = char === '\n' ? '' : char;
        y += lineHeight;
        if (y > 540) break;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine && y <= 540) {
      ctx.fillText(currentLine, 88, y);
    }

    // Divider & Sender
    ctx.strokeStyle = 'rgba(245, 241, 232, 0.16)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(88, 608);
    ctx.lineTo(1112, 608);
    ctx.stroke();

    ctx.fillStyle = '#B8B2A6';
    ctx.font = '400 22px "Plus Jakarta Sans", "Noto Sans TC", sans-serif';
    ctx.fillText(`From ${cleanSender}`, 88, 658);

    const motifLabel = MOTIFS.find((item) => item.key === motif)?.label ?? '冬夜祝福';
    ctx.fillStyle = '#D4A853';
    ctx.textAlign = 'right';
    ctx.fillText(`Merry Christmas · ${motifLabel}`, 1112, 658);

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `christmas-card-${Date.now()}.png`;
    link.click();
    showFeedback('已匯出聖誕賀卡 PNG 圖檔。');
  };

  return (
    <section
      id="wish-studio"
      className="mx-auto max-w-[1280px] border-t border-[#F5F1E8]/10 px-6 py-16 lg:px-10 lg:py-24"
    >
      <div className="max-w-2xl">
        <p className="text-xs tracking-widest text-[#D4A853]">
          03. Greeting Card Studio &amp; Keepsake Wall
        </p>
        <h2 className="font-editorial mt-2 text-3xl font-semibold tracking-tight text-[#F5F1E8] sm:text-4xl [text-wrap:balance]">
          為重要的人留一張冬夜聖誕賀卡
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#B8B2A6]">
          寫下你的季節祝福，可即時張貼於本機保存的冬夜祝福牆，也能直接匯出成高畫質 PNG 賀卡分享給親友。
        </p>
      </div>

      {/* Form + Live Preview Split */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-5 rounded-xl border border-[#F5F1E8]/12 bg-[#121A16] p-6 lg:col-span-6 lg:p-8"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="wish-recipient" className="block text-xs font-medium text-[#B8B2A6]">
                收件人稱呼
              </label>
              <input
                ref={inputRef}
                id="wish-recipient"
                type="text"
                maxLength={32}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="例如：親愛的知己、台北的家人"
                className="mt-2 w-full rounded-md border border-[#F5F1E8]/15 bg-[#090D0B] px-3.5 py-2.5 text-sm text-[#F5F1E8] placeholder:text-[#B8B2A6]/45 focus:border-[#D4A853] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="wish-message" className="block text-xs font-medium text-[#B8B2A6]">
                聖誕祝福內容
              </label>
              <textarea
                id="wish-message"
                rows={4}
                maxLength={180}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="寫下你想送出的冬夜心意..."
                className="mt-2 w-full resize-none rounded-md border border-[#F5F1E8]/15 bg-[#090D0B] px-3.5 py-2.5 text-sm leading-relaxed text-[#F5F1E8] placeholder:text-[#B8B2A6]/45 focus:border-[#D4A853] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="wish-sender" className="block text-xs font-medium text-[#B8B2A6]">
                  署名
                </label>
                <input
                  id="wish-sender"
                  type="text"
                  maxLength={24}
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="你的名字"
                  className="mt-2 w-full rounded-md border border-[#F5F1E8]/15 bg-[#090D0B] px-3.5 py-2.5 text-sm text-[#F5F1E8] placeholder:text-[#B8B2A6]/45 focus:border-[#D4A853] focus:outline-none"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-[#B8B2A6]">賀卡印記</span>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {MOTIFS.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setMotif(item.key)}
                      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 rounded-md border px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                        motif === item.key
                          ? 'border-[#D4A853] bg-[#D4A853]/15 text-[#F5F1E8]'
                          : 'border-[#F5F1E8]/12 bg-[#090D0B] text-[#B8B2A6] hover:text-[#F5F1E8]'
                      }`}
                    >
                      <MotifIcon motif={item.key} className="h-3.5 w-3.5 text-[#D4A853]" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F5F1E8]/10 pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="whitespace-nowrap shrink-0 rounded-md bg-[#D4A853] px-5 py-2.5 text-sm font-medium text-[#090D0B] transition-colors hover:bg-[#E2BA6B] focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
              >
                張貼至祝福牆
              </button>
              <button
                type="button"
                onClick={handleDownloadCardPng}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-md border border-[#F5F1E8]/20 px-4 py-2.5 text-sm font-medium text-[#F5F1E8] transition-colors hover:border-[#F5F1E8]/45 hover:bg-[#F5F1E8]/5 focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>下載 PNG 賀卡</span>
              </button>
            </div>
            {feedback && (
              <p role="status" className="text-xs text-[#D4A853]">
                {feedback}
              </p>
            )}
          </div>
        </form>

        {/* Live Card Preview */}
        <div className="flex flex-col justify-between rounded-xl border border-[#D4A853]/35 bg-[#0D1310] p-8 lg:col-span-6">
          <div className="flex items-center justify-between gap-4 border-b border-[#F5F1E8]/10 pb-4">
            <span className="text-xs tracking-widest text-[#D4A853]">
              即時賀卡預覽 · Noël 2026
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#B8B2A6]">
              <MotifIcon motif={motif} className="h-4 w-4 text-[#D4A853]" />
              <span>{MOTIFS.find((m) => m.key === motif)?.label}</span>
            </span>
          </div>

          <div className="my-auto py-8">
            <p className="font-editorial text-2xl font-semibold text-[#F5F1E8]">
              {recipient.trim() || '親愛的朋友'}
            </p>
            <p className="mt-4 max-w-[46ch] whitespace-pre-line text-base leading-relaxed text-[#E6E0D3]">
              {message.trim() ||
                '願這個冬夜的燭火與初雪，替你留住一整年最溫柔的時刻。平安夜快樂。'}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[#F5F1E8]/10 pt-4 text-xs text-[#B8B2A6]">
            <span>From {sender.trim() || '冬夜來信者'}</span>
            <span>Merry Christmas · 2026</span>
          </div>
        </div>
      </div>

      {/* Keepsake Board Grid (3 columns on desktop, zero pill badges) */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishes.map((wish) => (
          <article
            key={wish.id}
            className="flex flex-col justify-between rounded-xl border border-[#F5F1E8]/12 bg-[#121A16] p-6"
          >
            <div>
              <div className="flex items-center justify-between gap-3 text-xs text-[#B8B2A6]">
                <div className="flex items-center gap-2">
                  <MotifIcon motif={wish.motif} className="h-3.5 w-3.5 text-[#D4A853]" />
                  <span>{MOTIFS.find((m) => m.key === wish.motif)?.label}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{wish.createdAt}</span>
                </div>

                {wish.isCustom && (
                  <button
                    type="button"
                    onClick={() => handleDeleteWish(wish.id)}
                    aria-label={`刪除給 ${wish.recipient} 的祝福`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#B8B2A6] transition-colors hover:bg-[#B83A3A]/20 hover:text-[#F5F1E8] focus-visible:outline-2 focus-visible:outline-[#D4A853] cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <h3 className="font-editorial mt-4 text-xl font-semibold text-[#F5F1E8]">
                {wish.recipient}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#E6E0D3]">
                {wish.message}
              </p>
            </div>

            <div className="mt-6 border-t border-[#F5F1E8]/10 pt-3 text-xs text-[#B8B2A6]">
              <span>署名：{wish.sender}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
