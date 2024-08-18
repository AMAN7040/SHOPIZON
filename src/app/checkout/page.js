import Link from "next/link";

export default function checkoutPage(){
    return (
        <div className="pt-[5rem] w-[80%] min-h-[85vh] mx-auto">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <p className="bg-green-600 px-2 py-2 rounded-lg w-[30rem]">Your order has been successfully processed!  ✅</p>
          <Link className='text-blue-500' href="/">Back To Home</Link>
        </div>
      );
}