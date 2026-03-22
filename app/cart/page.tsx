"use client";

import { useShop } from "@/context/ShopContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <EmptyState 
        title="Your Cart is Empty" 
        description="Looks like you haven't added any items to your cart yet. Browse our collections to find the perfect piece." 
      />
    );
  }

  return (
    <div className="container mx-auto px-6 pt-32 pb-24 animate-fade-in min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between mb-16 border-b border-zinc-100 dark:border-zinc-800 pb-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold uppercase tracking-tighter">Your Shopping bag</h1>
          <p className="text-zinc-500 font-medium">{cart.length} {cart.length === 1 ? "item" : "items"} in your cart</p>
        </div>
        <Link href="/products" className="group text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors">
          <Icon icon="ion:chevron-back" className="group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Cart Items */}
        <div className="flex-1 space-y-12">
          {cart.map((item) => (
            <div key={item.product.id} className="flex flex-col sm:flex-row gap-8 pb-12 border-b border-zinc-100 dark:border-zinc-800 group">
              <Link href={`/products/${item.product.id}`} className="relative w-full sm:w-48 aspect-3/4 bg-zinc-50 dark:bg-zinc-900 border border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-800 overflow-hidden p-6 transition-all">
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
              </Link>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{item.product.category}</span>
                      <Link href={`/products/${item.product.id}`} className="block text-xl font-bold uppercase tracking-tight hover:text-accent transition-colors leading-tight truncate-2-lines">
                        {item.product.title}
                      </Link>
                    </div>
                    <span className="text-xl font-mono font-bold whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-zinc-500 line-clamp-2 max-w-md">
                    {item.product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full p-1 bg-white dark:bg-black">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all font-bold"
                    >
                      <Icon icon="ion:remove-outline" />
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all font-bold"
                    >
                      <Icon icon="ion:add-outline" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-all group/remove"
                  >
                    <Icon icon="ion:trash-outline" className="text-lg group-hover/remove:animate-bounce" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-10 border border-zinc-200 dark:border-zinc-800 space-y-8 sticky top-32">
            <h2 className="text-xl font-bold uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-6">Order Summary</h2>
            
            <div className="space-y-6 text-sm font-medium uppercase tracking-widest">
              <div className="flex justify-between items-center text-zinc-500">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-900 dark:text-zinc-50">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-500">
                <span>Estimated Shipping</span>
                <span className="font-bold text-green-500">FREE</span>
              </div>
              <div className="flex justify-between items-center text-zinc-500">
                <span>Tax</span>
                <span className="font-mono text-zinc-900 dark:text-zinc-50">$0.00</span>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <span className="text-xl font-bold uppercase tracking-tighter">Total</span>
              <span className="text-2xl font-mono font-bold">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="space-y-4 pt-4">
              <Link href="/checkout" className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full font-bold uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-accent dark:hover:bg-accent transition-all transform hover:-translate-y-1 shadow-lg">
                Checkout Now
                <Icon icon="ion:arrow-forward" className="text-lg" />
              </Link>
              <p className="text-[10px] text-center text-zinc-400 px-4 uppercase tracking-widest font-medium leading-relaxed">
                By checking out, you agree to our Terms and Conditions. Free returns within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
