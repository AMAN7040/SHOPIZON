import getUserIdFromToken from "@/lib/getUserId";
import connectMongo from "@/lib/mongodb";
import Cart from "@/modals/Cart";

export async function DELETE(request) {
  try {
    await connectMongo();

    const { productId } = await request.json();

    if (!productId == null) {
      return new Response(JSON.stringify({ error: "PoductId is required" }), {
        status: 400,
      });
    }
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
      });
    }

    // Filter out the item with the specified productId
    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();

    return new Response(
      JSON.stringify({ message: "Item removed from cart successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
