"use client";

import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <div className="container mx-auto px-6 pt-32 pb-24 animate-fade-in min-h-screen">
      <div className="flex flex-col space-y-4 items-center justify-center mb-16 border-b border-zinc-100 dark:border-zinc-800 pb-12">
        <Icon icon="ion:heart-outline" className="text-5xl text-primary mb-2" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase whitespace-pre-line text-center">
          Your Wishlist
        </h1>
        <div className="w-16 h-1 bg-primary mt-2" />
        <p className="max-w-xl mx-auto text-zinc-500 text-center mt-6 text-sm md:text-base leading-relaxed">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center w-full max-w-3xl mx-auto border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50">
          <Icon icon="ion:heart-dislike-outline" className="text-7xl text-zinc-300 dark:text-zinc-700 mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold tracking-tight mb-3">Your wishlist is empty</h3>
          <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">You haven&apos;t added any items to your wishlist yet. Explore our expansive collection and find pieces you love!</p>
          <Link 
            href="/products" 
            className="px-10 py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary dark:hover:bg-primary transition-all duration-300 rounded-full shadow-lg flex items-center gap-3"
          >
            Explore Shop
            <Icon icon="ion:arrow-forward" className="text-lg" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
