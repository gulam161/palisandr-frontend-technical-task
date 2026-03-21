"use client";

import { useShop } from "@/context/ShopContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useShop();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8 animate-fade-in">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-green-500 scale-animation">
          <Icon icon="ion:checkmark-circle" className="text-5xl text-green-500" />
        </div>
        <h1 className="text-5xl font-bold uppercase tracking-widest leading-tight">Order Confirmed</h1>
        <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
          Thank you for your purchase! We&apos;ve sent a confirmation email to your inbox and we&apos;ll notify you when your items are on the way.
        </p>
        <div className="pt-8">
          <button 
            onClick={() => router.push("/")}
            className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-[0.3em] hover:bg-accent dark:hover:bg-accent transition-all duration-300 transform hover:-translate-y-1"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8 animate-fade-in">
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon icon="ion:cart-outline" className="text-4xl text-zinc-400" />
        </div>
        <h1 className="text-4xl font-bold uppercase tracking-widest leading-tight">Nothing to Checkout</h1>
        <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
          Your cart is empty. Please add some items to your cart before proceeding to checkout.
        </p>
        <Link href="/products" className="inline-block px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-[0.3em] hover:bg-accent dark:hover:bg-accent transition-all duration-300 transform hover:-translate-y-1">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-zinc-100 dark:border-zinc-800 pb-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold uppercase tracking-tighter">Checkout Securely</h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Home / Cart / Checkout</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Shipping Form */}
        <div className="space-y-16">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold uppercase tracking-widest border-l-4 border-accent pl-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">FullName</label>
                  <input required id="name" type="text" placeholder="John Doe" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-none focus:border-accent outline-none transition-colors font-medium" />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">EmailAddress</label>
                  <input required id="email" type="email" placeholder="john@example.com" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-none focus:border-accent outline-none transition-colors font-medium" />
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="address" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">ShippingAddress</label>
                <textarea required id="address" rows={4} placeholder="123 Luxury Avenue, Suite 456" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-none focus:border-accent outline-none transition-colors font-medium resize-none"></textarea>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold uppercase tracking-widest border-l-4 border-accent pl-6">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="border-2 border-accent bg-zinc-50 dark:bg-zinc-900 p-6 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Icon icon="ion:card-outline" className="text-2xl text-accent" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest">Credit Card</p>
                      <p className="text-[10px] text-zinc-400 uppercase">Visa, MasterCard, Amex</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-accent"></div>
                </label>
                <label className="border-2 border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-between cursor-not-allowed opacity-50">
                  <div className="flex items-center gap-4">
                    <Icon icon="ion:logo-paypal" className="text-2xl" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest">PayPal</p>
                      <p className="text-[10px] text-zinc-400 uppercase">Coming soon</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-full font-bold uppercase text-sm tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
            >
              {loading ? (
                <>
                  <Icon icon="ion:sync-outline" className="text-xl animate-spin" />
                  Processing Order...
                </>
              ) : (
                <>
                  Place Order
                  <Icon icon="ion:lock-closed-outline" className="text-xl" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-12">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-12 border border-zinc-200 dark:border-zinc-800 sticky top-32">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800">Order Summary</h2>
            
            <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 mb-10 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-6 group">
                  <div className="relative w-24 h-24 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shrink-0 flex items-center justify-center p-2">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-contain p-2"
                    />
                    <span className="absolute -top-3 -right-3 w-7 h-7 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-[10px] font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-bold uppercase tracking-tight leading-tight line-clamp-2">{item.product.title}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{item.product.category}</p>
                    <p className="text-sm font-mono mt-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-10 border-t border-zinc-200 dark:border-zinc-800 uppercase tracking-widest text-xs font-bold">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-900 dark:text-zinc-50 text-base">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-8 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-lg text-black dark:text-white tracking-tighter uppercase">Total Amount</span>
                <span className="text-2xl font-mono text-black dark:text-white font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
