import { serialize } from "cookie";

export async function POST(request) {
  try {
    const cookie = serialize("token", "", {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Secure only in production
      expires: new Date(0), // Expire the cookie
      path: "/", // Available across the entire site
    });

    return new Response(JSON.stringify({ message: "Logout successful" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie, // Clear the cookie
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
