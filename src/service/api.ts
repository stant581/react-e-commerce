// src/service/api.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
}

const API_BASE = "https://dummyjson.com";

// ✅ Fetch all products (paginated)
export async function fetchProducts(limit = 20, skip = 0): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return data.products;
}

// ✅ Fetch product by ID
export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return res.json();
}

// ✅ Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/products/categories`);
  return res.json();
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Trim whitespace and skip if query is empty
  if (!query.trim()) return [];

  try {
    const res = await fetch(`${API_BASE}/products`);
    const data = await res.json();

    // Safely extract array of products
    const products: Product[] = Array.isArray(data.products) ? data.products : [];

    // Convert query to lowercase once
    const lowerQuery = query.toLowerCase();

    // Filter by title, description, or partial category match
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}
