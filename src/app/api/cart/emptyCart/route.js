import connectMongo from "@/lib/mongodb";
import Cart from "@/modals/Cart";
import getUserIdFromToken from "@/lib/getUserId";

export async function POST(request) {
  try {
    await connectMongo();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
      });
    }

    // Clear the cart
    cart.items = [];
    await cart.save();

    return new Response(
      JSON.stringify({ message: "Checkout successful and cart emptied!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
