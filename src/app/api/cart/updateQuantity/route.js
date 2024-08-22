import getUserIdFromToken from "@/lib/getUserId";
import connectMongo from "@/lib/mongodb";
import Cart from "@/modals/Cart";

export async function PUT(request) {
  try {
    await connectMongo();

    const { productId, quantity } = await request.json();

    if (!productId || quantity == null) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
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

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return new Response(
        JSON.stringify({ message: "Cart item quantity updated successfully!" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ error: "Item not found in cart" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
