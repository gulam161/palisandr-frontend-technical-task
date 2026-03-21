"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useShop } from "@/context/ShopContext";
import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

export const Navbar = () => {
  const { cartCount, wishlist } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize correctly on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolled = !isHomePage || isScrolled;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700  ${scrolled ? "bg-white/80  backdrop-blur-xl shadow-lg py-3" : "bg-transparent backdrop-blur-0 py-3"}`}>
        <div className="container mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 flex items-center justify-center transition-all group-hover:bg-accent ${scrolled ? "bg-primary  text-white " : "bg-white/10  backdrop-blur-sm text-white"}`}>
              <span className="font-bold text-sm">P.</span>
            </div>
            <span className={`text-2xl font-bold tracking-tighter uppercase transition-colors text-black ${scrolled ? "text-black " : "text-white"}`}>Palisandr</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            <Link href="/" className={`text-xs font-bold uppercase tracking-[0.3em] transition-all hover:text-primary/90 relative group ${scrolled ? "text-black " : "text-white"}`}>
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary/90 transition-all group-hover:w-full" />
            </Link>
            <Link href="/products" className={`text-xs font-bold uppercase tracking-[0.3em] transition-all hover:text-primary/90 relative group ${scrolled ? "text-black " : "text-white"}`}>
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary/90 transition-all group-hover:w-full" />
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/wishlist" className={`hidden md:flex relative group transition-all ${scrolled ? "text-black " : "text-white"}`}>
              <Icon icon="ion:heart-outline" className="text-2xl group-hover:text-primary/90 transition-all" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary/90 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className={`relative group transition-all ${scrolled ? "text-black " : "text-white"}`}>
              <Icon icon="ion:cart-outline" className="text-2xl group-hover:text-primary/90 transition-all" />
              {cartCount > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold ${scrolled ? "bg-primary  text-white " : "bg-white text-black"}`}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden ${scrolled ? "text-black " : "text-white"}`}
            >
              <Icon icon="ion:menu-outline" className="text-3xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-8 text-black hover:text-primary transition-colors"
        >
          <Icon icon="ion:close-outline" className="text-4xl" />
        </button>
        <div className="flex flex-col items-center gap-10">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold uppercase tracking-widest hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold uppercase tracking-widest hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-3">
            Wishlist
            {wishlist.length > 0 && (
              <span className="bg-primary/90 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-3">
            Cart
            {cartCount > 0 && (
              <span className="bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};
