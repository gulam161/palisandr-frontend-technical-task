"use client";

import { useEffect, useState } from "react";
import { Product } from "@/context/ShopContext";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container mx-auto px-6 mt-20 relative z-20 text-white text-center flex flex-col items-center">
          <h4 suppressHydrationWarning className="text-white uppercase tracking-[0.3em] text-xs font-bold mb-6 opacity-80">
            Premium Collection {new Date().getFullYear()}
          </h4>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
            MODERN <br /> <span className="italic font-light opacity-90">ELEGANCE</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 mb-8 text-base md:text-lg leading-relaxed">
            Discover our curated collection of timeless pieces designed to elevate your living space.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link 
              href="/products" 
              className="px-10 py-4 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300"
            >
              Explore Shop
            </Link>
            <Link 
              href="#featured" 
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] hover:text-white/80 transition-all border-b border-white pb-1"
            >
              New Arrivals
              <Icon icon="ion:arrow-forward" className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon icon="ion:chevron-down" className="text-white text-2xl" />
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase whitespace-pre-line">
              Featured <br /> Products
            </h2>
            <div className="w-20 h-1 bg-black dark:bg-white" />
          </div>
          <Link href="/products" className="text-xs font-bold uppercase tracking-[.3em] border-b-2 border-black hover:border-primary pb-2 font-secondary hover:text-primary transition-all">
            View All Products
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-6">
                <div className="aspect-4/5 bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-3/4" />
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Brand Ethos */}
      <section className="bg-zinc-50 dark:bg-zinc-950 py-32 border-y border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-6 text-center max-w-4xl space-y-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[1.1]">
            Curated for the refined taste <br /> of modern living.
          </h2>
          <p className="text-lg text-zinc-500 leading-relaxed italic">
            &quot;At Palisandr, we believe that your home is a sanctuary. Our pieces are chosen for their ability to bring both functionality and beauty into every corner of your life.&quot;
          </p>
          <div className="pt-8">
            <span className="text-xs font-bold uppercase tracking-[.5em] text-zinc-400">Since 20__</span>
          </div>
        </div>
      </section>
    </div>
  );
}
