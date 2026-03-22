"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const EmptyState = ({
  title,
  description,
  icon = "ion:cart-outline",
  buttonText = "Start Shopping",
  buttonLink = "/products"
}: EmptyStateProps) => {
  return (
    <div className="container mx-auto px-6 py-32 text-center space-y-8 animate-fade-in">
      <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8">
        <Icon icon={icon} className="text-4xl text-zinc-400" />
      </div>
      <h1 className="text-4xl font-bold uppercase tracking-widest leading-tight">{title}</h1>
      <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      <Link href={buttonLink} className="inline-block px-12 py-5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-[0.3em] hover:bg-accent dark:hover:bg-accent transition-all duration-300 transform hover:-translate-y-1">
        {buttonText}
      </Link>
    </div>
  );
};
