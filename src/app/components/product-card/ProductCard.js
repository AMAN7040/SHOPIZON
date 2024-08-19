"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  
  return (
    <Link href={`products/${product?.id}`}>
      <div key={product.id} className="border p-[1rem] rounded-md shadow-lg mx-[2rem] my-[1rem] hover:bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={250}
          height={200}
          className="mb-4 mx-auto"
        />
        <h2 className=" text-md md:text-lg font-semibold">{(product.title).substring}</h2>
        <p className="text-gray-600 text-[0.8rem] md:text-[1rem]">{product.description.substring(0, 70)}....</p>
        <p className="text-gray-600 text-[0.7rem] md:text-[0.9rem]">Brand: {' '}{product.brand}</p>
        <p className="text-[0.8rem] md:text-lg font-bold">${product.price.toFixed(2)}</p>
        
      </div>
    </Link>
  );
};

export default ProductCard;
