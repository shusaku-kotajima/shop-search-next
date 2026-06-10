import { client } from "../../../lib/microcms";
import Link from "next/link";

function extractMapSrc(value) {
  if (!value) return null;
  const match = value.match(/src="([^"]+)"/);
  return match ? match[1] : value;
}

export default async function ShopDetail({ params }) {
  const { id } = await params;

  const shop = await client.get({
    endpoint: "shops",
    contentId: id,
  });

  if (!shop) {
    return <div>お店が見つかりませんでした</div>;
  }

  return (
    <div style={{
      minHeight: "100vh",
      padding: "32px 24px",
      maxWidth: "860px",
      margin: "0 auto",
      fontFamily: "'Rajdhani', sans-serif",
      color: "#e0eaff",
    }}>
      <Link href="/" style={{
        color: "#00e5ff",
        fontSize: "14px",
        letterSpacing: "1px",
        textDecoration: "none",
        display: "inline-block",
        marginBottom: "24px",
      }}>← 一覧に戻る</Link>

      {/* ヘッダー */}
      <div style={{
        background: "#0d1526",
        border: "1px solid rgba(0,229,255,0.2)",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "16px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, #7b2fff, #00e5ff, #ff00aa)",
        }} />
        <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#00e5ff", letterSpacing: "2px", fontFamily: "'Orbitron', sans-serif" }}>SHOP DETAIL</p>
        <h1 style={{ margin: "0 0 12px", fontSize: "28px", fontFamily: "'Orbitron', sans-serif", color: "#e0eaff" }}>{shop.name}</h1>
        <p style={{ margin: "0 0 4px", fontSize: "14px", color: "#ff00aa" }}>
          <span style={{ fontWeight: 600 }}>目玉：</span>{shop.highlightName}{shop.highlightGenre ? `（${shop.highlightGenre}）` : ""}
        </p>
        <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7fa8" }}>{shop.address}</p>
        <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7fa8" }}>徒歩約 {shop.walkMinutes} 分 ／ L.O. {shop.lastOrder}</p>
        <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7fa8" }}>予算：{shop.budget}</p>
        {shop.tags && (
          <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#00e5ff" }}>
            タグ：{Array.isArray(shop.tags) ? shop.tags.join("、") : shop.tags}
          </p>
        )}
        {shop.notes && (
          <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#ffd166" }}>
            備考：{shop.notes}
          </p>
        )}
        {shop.siteurlSrc && (
          <a
            href={shop.siteurlSrc}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "12px",
              padding: "6px 14px",
              border: "1px solid #00e5ff",
              borderRadius: "4px",
              color: "#00e5ff",
              fontSize: "12px",
              textDecoration: "none",
              letterSpacing: "1px",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            サイトを見る →
          </a>
        )}
      </div>

      {/* サムネイル */}
      {shop.thumbnailUrl?.url && (
        <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(0,229,255,0.2)" }}>
          <img src={shop.thumbnailUrl.url} alt={shop.name} style={{ width: "100%", display: "block", maxHeight: "400px", objectFit: "cover" }} />
        </div>
      )}

      {/* マップ */}
      {extractMapSrc(shop.mapEmbedSrc) && (
        <div style={{
          background: "#0d1526",
          border: "1px solid rgba(0,229,255,0.2)",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, #7b2fff, #00e5ff, #ff00aa)",
          }} />
          <iframe
            src={extractMapSrc(shop.mapEmbedSrc)}
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
            style={{ border: 0, display: "block" }}
            title={`${shop.name} の地図`}
          />
        </div>
      )}
    </div>
  );
}