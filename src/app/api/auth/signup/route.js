import connectMongo from "@/lib/mongodb";
import User from "@/modals/User";

//user login
export async function POST(request) {
  try {
    await connectMongo(); //Connecting Database

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
        }
      );
    }
    
    //to ensure the email does not already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }
   
    //new user signed up
    const newUser = new User({ name, email, password });
    await newUser.save();

    return new Response(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error during signup:", error); // Added detailed logging
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
