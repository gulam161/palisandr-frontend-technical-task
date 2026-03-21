"use client";

import { useEffect, useState } from "react";
import { Product } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@iconify/react";

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "men's clothing", label: "Men's Clothing" },
  { id: "women's clothing", label: "Women's Clothing" },
  { id: "electronics", label: "Electronics" },
  { id: "jewelery", label: "Jewelry" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="container mx-auto px-6 pt-32 pb-24 animate-fade-in min-h-screen">
      <div className="flex flex-col space-y-4 items-center justify-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase whitespace-pre-line text-center">
          Our Collection
        </h1>
        <div className="w-24 h-1 bg-primary" />
        <p className="max-w-xl mx-auto text-zinc-500 text-center mt-6 text-sm md:text-base leading-relaxed">
          Discover our full range of masterfully crafted pieces. Each item is designed 
          with precision to bring modern elegance into your living space.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-16 w-full max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 md:p-4 rounded-2xl shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-auto flex-1 max-w-lg">
          <Icon icon="ion:search" className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 text-xl" />
          <input
            type="text"
            placeholder="Search our collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-12 py-3.5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-medium placeholder:text-zinc-400 shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Icon icon="ion:close-circle" className="text-2xl" />
            </button>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          
          <div className="relative group w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full md:w-auto pl-5 pr-12 py-3.5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-primary text-xs font-bold uppercase tracking-widest cursor-pointer shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <Icon icon="ion:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-lg" />
          </div>

          <div className="relative group w-full md:w-auto">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none w-full md:w-auto pl-5 pr-12 py-3.5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-primary text-xs font-bold uppercase tracking-widest cursor-pointer shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <option value="default">Sort by Default</option>
              <option value="price-asc">Lowest Price First</option>
              <option value="price-desc">Highest Price First</option>
            </select>
            <Icon icon="ion:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none text-lg" />
          </div>

        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-6">
              <div className="aspect-4/5 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-3/4 rounded-md mx-auto" />
              <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-1/2 rounded-md mx-auto" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Icon icon="ion:alert-circle-outline" className="text-6xl text-red-500 mb-4" />
          <p className="text-xl text-zinc-900 dark:text-zinc-100 font-bold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all duration-300 rounded-xl shadow-md"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center w-full col-span-full border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50">
              <Icon icon="ion:search-outline" className="text-6xl text-zinc-300 dark:text-zinc-700 mb-6 animate-pulse" />
              <h3 className="text-3xl font-bold tracking-tight mb-3">No products found</h3>
              <p className="text-zinc-500 max-w-sm">We couldn&apos;t find any items matching your search criteria. Try adjusting your filters or reducing search terms.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSortOrder("default"); }}
                className="mt-8 px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all duration-300 rounded-full shadow-md flex items-center gap-2"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
