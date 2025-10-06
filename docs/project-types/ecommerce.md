# 🛒 E-commerce Platforms Guide

**Last updated:** 2025-10-05

## Prerequisites

- Web development fundamentals (HTML, CSS, JavaScript)
- Understanding of frontend frameworks (React, Vue, etc.)
- Basic backend knowledge (APIs, databases)
- Familiarity with payment processing concepts
- Understanding of user authentication
- For advanced sections: knowledge of inventory management and order fulfillment

## Overview

E-commerce platforms enable online buying and selling of products or services. This guide covers everything from simple online stores to complex multi-vendor marketplaces.

**Complexity Levels:** 2-5
**Timeline:** 1 week - 12+ months
**Budget:** $20 - $20,000+/month

---

## E-commerce Approaches

### Hosted Solutions (Level 1-2)
**No-code/low-code platforms**

#### Shopify
- All-in-one hosted platform
- No technical knowledge required
- Apps for extended functionality
- **Cost:** $29-$299/month + transaction fees
- **Best for:** Small to medium businesses

#### WooCommerce (WordPress)
- Self-hosted, open-source
- Huge plugin ecosystem
- Requires hosting and maintenance
- **Cost:** Free + hosting ($10-50/month)
- **Best for:** Content + commerce sites

#### BigCommerce
- Enterprise-grade hosted platform
- No transaction fees
- Built-in features
- **Cost:** $29-$299/month
- **Best for:** Growing businesses

### Headless E-commerce (Level 3-4)
**API-first, custom frontend**

#### Shopify Plus + Custom Frontend
```
Backend: Shopify Plus (Storefront API)
Frontend: Next.js, Remix, or Astro
Payments: Shopify Payments
Hosting: Vercel, Netlify
```

#### Medusa.js (Open Source)
```
Backend: Medusa.js (Node.js)
Frontend: Next.js Starter
Database: PostgreSQL
Payments: Stripe, PayPal
Hosting: Railway, Render, Vercel
```

#### Commerce.js / Snipcart
```
Backend: Headless CMS + Commerce API
Frontend: Any framework
Payments: Integrated
Hosting: Static hosting
```

### Custom E-commerce (Level 4-5)
**Full control, built from scratch**

```
Frontend: Next.js, React
Backend: Node.js, Python, Go
Database: PostgreSQL + Redis
Payments: Stripe Connect, PayPal
Search: Algolia, Elasticsearch
CDN: Cloudflare, AWS CloudFront
Infrastructure: Kubernetes, AWS
```

---

## Technology Stacks by Level

### Level 2: Simple Store (1-2 weeks)

#### Option A: Shopify
```
Platform: Shopify
Theme: Dawn (free) or premium theme
Apps: Essential apps (email, reviews, etc.)
Payment: Shopify Payments
Shipping: Shopify Shipping
```

**Setup time:** 3-7 days
**Monthly cost:** $29-79
**Technical skill:** None required

#### Option B: Snipcart + Static Site
```
Frontend: Astro, Hugo, or Next.js
E-commerce: Snipcart
Content: Markdown or Headless CMS
Hosting: Vercel, Netlify
```

**Setup time:** 1-2 weeks
**Monthly cost:** $10 (starts free)
**Technical skill:** Basic web development

### Level 3: Custom Store (1-3 months)

#### Next.js + Stripe + Supabase
```
Frontend: Next.js 15 + Tailwind CSS
Backend: Next.js API Routes
Database: Supabase (PostgreSQL)
Payments: Stripe Checkout/Payment Intents
Auth: NextAuth.js or Supabase Auth
Images: Cloudinary or Uploadcare
Email: Resend, SendGrid
Analytics: Vercel Analytics, Plausible
Hosting: Vercel
```

#### Medusa.js Stack
```
Backend: Medusa.js
Admin: Medusa Admin
Storefront: Next.js Starter
Database: PostgreSQL (Neon, Supabase)
Cache: Redis (Upstash)
Payments: Stripe, PayPal
Search: MeiliSearch, Algolia
Hosting: Railway (backend), Vercel (frontend)
```

### Level 4: Marketplace (3-8 months)

```
Frontend: Next.js or React
Backend: Microservices (Node.js/Go)
Database: PostgreSQL (users, orders, products)
         MongoDB (product catalog, reviews)
         Redis (cache, sessions)
Search: Elasticsearch or Algolia
Payments: Stripe Connect (multi-vendor)
Queue: Bull, RabbitMQ (order processing)
Storage: S3 (product images)
CDN: CloudFront, Cloudflare
Email: SendGrid (transactional)
SMS: Twilio (order updates)
Analytics: Mixpanel, Amplitude
Monitoring: Sentry, DataDog
Hosting: AWS, GCP
```

### Level 5: Enterprise E-commerce (6+ months)

```
Multi-region deployment
Headless architecture
Microservices (catalog, cart, checkout, etc.)
Event-driven order processing
Advanced personalization & recommendations
Multi-currency & multi-language
ERP/CRM integrations
Advanced fraud detection
B2B and B2C capabilities
Subscription & recurring billing
Inventory management across warehouses
```

---

## Core Features Implementation

### 1. Product Catalog

#### Schema Design (PostgreSQL)
```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  images TEXT[],
  category_id UUID REFERENCES categories(id),
  inventory_count INTEGER DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id),
  description TEXT
);

-- Product variants
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10, 2),
  inventory_count INTEGER DEFAULT 0,
  options JSONB -- {size: "L", color: "Red"}
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_slug ON products(slug);
```

#### Next.js Product Listing
```typescript
// app/products/page.tsx
import { Suspense } from 'react';

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // ISR
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <img src={product.images[0]} alt={product.name} />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <button className="mt-2 w-full bg-black text-white py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

### 2. Shopping Cart

#### Client-Side Cart (Zustand)
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);

        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }

        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
      })),

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    { name: 'cart-storage' }
  )
);
```

#### Cart Component
```typescript
export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                min="1"
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}

          <div className="cart-total">
            <strong>Total: ${total().toFixed(2)}</strong>
          </div>

          <Link href="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}
```

### 3. Checkout & Payments

#### Stripe Checkout Integration
```typescript
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    metadata: {
      orderId: 'order_' + Date.now(),
    },
  });

  return NextResponse.json({ sessionId: session.id });
}
```

#### Checkout Component
```typescript
'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/store/cart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CheckoutButton() {
  const { items } = useCart();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    const { sessionId } = await response.json();

    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <button onClick={handleCheckout} className="checkout-btn">
      Checkout
    </button>
  );
}
```

#### Webhook Handler (Order Fulfillment)
```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

      // Create order in database
      await createOrder({
        sessionId: session.id,
        customerId: session.customer,
        amount: session.amount_total! / 100,
        metadata: session.metadata,
      });

      // Send confirmation email
      await sendOrderConfirmation(session.customer_email!);

      break;

    case 'payment_intent.succeeded':
      // Update order status
      break;

    case 'charge.refunded':
      // Handle refund
      break;
  }

  return NextResponse.json({ received: true });
}
```

### 4. Order Management

#### Order Schema
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'pending',
  subtotal DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  shipping DECIMAL(10, 2),
  total DECIMAL(10, 2),
  stripe_payment_intent VARCHAR(255),
  shipping_address JSONB,
  billing_address JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
```

#### Order Status Workflow
```typescript
enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = await db.orders.update({
    where: { id: orderId },
    data: {
      status,
      updated_at: new Date(),
    },
  });

  // Send notification
  await sendStatusEmail(order.user_id, status);

  // Trigger webhook for integrations
  await triggerOrderWebhook(order);

  return order;
}
```

### 5. Product Search

#### Algolia Integration
```typescript
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

const searchIndex = searchClient.initIndex('products');

// Search products
export async function searchProducts(query: string) {
  const { hits } = await searchIndex.search(query, {
    hitsPerPage: 20,
    attributesToRetrieve: ['name', 'price', 'images', 'slug'],
    facets: ['category', 'price_range'],
  });

  return hits;
}

// Index product (on create/update)
export async function indexProduct(product: Product) {
  await searchIndex.saveObject({
    objectID: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    images: product.images,
    slug: product.slug,
  });
}
```

#### Search Component (InstantSearch)
```typescript
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

export function ProductSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <SearchBox placeholder="Search products..." />

      <Hits
        hitComponent={({ hit }) => (
          <div className="product-hit">
            <img src={hit.images[0]} alt={hit.name} />
            <h3>{hit.name}</h3>
            <p>${hit.price}</p>
          </div>
        )}
      />
    </InstantSearch>
  );
}
```

---

## Advanced Features

### 1. Inventory Management
```typescript
// Prevent overselling with row-level locking
async function reserveInventory(productId: string, quantity: number) {
  return await db.$transaction(async (tx) => {
    const product = await tx.products.findUnique({
      where: { id: productId },
      // Lock row for update
      lock: 'update',
    });

    if (product.inventory_count < quantity) {
      throw new Error('Insufficient inventory');
    }

    await tx.products.update({
      where: { id: productId },
      data: {
        inventory_count: {
          decrement: quantity,
        },
      },
    });

    return true;
  });
}
```

### 2. Discount Codes
```typescript
interface Discount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_purchase?: number;
  max_uses?: number;
  expires_at?: Date;
}

function applyDiscount(subtotal: number, discount: Discount): number {
  if (discount.min_purchase && subtotal < discount.min_purchase) {
    throw new Error('Minimum purchase not met');
  }

  if (discount.type === 'percentage') {
    return subtotal * (discount.value / 100);
  }

  return Math.min(discount.value, subtotal);
}
```

### 3. Multi-Vendor (Marketplace)
```typescript
// Stripe Connect for payouts
async function createConnectedAccount(vendorId: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    email: vendor.email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  await db.vendors.update({
    where: { id: vendorId },
    data: { stripe_account_id: account.id },
  });

  return account;
}

// Split payment
async function createPaymentIntent(order: Order) {
  const platformFee = order.total * 0.1; // 10% platform fee

  return await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100),
    currency: 'usd',
    application_fee_amount: Math.round(platformFee * 100),
    transfer_data: {
      destination: vendor.stripe_account_id,
    },
  });
}
```

---

## SEO & Performance

### Product Page Optimization
```typescript
// app/products/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug);

  return {
    title: `${product.name} | Your Store`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
      type: 'product',
      price: {
        amount: product.price,
        currency: 'USD',
      },
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
```

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src={product.images[0]}
  alt={product.name}
  width={800}
  height={800}
  priority={index < 4} // LCP optimization
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

## Security Considerations

1. **PCI Compliance** → Use Stripe/PayPal (don't store cards)
2. **HTTPS Everywhere** → SSL certificates required
3. **Input Validation** → Prevent injection attacks
4. **Rate Limiting** → Prevent brute force, scraping
5. **CSRF Protection** → Use tokens for forms
6. **XSS Prevention** → Sanitize user input
7. **Secure Sessions** → HTTP-only cookies
8. **Fraud Detection** → Stripe Radar, custom rules

---

## Common Pitfalls

1. **No inventory management** → Overselling products
2. **Poor checkout UX** → High cart abandonment
3. **Slow page loads** → Lost sales (every 100ms matters)
4. **No mobile optimization** → 70% of traffic is mobile
5. **Complicated checkout** → Keep it simple (guest checkout!)
6. **Ignoring abandoned carts** → 70% average abandonment
7. **Poor search** → Users can't find products
8. **No email confirmations** → Customer confusion

---

## Launch Checklist

- [ ] Payment processor configured and tested
- [ ] SSL certificate installed
- [ ] Privacy policy and terms of service
- [ ] Shipping rates configured
- [ ] Tax calculation setup
- [ ] Email templates (order confirmation, shipping, etc.)
- [ ] Mobile responsive design tested
- [ ] Checkout flow tested (multiple payment methods)
- [ ] Inventory tracking enabled
- [ ] Analytics and conversion tracking
- [ ] Customer support system (chat, email)
- [ ] Return/refund policy published
- [ ] SEO optimization (meta tags, structured data)
- [ ] Performance tested (Core Web Vitals)

---

*Next: Check out [SaaS Applications](saas-applications.md) or [APIs & Microservices](apis.md)*
