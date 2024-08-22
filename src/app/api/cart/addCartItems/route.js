import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb"; // Ensure this path is correct
import Cart from "@/modals/Cart";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation
import getUserIdFromToken from "@/lib/getUserId";

// Function to get userId from token

export async function POST(request) {
  try {
    await connectMongo();

    // Get and decode token from cookies
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Extract request data
    const { productId, quantity, name, price, brand, imageUrl } =
      await request.json();
    if (!productId || !quantity || !name || !price) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create the cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Add or update the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, brand, quantity, imageUrl });
    }

    // Save the cart
    await cart.save();
    return NextResponse.json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
