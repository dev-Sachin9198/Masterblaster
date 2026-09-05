import { useEffect } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useUser, UserButton } from "@clerk/react";
import toast from "react-hot-toast";

import {
  LayoutDashboard,
  PlusSquare,
  Ticket,
  ArrowLeft,
} from "lucide-react";

import { assets } from "../../assets/assets";

// --------------------------------------------------
// Sidebar links
// --------------------------------------------------
const ADMIN_NAV_ITEMS = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/add-show",
    label: "Add Show",
    icon: PlusSquare,
  },
  {
    to: "/admin/bookings",
    label: "Bookings",
    icon: Ticket,
  },
];

// ==================================================
// Admin Layout
// ==================================================
export default function AdminLayout() {
  const navigate = useNavigate();

  const { isLoaded, isSignedIn, user } = useUser();

  // Access is controlled through Clerk's publicMetadata.
  // Set { "role": "admin" } on a user in the Clerk
  // Dashboard -> Users -> select user -> Edit public metadata.
  const isAdmin = user?.publicMetadata?.role === "admin";

  // ------------------------------------------------
  // Redirect anyone who isn't an admin
  // ------------------------------------------------
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      toast.error("Please login to access the admin panel.");
      navigate("/");
      return;
    }

    if (!isAdmin) {
      toast.error("You don't have access to the admin panel.");
      navigate("/");
    }

  }, [isLoaded, isSignedIn, isAdmin, navigate]);

  // ------------------------------------------------
  // Checking access
  // ------------------------------------------------
  if (!isLoaded || !isSignedIn || !isAdmin) {
    return (
      <div
        className="
          min-h-screen
          bg-[#020617]
          text-white
          flex
          items-center
          justify-center
        "
      >
        <p className="text-slate-400">
          Checking access...
        </p>
      </div>
    );
  }

  // ==================================================
  // RETURN
  // ==================================================
  return (
    <div
      className="
        min-h-screen
        bg-[#020617]
        text-white
        flex
      "
    >

      {/* =================================================
          SIDEBAR
      ================================================= */}
      <aside
        className="
          w-64
          shrink-0
          hidden
          sm:flex
          flex-col
          border-r
          border-white/10
          bg-white/[0.02]
        "
      >

        <Link
          to="/"
          className="
            flex
            items-center
            gap-2
            px-6
            py-6
            border-b
            border-white/10
          "
        >

          <img
            src={assets.logo}
            alt="Logo"
            className="w-9 h-auto"
          />

          <span className="font-bold text-lg">
            Admin
          </span>

        </Link>

        <nav className="flex-1 px-4 py-6 space-y-2">

          {ADMIN_NAV_ITEMS.map(
            ({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            )
          )}

        </nav>

        <div
          className="
            px-4
            py-5
            border-t
            border-white/10
            space-y-4
          "
        >

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              text-sm
              text-slate-400
              hover:text-white
              transition
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to site
          </Link>

          <div className="flex items-center gap-3">

            <UserButton afterSignOutUrl="/" />

            <span
              className="
                text-sm
                text-slate-400
                truncate
              "
            >
              {user?.fullName || "Admin"}
            </span>

          </div>

        </div>

      </aside>

      {/* =================================================
          MOBILE HEADER (sidebar hidden on small screens)
      ================================================= */}
      <div
        className="
          sm:hidden
          fixed
          top-0
          left-0
          right-0
          z-40
          flex
          items-center
          justify-between
          px-5
          py-4
          bg-[#020617]
          border-b
          border-white/10
        "
      >

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <img
            src={assets.logo}
            alt="Logo"
            className="w-8 h-auto"
          />
          <span className="font-semibold">
            Admin
          </span>
        </Link>

        <UserButton afterSignOutUrl="/" />

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}
      <main
        className="
          flex-1
          p-5
          sm:p-10
          pt-24
          sm:pt-10
          overflow-y-auto
        "
      >

        {/* Mobile nav tabs */}
        <div
          className="
            sm:hidden
            flex
            items-center
            gap-2
            mb-8
            overflow-x-auto
          "
        >

          {ADMIN_NAV_ITEMS.map(
            ({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  font-medium
                  whitespace-nowrap
                  transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-slate-400"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            )
          )}

        </div>

        <Outlet />

      </main>

    </div>
  );
}
