import { fetchProducts } from "@/lib/api";
import ProductCard from "../components/product-card/ProductCard";

export default async function productPage() {
  const { success, data: products, message } = await fetchProducts();

  if (!success) {
    throw new Error(message);
  }

  return (
    <main className="min-h-screen my-[2rem]">
      <h1 className="text-lg md:text-2xl font-bold mb-4 mx-[2rem]">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
