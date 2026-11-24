import hearthEveImg from '../assets/images/christmas_hearth_eve_1795504575886.jpg';
import winterTableImg from '../assets/images/christmas_winter_table_1795504576864.jpg';

export type AtmosphereMood = 'candlelight' | 'frostlight';
export type SnowIntensity = 'gentle' | 'blizzard' | 'off';
export type MotifType = 'pine' | 'candle' | 'star' | 'snowflake';

export interface ChristmasPlate {
  id: 'hearth' | 'table';
  plateNumber: string;
  title: string;
  englishSubtitle: string;
  location: string;
  aspectLabel: string;
  lightingTemp: string;
  scentNotes: string;
  caption: string;
  imageSrc: string;
  alt: string;
}

export interface WishCard {
  id: string;
  recipient: string;
  message: string;
  sender: string;
  motif: MotifType;
  createdAt: string;
  isCustom?: boolean;
}

export const CHRISTMAS_PLATES: ChristmasPlate[] = [
  {
    id: 'hearth',
    plateNumber: 'Plate I',
    title: '壁爐微光與冷杉樹影',
    englishSubtitle: 'Nordic Hearth & Beeswax Eve',
    location: '北歐木屋客廳 · 暮冬四時',
    aspectLabel: '16:9 寬幅典藏',
    lightingTemp: '2200K 蜂蠟燭光',
    scentNotes: '冷杉針葉、雪松木柴、烘烤堅果',
    caption: 'Fig. 01 — 窗外藍調初雪靜靜落下，屋內的石砌壁爐與蜂蠟燭火在深色實木間織出暖意。',
    imageSrc: hearthEveImg,
    alt: '北歐風格聖誕夜客廳，高大的冷杉聖誕樹點綴著暖色蜂蠟燭光與黃銅鈴鐺，窗外飄著冬雪，石砌壁爐燃著溫暖柴火。',
  },
  {
    id: 'table',
    plateNumber: 'Plate II',
    title: '霜窗邊的熱紅酒餐桌',
    englishSubtitle: 'Lantern Street & Spiced Table',
    location: '歐陸石板街窗畔 · 平安夜八時',
    aspectLabel: '4:3 紀實比例',
    lightingTemp: '2400K 黃銅長燭與街燈暮藍',
    scentNotes: '肉桂棒、風乾甜橙、丁香與熱紅酒',
    caption: 'Fig. 02 — 結著薄霜的木格窗外是點亮街燈的雪夜小鎮，松枝花環與暖燭陪襯著冬夜相聚。',
    imageSrc: winterTableImg,
    alt: '結霜窗邊的歐陸聖誕夜木質餐桌，擺放松枝、乾燥橙片、肉桂棒、紅漿果與黃銅燭台，窗外是飄雪的歐洲石板街與暖色街燈。',
  },
];

export const INITIAL_WISHES: WishCard[] = [
  {
    id: 'wish-initial-1',
    recipient: '致遠方的老友',
    message: '願這場冬雪帶走一整年的奔波與疲憊，讓屋裡的燭光與熱茶，安穩陪你度過每一個安靜夜晚。',
    sender: '林初晴',
    motif: 'candle',
    createdAt: '2026-12-20',
  },
  {
    id: 'wish-initial-2',
    recipient: '給家人與餐桌',
    message: '不需要盛大的儀式，只要窗外剛好下雪、桌上還留著熱湯與肉桂香氣，就是最完整的平安夜。',
    sender: '陳硯青',
    motif: 'pine',
    createdAt: '2026-12-22',
  },
  {
    id: 'wish-initial-3',
    recipient: '獻給即將啟程的明年',
    message: '在十二月的最後幾天裡，為自己點亮一盞不急不徐的燈，把溫柔留給眼前的人與事。',
    sender: '蘇沐澄',
    motif: 'star',
    createdAt: '2026-12-24',
  },
];
