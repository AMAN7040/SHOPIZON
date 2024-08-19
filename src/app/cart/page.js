"use client"; // Ensure this component is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";
import { removeFromCart, updateQuantity } from "@/store/slice/cartSlice";

const CartPage = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin"); // Redirect to sign-in page if no token is found
    }
  }, [router]);

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
    toast.info('Removed Cart item',{
      autoClose: 1500,
    });
  };

  const handleQuantityChange = (item, quantity) => {
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleApplyDiscount = () => {
    const discountCodes = {
      SAVE10: 0.1, // 10% discount
      SAVE20: 0.2, // 20% discount
    };

    const discount = discountCodes[discountCode.toUpperCase()];
    if (discount) {
      setDiscountAmount(discount);
      setIsDiscountApplied(true);
      setError("");
    } else {
      setError("Invalid discount code. Please try again.");
    }
  };

  const subtotal = calculateSubtotal();
  const discount = subtotal * discountAmount;
  const totalPrice = subtotal - discount;

  return (
    <div className="my-2 md:p-4 w-[80%] mx-auto h-full">
      <h1 className="text-lg md:text-2xl font-bold mb-4 my-[4rem] mx-auto">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-md md:text-lg">Nothing in cart. Please add items.</p>
      ) : (
        <div className="flex flex-col-reverse justify-around md:flex-row md:space-x-3 ">
          <div className="md:w-3/5 h-[10rem] mb-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-4 border p-2 md:p-4 rounded"
              >
                <Image
                  src={item?.thumbnail} 
                  alt={`Thumbnail of ${item.title}`}
                  width={200}
                  height={200}
                  className="object-cover w-[30%] md:w-[10%] h-auto mb-4 shadow-md mx-[1rem]"
                />
                <div className="flex-grow">
                  <h2 className="text-md md:text-lg font-semibold">
                    {item.title}
                  </h2>
                  <p>{formatCurrency(item.price * item.quantity)}</p>
                  <div className="md:flex items-center mt-2 text-[0.7rem] md:text-[1rem]">
                    <div className="flex items-center my-[1rem] ">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className={`bg-gray-300 px-2 py-1 rounded w-[1.5rem] ${
                          item.quantity <= 1 ? "opacity-25" : ""
                        }`}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="mx-2 w-12 text-center border rounded"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="bg-gray-300 px-2 py-1 rounded w-[1.5rem]"
                      >
                        +
                      </button>
                    </div>
                    <div className="my-[1rem] mx-5 ">
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-sm md:text-md ml-2 bg-red-500 text-white px-1 py-1 rounded"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:mt-6 p-[1rem] shadow-md md:w-2/5 text-[0.7rem] md:text-[1rem] mb-4">
            <h2 className="text-lg md:text-xl font-bold mb-2">Cart Summary</h2>
            <p>Subtotal: {formatCurrency(subtotal)}</p>
            <p>
              Available Discounts: For 10% Discount - SAVE10 & For 20% Discount-
              SAVE20{" "}
            </p>
            {isDiscountApplied && <p>Discount: -{formatCurrency(discount)}</p>}
            <p>Total Price: {formatCurrency(totalPrice)}</p>

            {!isDiscountApplied && (
              <div className="my-[1rem]">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  className="border p-2 rounded mr-2 px-2 py-1 md:px-3 md:py-2 mb-2"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="bg-blue-500 text-white px-2 py-1 md:px-3 md:py-2 rounded"
                >
                  Apply Discount
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            )}

            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 bg-blue-500 text-white px-2 py-1 md:px-3 md:py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
