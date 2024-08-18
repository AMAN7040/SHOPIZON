"use client";
import { addToCart, removeFromCart } from '@/store/slice/cartSlice';
import { useRouter } from 'next/navigation'
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddCart = ({ item }) => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const router = useRouter()

  const isInCart = cart.some((product) => product.id === item?.id);

  const handleAddcart = () => {
    if (!isInCart) {
      dispatch(addToCart(item));
    }
    router.push('/cart')
  };

  const handleGoToCart = () => {
    router.push('/cart')
  };

  if(!item) return null;

  return (
    <div>
      <button
        onClick={isInCart ? handleGoToCart : handleAddcart}
        className="bg-red-600 m-2 p-2 text-white rounded-md"
      >
        {isInCart ? "Go To Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default AddCart;
