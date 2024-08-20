"use client"; // Ensure this component is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";
import { removeFromCart, updateQuantity } from "@/store/slice/cartSlice";
import CartItem from "../components/cartItem/CartItem";
import CartSummary from "../components/cart-summary/CartSummary";

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

  //Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
    toast.info("Removed Cart item", {
      autoClose: 1500,
    });
  };

  //updating cartitem quantity
  const handleQuantityChange = (item, quantity) => {
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  //total price of cart
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
              <CartItem
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
                formatCurrency={formatCurrency}
              />
            ))}
          </div>

          <CartSummary
            subtotal={subtotal}
            discount={discount}
            totalPrice={totalPrice}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            isDiscountApplied={isDiscountApplied}
            handleApplyDiscount={handleApplyDiscount}
            error={error}
            formatCurrency={formatCurrency}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
