'use client'
import Image from "next/image";
import React from "react";
import defaultImage from '../../../assets/images/defaultimage.png'; 

const CartItem = ({ item, handleQuantityChange, handleRemove, formatCurrency }) => {
    
  return (
    <div
      className="flex items-center mb-4 border p-2 md:p-4 rounded"
    >
      <Image
        src={item?.imageUrl || defaultImage}
        alt={`Thumbnail of ${item?.name}`}
        width={200}
        height={200}
        className="object-cover w-[30%] md:w-[10%] h-auto mb-4 shadow-md mx-[1rem]"
      />
      <div className="flex-grow">
        <h2 className="text-md md:text-lg font-semibold">{item?.name}</h2>
        <p>{formatCurrency(item.price * item.quantity)}</p>
        <div className="md:flex items-center mt-2 text-[0.7rem] md:text-[1rem]">
          <div className="flex items-center my-[1rem] ">
            <button
              onClick={() => handleQuantityChange(item, item.quantity - 1)}
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
              onClick={() => handleQuantityChange(item, item.quantity + 1)}
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
  );
};

export default CartItem;
