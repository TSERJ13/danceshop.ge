-- Supabase database schema for DanceShop Georgia
-- Run this in the Supabase SQL editor

-- 1. Profiles Table (Linked with Supabase Auth users)
CREATE TYPE user_role AS ENUM ('customer', 'admin');

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'customer'::user_role,
    telegram_id TEXT UNIQUE,
    telegram_username TEXT,
    shipping_address JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Size Charts Table
CREATE TABLE public.size_charts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    guidelines JSONB NOT NULL DEFAULT '{"foot_length": "Measure from heel to longest toe", "instep": "Measure around the highest part of the foot"}'::jsonb,
    headers TEXT[] NOT NULL, -- e.g., ['EU Size', 'Foot Length (cm)', 'US Men', 'US Women']
    rows JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of objects matching headers
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.size_charts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to size charts" ON public.size_charts FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage size charts" ON public.size_charts FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE public.profiles.id = auth.uid() AND public.profiles.role = 'admin'
    )
);

-- 3. Categories Table (Self-referencing for infinite categories/subcategories)
CREATE TABLE public.categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    parent_id BIGINT REFERENCES public.categories(id) ON DELETE CASCADE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage categories" ON public.categories FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE public.profiles.id = auth.uid() AND public.profiles.role = 'admin'
    )
);

-- 4. Products Table
CREATE TABLE public.products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    sale_price NUMERIC(10, 2),
    brand TEXT NOT NULL DEFAULT 'DanceShop',
    images TEXT[] NOT NULL DEFAULT '{}',
    category_id BIGINT REFERENCES public.categories(id) ON DELETE SET NULL,
    size_chart_id BIGINT REFERENCES public.size_charts(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage products" ON public.products FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE public.profiles.id = auth.uid() AND public.profiles.role = 'admin'
    )
);

-- 5. Product Variants Table (Inventory tracking per variant combinations)
CREATE TABLE public.product_variants (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    heel_height TEXT, -- Optional, relevant for shoes
    width TEXT, -- Optional, e.g. Wide, Medium, Narrow
    stock INTEGER NOT NULL DEFAULT 0,
    price_modifier NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to product variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage product variants" ON public.product_variants FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE public.profiles.id = auth.uid() AND public.profiles.role = 'admin'
    )
);

-- 6. Wishlist Table
CREATE TABLE public.wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, product_id)
);

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view their own wishlist" ON public.wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to manage their own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);

-- Profile Sync Trigger: Create profile automatically when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    'customer'::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
