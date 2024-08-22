"use client"; // Ensure this component is a client component

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  removeFromCart,
  setCart,
  updateQuantity,
} from "@/store/slice/cartSlice";
import CartItem from "../components/cartItem/CartItem";
import CartSummary from "../components/cart-summary/CartSummary";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart/getItems");
        if (response.ok) {
          const data = await response.json();
          dispatch(setCart(data.items));
        } else {
          console.error("Failed to fetch cart");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  //Remove item from cart
  const handleRemove = async (item) => {
    try {
      const response = await fetch("/api/cart/removeItems", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
        }),
      });
      if (response.ok) {
        dispatch(removeFromCart(item));
        toast.info("Removed Cart Item", {
          autoClose: 1500,
        });
      } else {
        const data = await response.json();
        console.error("Failed to remove item:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //updating cartitem quantity
  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return; // Prevent setting quantity to less than 1

    try {
      const response = await fetch("/api/cart/updateQuantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
          quantity: newQuantity,
        }),
      });

      if (response.ok) {
        dispatch(updateQuantity({ id: item.productId, quantity: newQuantity }));
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating quantity");
    }
  };
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/cart/emptyCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        dispatch(setCart([])); // Clear the cart from Redux state
        router.push("/checkout");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to complete checkout.");
      }
    } catch (error) {
      toast.error("Error during checkout.");
    }
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
            {cart.map((item, index) => (
              <CartItem
                key={item?.productId + index}
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
            handleCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
