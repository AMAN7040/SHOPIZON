import { fetchProductDetails } from "@/lib/api";

import AddCart from "@/app/components/add-to-cart/AddCart";
import ProductDetail from "@/app/components/productDetail/ProductDetail";
import { Suspense } from "react";
import LoadingDetails from "./loading";

async function Details({params}) {
  const { productId } = params;
  const { success, data, message } = await fetchProductDetails(productId);

  if (!success) {
    return (
      <main className="flex justify-center items-center w-full min-h-screen bg-gray-100">
        <div className="text-center p-4">
          <h1 className="text-lg md:text-2xl font-bold text-red-600">Error</h1>
          <p className=" text-sm md:text-lg mt-2">{message}</p>
        </div>
      </main>
    );
  }

  return <ProductDetail data={data} />;
}

export default function ProductInfoPage({ params }) {
  return (
    <div>
      <h1 className="text-md md:text-2xl font-bold my-1 mx-[2rem]">
        Product Details
      </h1>
      <Suspense fallback={<LoadingDetails />}>
        <Details params={params}/>
      </Suspense>
    </div>
  );
}
