import connectMongo from "@/lib/mongodb";
import User from "@/modals/User";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectMongo(); //  database  connecting

    const { email, password } = await request.json();

    //to ensure all fields are filled
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }
    
    //finding user
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }
    
    //authenticaing user
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error('Error during login:', error); // Detailed logging
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
