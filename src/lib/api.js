"use server";

//get all products
// lib/api.js
export async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=12", {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    return {
      success: true,
      data: data?.products,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Some error occured! Please try again later",
    };
  }
}

//get product details
// get product details
export async function fetchProductDetails(productId) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${productId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Some error occurred! Please try again later.",
    };
  }
}
