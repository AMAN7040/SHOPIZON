"use client"; // Use client-side JavaScript

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/userSlice";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-session", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          router.push("/"); // Redirect to home page if user is already logged in
        }
      } catch (error) {
        // console.error("Failed to check authentication:", error);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "An error occurred");
        return;
      }

      dispatch(setUser("true"));

      toast.success("User Logged in Successfully", {
        autoClose: 1500,
      });
      router.push("/"); // Redirect to the home page 
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md -mt-[10rem]">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Sign In
          </button>
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
        <p className="text-center mt-4">
          New user?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Go to signup page
          </Link>
        </p>
      </div>
    </div>
  );
}
