-- Update product images with new URLs

UPDATE products 
SET image_url = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20%281%29-hgDH2weucW9VMZefYV8AHfJap4XHC5.png'
WHERE name = 'Signature Blend';

UPDATE products 
SET image_url = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-pnMSHLUgVpU7w3dIN2m7uAuIdHuu9Q.png'
WHERE name = 'Maison Intense';
