"use client";
import { addToCart } from '@/store/slice/cartSlice';
import { useRouter } from 'next/navigation';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCart = ({ item }) => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  // Check if item is in the cart
  const isInCart = cart.some((product) => product.id === item?.id);

  // Handle adding item to cart and showing toast
  const handleAddCart = () => {
    if (!isInCart) {
      dispatch(addToCart(item));
      toast.success("Item added to cart!" ,{
        autoClose: 1500,
      });
    } else {
      toast.info("Item already in cart.");
    }
    router.push('/cart');
  };

  // Handle navigation to the cart
  const handleGoToCart = () => {
    router.push('/cart');
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
      {/* ToastContainer should be placed higher in the component tree, e.g., in RootLayout or _app.js */}
    </div>
  );
};

export default AddCart;
