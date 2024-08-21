import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    // Retrieve token from cookies
    const token = request.cookies.get("token")?.value;

    if (token) {
      try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.json({ authenticated: true });
      } catch (error) {
        return NextResponse.json(
          { authenticated: false },
          { status: 401 }
        );
      }
    }

    // No token present
    return NextResponse.json(
      { authenticated: false},
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
