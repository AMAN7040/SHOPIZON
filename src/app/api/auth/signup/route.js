import connectMongo from "@/lib/mongodb";
import User from "@/modals/User";

export const runtime = 'nodejs';


export async function POST(request) {
  await connectMongo();

  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });
}
