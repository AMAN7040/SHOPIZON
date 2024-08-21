"use client";

import { logoutUser, setUser } from "@/store/slice/userSlice";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const active = usePathname();
  const cart = useSelector((store) => store.cart);
  const router = useRouter();
  const user = useSelector((store) => store?.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-session", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            dispatch(setUser("true"));
          } else {
            dispatch(logoutUser()); // Remove user from Redux store
          }
        } else {
          dispatch(logoutUser()); // Ensure user is logged out on error
        }
      } catch (error) {
        dispatch(logoutUser()); // Ensure user is logged out on error
      }
    };

    checkAuth();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        dispatch(logoutUser()); // Remove user from Redux store
        toast.info("Logout successful. See you next time!", {
          autoClose: 1500,
        });
        router.push("/signin"); // Redirect to sign-in page
      } else {
        toast.error("Logout failed. Please try again.", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.", { autoClose: 1000 });
    }
  };

  return (
    <div className="flex justify-evenly md:justify-between text-black h-[5rem] bg-gray-200 opacity-90 w-full">
      <div className="w-1/2 mx-[0.5rem] md:mx-[5rem] my-auto text-[1rem] md:text-[1.5rem]">
        SHOPIZON
      </div>
      <div className="w-full md:w-2/3 lg:w-3/5 flex justify-around items-center space-x-4 md:space-x-5 mx-[2rem]">
        <Link
          className={`not-active ${
            active === "/" ? "active" : ""
          } text-[0.8rem] md:text-[1.3rem] `}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`not-active ${
            active === "/products" ? "active" : ""
          } text-[0.8rem] md:text-[1.2rem] lg:text-[1.3rem]`}
          href="/products"
        >
          Product
        </Link>
        <Link
          className={`not-active relative flex items-center ${
            active === "/cart" ? "active" : ""
          } text-[0.8rem] md:text-[1.2rem] lg:text-[1.3rem]`}
          href="/cart"
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-[0.7rem] md:text-[1rem]"
          />
          Cart
          {cart?.length > 0 && (
            <span className="absolute -left-1 -top-1 bg-red-600 text-black rounded-full w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[10px] md:text-[14px]">
              {cart.length}
            </span>
          )}
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-black text-white rounded-md px-[0.3rem] py-[0.2rem] text-[0.8rem] md:text-[1.2rem] lg:text-[1.3rem] mx-[1rem]"
          >
            Logout
          </button>
        ) : (
          <Link href="/signin">
            <button className="bg-black text-white rounded-md px-[0.3rem] py-[0.2rem] text-[0.8rem] md:text-[1.2rem] lg:text-[1.3rem] mx-[1rem]">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
