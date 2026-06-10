import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = "MAJxTN0GRYli5RB6rz8o652YQNukq3B0Pei9";
const SERVICE_DOMAIN = "kb42gi1cr7";

// 複数行にわたるクォートフィールドも正しく処理するCSVパーサー
function parseCSV(content) {
  const result = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field.trim());
        field = '';
      } else if (ch === '\r' && next === '\n') {
        row.push(field.trim());
        result.push(row);
        row = [];
        field = '';
        i++;
      } else if (ch === '\n' || ch === '\r') {
        row.push(field.trim());
        result.push(row);
        row = [];
        field = '';
      } else {
        field += ch;
      }
    }
  }

  if (field || row.length > 0) {
    row.push(field.trim());
    result.push(row);
  }

  return result;
}

// CSV列インデックス（先頭列は空なので1始まり）
// [0]=空, [1]=ジャンル, [2]=おすすめ, [3]=店の名前, [4]=サイト,
// [5]=ラストオーダー, [6]=予算, [7]=会社↔店(徒歩分), [8]=備考

const csvPath = join(__dirname, 'src/data/shoplist.csv');
const csvContent = readFileSync(csvPath, 'utf-8');
const rows = parseCSV(csvContent);

// rows[0]=空行, rows[1]=ヘッダー → rows[2]以降がデータ
const shops = rows
  .slice(2)
  .filter(row => row[3] && row[3].trim())            // 店名がある行のみ
  .filter(row => !(row[8] || '').includes('つぶれた')) // 閉店をスキップ
  .map(row => ({
    name: row[3],
    highlightGenre: row[1],
    highlightName: row[2],
    siteurlSrc: row[4] || '',
    lastOrder: row[5] || '',
    budget: row[6] || '',
    walkMinutes: parseInt((row[7] || '0').replace('分', ''), 10) || 0,
    notes: row[8] || '',
  }));

const isDryRun = process.argv.includes('--dry-run');

if (isDryRun) {
  console.log(`【ドライラン】${shops.length}件が登録対象:\n`);
  shops.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name}`);
    console.log(`   ジャンル: ${s.highlightGenre} / おすすめ: ${s.highlightName}`);
    console.log(`   URL: ${s.siteurlSrc}`);
    console.log(`   ラストオーダー: ${s.lastOrder} / 予算: ${s.budget} / 徒歩: ${s.walkMinutes}分`);
    if (s.notes) console.log(`   備考: ${s.notes}`);
  });
  process.exit(0);
}

async function registerShop(shop) {
  const res = await fetch(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/shops`, {
    method: 'POST',
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shop),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`❌ ${shop.name}: ${err}`);
    return false;
  }

  const data = await res.json();
  console.log(`✅ ${shop.name} (ID: ${data.id})`);
  return true;
}

async function main() {
  console.log(`${shops.length}件の店舗を登録します...\n`);
  let success = 0;
  for (const shop of shops) {
    const ok = await registerShop(shop);
    if (ok) success++;
    await new Promise(r => setTimeout(r, 300));
  }
  console.log(`\n完了: ${success}/${shops.length}件登録成功`);
}

main();
