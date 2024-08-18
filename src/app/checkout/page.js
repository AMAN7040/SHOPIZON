import Link from "next/link";

export default function checkoutPage() {
  return (
    <div className="pt-[5rem] w-[70%] min-h-[85vh] mx-auto">
      <h1 className="text-lg md:text-2xl font-bold mb-4">Checkout</h1>
      <p className="bg-green-600 px-1 py-1 md:px-2 md:py-2 rounded-lg w-full md:w-[80%] text-sm md:text-lg mb-4">
        Your order has been successfully processed! ✅
      </p>
      <Link className="text-blue-500" href="/">
        Back To Home
      </Link>
    </div>
  );
}
