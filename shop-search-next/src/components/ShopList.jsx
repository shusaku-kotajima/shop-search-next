// src/components/ShopList.jsx
import { useRouter } from "next/navigation";

function ShopList({ shops, onSelectShop }) {
  const router = useRouter();
  return (
    <section className="results-section">
      <div className="results-header">
        <h2 className="card-title">検索結果</h2>
        <span className="results-count">{shops.length}件</span>
      </div>

      {shops.length === 0 ? (
        <p className="results-empty">条件に合うお店がありませんでした。</p>
      ) : (
        <ul className="shop-list">
          {shops.map((shop) => (
            <li
              key={shop.id}
              className="card shop-card shop-card-clickable"
              onClick={() => router.push(`/shops/${shop.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="shop-card-inner">
                {/* 左側：テキスト情報 */}
                <div className="shop-info">
                  <p className="shop-label">お店名前</p>
                  <h3 className="shop-name">{shop.name}</h3>

                  <p className="shop-highlight">
                    <span className="shop-highlight-label">おすすめ商品：</span>
                    {shop.highlightName}{shop.highlightGenre ? `（${shop.highlightGenre}）` : ""}
                  </p>

                  <p className="shop-meta">
                    {[shop.area, shop.category].filter(Boolean).join(" / ")}
                  </p>

                  <p className="shop-budget">予算：{shop.budget}</p>

                  <p className="shop-lo">
                    L.O.：{shop.lastOrder} ／ 徒歩約 {shop.walkMinutes} 分
                  </p>

                  <p className="shop-address">住所：{shop.address}</p>

                  <p className="shop-tags">
                    タグ：<span>{Array.isArray(shop.tags) ? shop.tags.join("、") : shop.tags}</span>
                  </p>

                  {shop.notes && (
                    <p className="shop-notes">備考：<span>{shop.notes}</span></p>
                  )}

                  <span className="button button-link">詳細を見る</span>
                </div>

                {/* 右側：サムネ画像 */}
                <div className="shop-thumbnail-area">
                  <img
                    src={shop.thumbnailUrl?.url}
                    alt={shop.highlightName}
                    className="shop-thumbnail"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ShopList;