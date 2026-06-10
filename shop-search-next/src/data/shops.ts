// src/data/shops.ts

export type Shop = {
  id: number;
  name: string;        // 店名
  area: string;        // エリア
  category: string;    // カテゴリ
  address: string;     // 住所
  budget: string;      // 予算目安
  tags: string[];      // タグ

  // ここから追加
  highlightName: string;   // 目玉商品の名前
  highlightGenre: string;  // 目玉商品のジャンル
  lastOrder: string;       // ラストオーダー
  walkMinutes: number;     // 徒歩何分
  thumbnailUrl: string;    // サムネ画像URL
  mapEmbedSrc: string;     // Google Maps の埋め込み src
  siteurlSrc: string;      // サイトURL
  notes: string;           // 備考
};

export const shops: Shop[] = [
  {
    id: 1,
    name: "中華ラーメン太郎",
    area: "六本木",
    category: "ラーメン",
    address: "〒106-0032 東京都港区六本木１丁目４",
    budget: "〜1000円",
    tags: ["中華そば", "あっさり", "一人でも入りやすい"],

    highlightName: "特製中華ラーメン",
    highlightGenre: "ラーメン",
    lastOrder: "22:30",
    walkMinutes: 10,
    thumbnailUrl: "/img01.png",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8884.258292038909!2d139.72737620282626!3d35.662225646141984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b7413bd2597%3A0x58d849a7033a2762!2z44GP44G-44KB44KTIOWFreacrOacqOW6lw!5e0!3m2!1sja!2sjp!4v1764598400591!5m2!1sja!2sjp",
  },
  // 他のお店も同じ形で増やしてOK
  {
    id: 2,
    name: "カフェ桜",
    area: "新宿",
    category: "カフェ",
    address: "東京都新宿区〇〇1-2-3",
    budget: "1000〜2000円",
    tags: ["スイーツ", "女子会", "電源あり"],

    highlightName: "季節のいちごタルト",
    highlightGenre: "スイーツ",
    lastOrder: "21:00",
    walkMinutes: 5,
    thumbnailUrl: "/img02.png",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5898.401914510431!2d139.73634569459017!3d35.66324129361307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b12bd89f439%3A0x9effa67f837d0284!2z44OR44OG44Kj44K544Oq44O877yG44Kr44OV44Kn44OH44Oq44O844OiIOm6u-W4g-WPsOODkuODq-OCuuW6lw!5e0!3m2!1sja!2sjp!4v1764598902281!5m2!1sja!2sjp",
  },
];
