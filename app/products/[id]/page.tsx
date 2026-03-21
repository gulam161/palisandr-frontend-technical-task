"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product, useShop } from "@/context/ShopContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center animate-pulse space-y-8">
        <div className="w-full flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2 aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg"></div>
          <div className="w-full md:w-1/2 space-y-6 pt-10">
            <div className="h-10 bg-zinc-100 dark:bg-zinc-800 w-3/4 rounded"></div>
            <div className="h-6 bg-zinc-100 dark:bg-zinc-800 w-1/4 rounded"></div>
            <div className="h-24 bg-zinc-100 dark:bg-zinc-800 w-full rounded"></div>
            <div className="h-12 bg-zinc-100 dark:bg-zinc-800 w-1/2 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-6">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-red-500">Error</h1>
        <p className="text-zinc-500">{error || "Product not found"}</p>
        <Link href="/products" className="inline-block px-10 py-4 bg-black text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-zinc-800 transition-all duration-300">
          Back to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Optionally redirect to cart or show toast
  };

  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-12">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <Icon icon="ion:chevron-forward" />
        <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">Products</Link>
        <Icon icon="ion:chevron-forward" />
        <span className="text-black dark:text-white line-clamp-1">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-16 lg:gap-24 mb-24">
        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center p-12 lg:p-24 relative group overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-auto max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <button 
            onClick={toggleWishlist}
            className={`absolute top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${inWishlist ? "bg-accent text-white" : "bg-white text-black hover:bg-black hover:text-white shadow-lg"}`}
          >
            <Icon icon={inWishlist ? "ion:heart" : "ion:heart-outline"} className="text-2xl" />
          </button>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-8 py-4">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{product.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-tight">{product.title}</h1>
            <div className="flex items-center gap-6">
              <span className="text-2xl font-mono text-zinc-900 dark:text-zinc-50">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-bold tracking-widest">
                <Icon icon="ion:star" className="text-accent" />
                <span>{product.rating.rate} / 5 ({product.rating.count} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-zinc-500 leading-relaxed text-lg border-l-2 border-accent pl-6 italic">
            {product.description}
          </p>

          <div className="space-y-10 pt-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full p-1 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-bold"
                >
                  <Icon icon="ion:remove-outline" />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center bg-transparent font-mono font-bold outline-none" 
                  min="1"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-bold"
                >
                  <Icon icon="ion:add-outline" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent dark:hover:bg-accent transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                <Icon icon="ion:cart-outline" className="text-xl" />
                Add to Cart
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              <div className="flex items-center gap-4">
                <Icon icon="ion:shield-checkmark-outline" className="text-lg text-green-500" />
                <span>2-Year Premium Warranty</span>
              </div>
              <div className="flex items-center gap-4">
                <Icon icon="ion:cube-outline" className="text-lg text-blue-500" />
                <span>Free White Glove Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Extra Content */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
        <div className="flex gap-12 border-b border-zinc-100 dark:border-zinc-800 mb-12 overflow-x-auto pb-4">
          {["description", "shipping", "returns"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-widest pb-4 border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? "border-accent text-black dark:text-white" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto py-12 text-zinc-500 leading-relaxed text-lg">
          {activeTab === "description" && (
            <div className="space-y-6 animate-fade-in">
              <p>
                Our {product.title} is a testament to Palisandr&apos;s commitment to quality and timeless design. Handcrafted with precision, this piece seamlessly integrates into any modern living space while providing unparalleled functionality.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                <li className="flex gap-4 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></span>
                  Sustainable materials sourced responsibly.
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></span>
                  Crafted by master artisans with decades of experience.
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></span>
                  Ergonomically designed for maximum comfort.
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"></span>
                  Modern finish that resists daily wear and tear.
                </li>
              </ul>
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="animate-fade-in">
              <p>We provide free express shipping globally. Your order will reach you within 5-7 business days of processing.</p>
            </div>
          )}
          {activeTab === "returns" && (
            <div className="animate-fade-in">
              <p>Enjoy a 30-day money-back guarantee. If you&apos;re not completely satisfied with your purchase, we&apos;ll pick it up for free.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
