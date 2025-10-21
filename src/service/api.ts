export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return await res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return await res.json();
}
