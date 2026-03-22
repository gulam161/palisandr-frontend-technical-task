"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Product, useShop } from "@/context/ShopContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useShop();
  
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const truncate = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="group relative bg-white/40 dark:bg-zinc-900 border border-primary/5 hover:border-primary/20 transition-all duration-700 hover:shadow-2xl overflow-hidden p-4 rounded-xl">
      <Link href={`/products/${product.id}`} className="block overflow-hidden relative aspect-4/5 bg-white rounded-lg p-6">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        
        {/* Sale Badge */}
        <div className="absolute top-0 left-0 bg-primary text-white text-[10px] uppercase font-bold px-4 py-2 rounded-br-2xl shadow-lg transform md:-translate-x-1 md:group-hover:translate-x-0 transition-transform">
          Sale!
        </div>

        {/* Quick Actions overlay */}
        <div className="absolute inset-x-0 bottom-40 md:inset-0 md:bottom-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end md:items-center justify-center gap-3 md:gap-4 z-10 px-4 pointer-events-none md:pointer-events-auto">
          <button 
            onClick={toggleWishlist}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 transform md:translate-y-10 md:group-hover:translate-y-0 shadow-lg pointer-events-auto ${inWishlist ? "bg-primary text-white" : "bg-white text-primary hover:bg-primary hover:text-white"}`}
          >
            <Icon icon={inWishlist ? "ion:heart" : "ion:heart-outline"} className="text-xl md:text-2xl" />
          </button>
          <button 
            disabled={inCart}
            onClick={(e) => {
              e.preventDefault();
              if (!inCart) addToCart(product);
            }}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 transform md:translate-y-10 md:group-hover:translate-y-0 delay-100 shadow-lg pointer-events-auto ${inCart ? 'bg-green-500 text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
          >
            <Icon icon={inCart ? "ion:checkmark" : "ion:bag-handle-outline"} className="text-xl md:text-2xl" />
          </button>
        </div>
      </Link>

      <div className="p-4 space-y-4 text-center">
        <div className="space-y-1">
          <span className="text-[10px] font-secondary uppercase tracking-[0.3em] font-bold text-primary opacity-60">{product.category}</span>
          <Link href={`/products/${product.id}`} className="block text-lg font-primary text-primary tracking-tight hover:opacity-75 transition-all line-clamp-1">
            {product.title}
          </Link>

          <p className="text-[10px] font-secondary font-bold text-primary opacity-60 leading-relaxed tracking-wide">
          {truncate(product.description, 80)}
        </p>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <span className="text-primary font-bold font-mono text-lg">${product.price}</span>
            <span className="text-primary/40 font-mono text-sm line-through decoration-primary/40">${(product.price * 1.5).toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80 opacity-60">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} icon="ion:star" className={i < Math.round(product.rating.rate) ? "text-primary" : "text-primary/20"} />
              ))}
            </div>
            <span className="ml-1">({product.rating.count})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
