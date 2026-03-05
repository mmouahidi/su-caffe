-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  weight TEXT DEFAULT '1000g',
  image_url TEXT,
  color TEXT DEFAULT 'bg-royal-green',
  origin TEXT,
  roast_level TEXT,
  flavor_notes TEXT[],
  brewing_methods TEXT[],
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users table (references auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'commercial' CHECK (role IN ('admin', 'commercial')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT,
  customer_notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT DEFAULT 'cod',
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can do everything with products" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Admin users policies
CREATE POLICY "Admins can view admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Only admins can manage admin users" ON admin_users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin')
  );

-- Orders policies (admins can view/manage all)
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Order items policies
CREATE POLICY "Admins can view all order items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Anyone can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Insert initial products
INSERT INTO products (name, description, long_description, price, weight, image_url, color, origin, roast_level, flavor_notes, brewing_methods, stock_quantity, is_active)
VALUES 
  (
    'Signature Blend',
    'A refined harmony of precision and tradition',
    'Our Signature Blend represents the pinnacle of coffee craftsmanship. Carefully selected beans from the highlands of Ethiopia and Colombia are roasted to perfection, creating a symphony of flavors that dance across your palate. Experience notes of dark chocolate, toasted nuts, and a whisper of citrus in every cup.',
    289.00,
    '1000g',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/signature%20blend%201kg.png-lfwuZYmsOd9EzgpWbowLL6jXsz0rLi.jpeg',
    'bg-royal-green',
    'Ethiopia & Colombia',
    'Medium-Dark',
    ARRAY['Dark Chocolate', 'Toasted Nuts', 'Citrus', 'Caramel'],
    ARRAY['espresso', 'drip', 'moka', 'french-press'],
    100,
    true
  ),
  (
    'Maison Intense',
    'Bold character with an elegant finish',
    'Maison Intense is crafted for those who appreciate the bolder side of coffee. This full-bodied blend features robust beans from Brazil and Indonesia, delivering an intense, smoky profile with undertones of dark berries and spice. Perfect for espresso lovers who crave depth and complexity.',
    319.00,
    '1000g',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maison%20intense%201kg.png-SW77CZyPqMoSRhF5obD9htV4H8Xydb.jpeg',
    'bg-emerald-red',
    'Brazil & Indonesia',
    'Dark',
    ARRAY['Dark Berries', 'Spice', 'Smoky', 'Cocoa'],
    ARRAY['espresso', 'moka', 'french-press'],
    100,
    true
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'SC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION generate_order_number();
