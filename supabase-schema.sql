-- TRACE — Supabase Schema
-- Esegui questo nel SQL Editor di Supabase

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) DEFAULT 0,
  original_price NUMERIC(10,2),
  retail_price NUMERIC(10,2),
  cost_price NUMERIC(10,2),
  category TEXT DEFAULT '',
  subcategory TEXT DEFAULT '',
  description TEXT DEFAULT '',
  images JSONB DEFAULT '[]',
  sizes JSONB DEFAULT '[]',
  stock JSONB DEFAULT '{}',
  material TEXT DEFAULT '',
  color TEXT DEFAULT '',
  made_in TEXT DEFAULT '',
  featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  season TEXT DEFAULT '',
  year INTEGER,
  sales INTEGER DEFAULT 0,
  supplier_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT DEFAULT '',
  email TEXT DEFAULT '',
  customer TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  items JSONB DEFAULT '[]',
  items_summary TEXT DEFAULT '',
  total NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT '',
  payment_id TEXT DEFAULT '',
  shipping_address JSONB DEFAULT '{}',
  shipping_method TEXT DEFAULT '',
  shipping_cost NUMERIC(10,2) DEFAULT 0,
  tracking_number TEXT DEFAULT '',
  carrier TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  promo_code TEXT DEFAULT '',
  discount NUMERIC(10,2) DEFAULT 0,
  tax NUMERIC(10,2) DEFAULT 0,
  idempotency_key TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'supplier')),
  name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  zip TEXT DEFAULT '',
  province TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS carts (
  id TEXT PRIMARY KEY,
  user_id TEXT DEFAULT '',
  items JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS suppliers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  product_categories JSONB DEFAULT '[]',
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'percentage',
  value NUMERIC(10,2) DEFAULT 0,
  min_order NUMERIC(10,2) DEFAULT 0,
  max_discount NUMERIC(10,2),
  max_uses INTEGER DEFAULT 1000,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
