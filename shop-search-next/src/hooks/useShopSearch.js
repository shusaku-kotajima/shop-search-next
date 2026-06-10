import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export function useShopSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlKeyword = searchParams.get("keyword") ?? "";
  const selectedArea = searchParams.get("area") ?? "";
  const selectedCategory = searchParams.get("genre") ?? "";

  const [keyword, setKeyword] = useState(urlKeyword);
  const [shops, setShops] = useState([]);      // ← 店舗データをstateで管理
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ← 追加

  // APIから店舗データを取得
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch("/api/shops");
        if (!res.ok) throw new Error("データの取得に失敗しました");
        const data = await res.json();
        setShops(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  const areas = Array.from(new Set(shops.map((shop) => shop.area)));
  const categories = Array.from(new Set(shops.map((shop) => shop.highlightGenre).filter(Boolean)));

  const updateURL = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  const handleKeywordChange = (value) => setKeyword(value);
  const handleKeywordCommit = () => updateURL("keyword", keyword);
  const setSelectedArea = (value) => updateURL("area", value);
  const setSelectedCategory = (value) => updateURL("genre", value);

  const keywordLower = keyword.toLowerCase();
  const filteredShops = shops.filter((shop) => {
  const matchKeyword =
    keywordLower === "" ||
    shop.name.toLowerCase().includes(keywordLower) ||
    (shop.highlightName || "").toLowerCase().includes(keywordLower) ||
    (shop.highlightGenre || "").toLowerCase().includes(keywordLower) ||
    (Array.isArray(shop.tags)
      ? shop.tags.some((tag) => tag.toLowerCase().includes(keywordLower))
      : (shop.tags || "").toLowerCase().includes(keywordLower));
    const matchArea = selectedArea === "" || shop.area === selectedArea;
    const matchCategory =
      selectedCategory === "" || shop.highlightGenre === selectedCategory;
    return matchKeyword && matchArea && matchCategory;
  });

  const handleReset = () => {
    setKeyword("");
    router.replace("/");
  };

  return {
    keyword,
    handleKeywordChange,
    handleKeywordCommit,
    selectedArea,
    setSelectedArea,
    selectedCategory,
    setSelectedCategory,
    areas,
    categories,
    filteredShops,
    loading, // ← ローディング状態も返す
    error,
    handleReset,
  };
}