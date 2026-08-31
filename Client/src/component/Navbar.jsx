import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";

import {
  MenuIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

import { useState } from "react";

export default function Navbar() {
  const [IsOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">

      {/* Logo */}
      <Link
        to="/"
        onClick={handleClose}
        className="max-md:flex-1"
      >
        <img
          src={assets.logo}
          alt="Logo"
          className="w-11 h-auto"
        />
      </Link>

      {/* Navigation */}
      <div
        className={`
          fixed md:static
          top-0 left-0

          h-screen md:h-auto
          w-full md:w-auto

          flex flex-col md:flex-row
          items-center justify-center md:justify-start

          gap-7 md:gap-8 lg:gap-10

          px-6 py-3

          bg-black/90 md:bg-white/5
          backdrop-blur-xl md:backdrop-blur-md

          border border-white/10
          md:rounded-full

          text-gray-300
          text-xl md:text-base
          font-semibold md:font-medium

          transition-transform duration-300 ease-in-out

          ${
            IsOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="
            md:hidden
            absolute
            top-6
            right-6
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-full
            bg-white/10
            text-gray-300
            hover:text-white
            hover:bg-white/20
            transition-all
            duration-300
          "
          aria-label="Close menu"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Home */}
        <Link
          onClick={handleClose}
          to="/"
          className="
            relative
            hover:text-white
            transition-colors
            duration-300
            after:absolute
            after:left-0
            after:-bottom-2
            after:w-0
            after:bg-primary
            after:rounded-full
            after:transition-all
            after:duration-300
            hover:after:w-full
          "
        >
          Home
        </Link>

        {/* Movies */}
        <Link
          onClick={handleClose}
          to="/"
          className="
            relative
            hover:text-white
            transition-colors
            duration-300
            after:absolute
            after:left-0
            after:-bottom-2
            after:w-0
            after:bg-primary
            after:rounded-full
            after:transition-all
            after:duration-300
            hover:after:w-full
          "
        >
          Movies
        </Link>

        {/* Theater */}
        <Link
          onClick={handleClose}
          to="/"
          className="
            relative
            hover:text-white
            transition-colors
            duration-300
            after:absolute
            after:left-0
            after:-bottom-2
            after:w-0
            after:bg-primary
            after:rounded-full
            after:transition-all
            after:duration-300
            hover:after:after:w-full
          "
        >
          Theater
        </Link>

        {/* Released */}
        <Link
          onClick={handleClose}
          to="/"
          className="
            relative
            hover:text-white
            transition-colors
            duration-300
            after:absolute
            after:left-0
            after:-bottom-2
            after:w-0
            after:bg-primary
            after:rounded-full
            after:transition-all
            after:duration-300
            hover:after:w-full
          "
        >
          Released
        </Link>

        {/* Favorite */}
        <Link
          onClick={handleClose}
          to="/Favorite"
          className="
            relative
            hover:text-white
            transition-colors
            duration-300
            after:absolute
            after:left-0
            after:-bottom-2
            after:w-0
            after:bg-primary
            after:rounded-full
            after:transition-all
            after:duration-300
            hover:after:w-full
          "
        >
          Favorite
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 md:gap-8">

        {/* Search */}
        <SearchIcon
          className="
            max-md:hidden
            w-6 h-6
            text-gray-300
            hover:text-white
            cursor-pointer
            transition
          "
        />

        {/* Clerk Authentication */}
        <div className="flex items-center gap-3">

          {/* Signed Out */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                className="
                  px-4 py-1
                  sm:px-7 sm:py-2
                  bg-primary
                  hover:bg-primary-dull
                  transition-all
                  duration-300
                  rounded-full
                  font-medium
                  cursor-pointer
                  hover:scale-105
                "
              >
                Login
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                className="
                  hidden sm:block
                  px-4 py-1
                  sm:px-7 sm:py-2
                  border
                  border-white/30
                  hover:bg-white/10
                  transition-all
                  duration-300
                  rounded-full
                  font-medium
                  cursor-pointer
                "
              >
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          {/* Signed In */}
          <Show when="signed-in">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 sm:w-10 sm:h-10",
                },
              }}
            />
          </Show>

        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          ml-4
          md:hidden
          flex
          items-center
          justify-center
          text-white
          hover:text-primary
          transition
        "
        aria-label="Open menu"
      >
        <MenuIcon className="w-8 h-8" />
      </button>

    </div>
  );
}

