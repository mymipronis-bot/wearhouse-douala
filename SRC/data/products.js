// Données d'exemple — à remplacer plus tard par Supabase
export const products = [
  { id: 1, name: 'Air Max 90', brand: 'Nike', category: 'Chaussures', size: '42', price: 25000, image: 'https://placehold.co/400x400/EDE6D6/1A1815?text=Air+Max+90', stock: 3 },
  { id: 2, name: 'Ultraboost 22', brand: 'Adidas', category: 'Chaussures', size: '43', price: 30000, image: 'https://placehold.co/400x400/EDE6D6/1A1815?text=Ultraboost', stock: 2 },
  { id: 3, name: 'Hoodie Essentials', brand: 'Fear of God', category: 'Vêtements', size: 'L', price: 18000, image: 'https://placehold.co/400x400/EDE6D6/1A1815?text=Hoodie', stock: 5 },
  { id: 4, name: 'Jean Slim', brand: 'Levi\'s', category: 'Vêtements', size: '32', price: 12000, image: 'https://placehold.co/400x400/EDE6D6/1A1815?text=Jean+Slim', stock: 4 },
  { id: 5, name: 'Chuck Taylor', brand: 'Converse', category: 'Chaussures', size: '41', price: 15000, image: 'https://placehold.co/400x400/EDE6D6/1A1815?text=Chuck+Taylor', stock: 6 },
  { id: 6, name: 'T-shirt Oversize', brand: 'Champion', category: 'Vêtements', size: 'M', price: 7000, image: 'https://placehold.co/400x400/EDE6D6/1A1815?text=T-shirt', stock: 10 },
]

export const brands = [...new Set(products.map(p => p.brand))]
export const categories = [...new Set(products.map(p => p.category))]
