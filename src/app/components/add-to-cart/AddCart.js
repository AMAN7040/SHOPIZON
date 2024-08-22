"use client";
import { addToCart } from "@/store/slice/cartSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCart = ({ item }) => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  // Check if item is in the cart
  const isInCart = cart.some((product) => product.productId === item.id);

  // Handle adding item to cart and showing toast
  const handleAddCart = async () => {
    try {
      const response = await fetch("/api/cart/addCartItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: 1,
          name: item.title,
          price: item.price,
          imageUrl: item.thumbnail,
        }),
      });

      if (response.ok) {
        dispatch(addToCart(item));
        toast.success("Item added to cart!", {
          autoClose: 1500,
        });
        router.push("/cart");
      } else {
        router.push('/signin')
      }
    } catch (error) {
      console.error("Error during API request:", error);
      // toast.error("Failed to add item to cart.");
    }
  };

  // Handle navigation to the cart
  const handleGoToCart = () => {
    router.push("/cart");
  };

  // If no item, return null
  if (!item) return null;

  return (
    <div>
      <button
        onClick={isInCart ? handleGoToCart : handleAddCart}
        className="bg-red-600 mx-1 my-1 p-1 md:mx-2 md:my-2 md:p-2 text-xs md:text-lg text-white rounded-md"
      >
        {isInCart ? "Go To Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default AddCart;
