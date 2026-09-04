import { Route, Routes, useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviesDetails from "./pages/MoviesDetails";
import MyBooking from "./pages/MyBooking";
import SeatLayout from "./pages/SeatLayout";
import Favorite from "./pages/Favorite";
import Checkout from "./pages/Checkout";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}
     { !isAdminRoute && <Navbar /> }

      {/* =================================================
          ROUTES
      ================================================= */}
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Movies */}
        <Route
          path="/movies"
          element={<Movies />}
        />

        {/* Movie Details */}
        <Route
          path="/Movies/:id"
          element={<MoviesDetails />}
        />

        {/* Seat Layout */}
        <Route
          path="/Movies/:id/:date"
          element={<SeatLayout />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* My Booking */}
        <Route
          path="/my-booking"
          element={<MyBooking />}
        />

        {/* Favorite */}
        <Route
          path="/favorite"
          element={<Favorite />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div
              className="
                min-h-screen
                bg-[#020617]
                text-white
                flex
                items-center
                justify-center
                px-5
              "
            >

              <div className="text-center">

                <div className="text-7xl">
                  404
                </div>

                <h1
                  className="
                    text-3xl
                    font-bold
                    mt-4
                  "
                >
                  Page Not Found
                </h1>

                <p
                  className="
                    text-slate-400
                    mt-2
                  "
                >
                  The page you are looking for
                  does not exist.
                </p>

              </div>

            </div>
          }
        />

      </Routes>

      {/* =================================================
          FOOTER
      ================================================= */}
      { !isAdminRoute && <Footer /> }

      {/* =================================================
          TOASTER
      ================================================= */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

    </>
  );
};

export default App;