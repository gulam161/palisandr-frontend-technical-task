# Palisandr E-Commerce Frontend Task

A premium, modern e-commerce application built with Next.js, Tailwind CSS, and Fake Store API. This project was developed as part of a technical hiring process to demonstrate proficiency in React, state management, and modern web design.

## Features

- **🛍️ Product Listing**: Elegant grid of products fetched from Fake Store API with category filtering, search, and sorting.
- **🔍 Product Details**: Comprehensive detail view with image zoom effects and quick purchase options.
- **🛒 Shopping Cart**: Full cart management (increase/decrease quantity, remove items) with real-time subtotal/total calculation.
- **❤️ Wishlist**: Save favorite items for later, persisted across sessions.
- **🔒 Secure Checkout**: Seamless checkout flow with order summary and form simulation.
- **📱 Responsive & Premium UI**: Custom design with fluid animations and a high-end aesthetic inspired by luxury interior brands.

## Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Iconify](https://iconify.design/)
- **State Management**: React Context API
- **API**: [Fake Store API](https://fakestoreapi.com/)
- **Typography**: Geist Sans & Geist Mono (via next/font)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd palisandr-frontend-technical-task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Details

This application uses the **Fake Store API** for demonstration:

- Base URL: `https://fakestoreapi.com/`
- Endpoint Used: `/products`, `/products/categories`, `/products/{id}`

## Persistence

Cart and Wishlist data are persisted in the browser's `localStorage` using the key `shop_cart` and `shop_wishlist` respectively, ensuring that the user's selections are maintained even after a page refresh.

## Project Structure

- `/app`: Next.js App Router pages (Home, Shop, Cart, Wishlist, Checkout).
- `/components`: Reusable UI components (Navbar, ProductCard, Providers).
- `/context`: Global state management for Cart and Wishlist using React Context.
- `/public`: Static assets (Logos, SVGs).

---

Developed as a Technical Assignment.
