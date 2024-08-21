"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify"; // Import toast for notifications

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    // Check for token in cookies to redirect if user is already logged in
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/auth/check-session", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        });
        if (response.ok) {
          router.push("/"); // Redirect to home page if user is already logged in
        }
      } catch (error) {
        // Handle error if necessary
      }
    };

    fetchToken();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while processing
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Sign up successful! Redirecting to sign-in...", {
          autoClose: 1500,
        });
        router.push("/signin");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred");
      toast.error("An error occurred"); // Show error toast
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md -mt-[10rem]">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
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
            disabled={loading} // Disable button while loading
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {loading ? "Signing Up..." : "Sign Up"} {/* Button text change */}
          </button>
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
        <Link href="/signin">
          <p className="text-center mt-4">
            Already have an account?
            <span className="text-indigo-600 underline"> Login</span>
          </p>
        </Link>
      </div>
    </div>
  );
}
