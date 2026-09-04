import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/react";

import {
  Ticket,
  CalendarDays,
  Clock3,
  Armchair,
  MapPin,
  Film,
} from "lucide-react";

import { getUserBookings } from "../utils/bookingStorage";

// --------------------------------------------------
// Format Date
// --------------------------------------------------
const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// --------------------------------------------------
// Format Time
// --------------------------------------------------
const formatTime = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// ==================================================
// My Booking
// ==================================================
export default function MyBooking() {
  const navigate = useNavigate();

  const { isLoaded, isSignedIn, user } = useUser();

  const [bookings, setBookings] = useState([]);

  // ------------------------------------------------
  // Load Bookings (waits for Clerk to finish loading)
  // ------------------------------------------------
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      navigate("/");
      return;
    }

    const data = getUserBookings(user.id);

    setBookings(data);

  }, [isLoaded, isSignedIn, user, navigate]);

  // ------------------------------------------------
  // Clerk still checking session
  // ------------------------------------------------
  if (!isLoaded) {
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
          Loading your bookings...
        </p>
      </div>
    );
  }

  // ------------------------------------------------
  // No Bookings
  // ------------------------------------------------
  if (isSignedIn && bookings.length === 0) {
    return (
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

          <div className="text-5xl mb-5">
            🎬
          </div>

          <h1
            className="
              text-3xl
              font-bold
              mb-3
            "
          >
            No Bookings Yet
          </h1>

          <p className="text-slate-400 mb-6">
            You haven't booked any movie tickets yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="
              px-6
              py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-500
              transition
              font-semibold
            "
          >
            Browse Movies
          </button>

        </div>
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
        pt-28
        pb-16
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
          px-5
          sm:px-8
          lg:px-12
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}
        <div
          className="
            flex
            items-center
            gap-3
            mb-10
          "
        >
          <Ticket className="w-7 h-7 text-indigo-400" />

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-bold
            "
          >
            My Bookings
          </h1>
        </div>

        {/* =================================================
            LIST
        ================================================= */}
        <div className="space-y-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-5
                sm:p-6
              "
            >

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-5
                "
              >

                <img
                  src={booking.movie?.poster_path}
                  alt={booking.movie?.title}
                  className="
                    w-full
                    sm:w-32
                    h-48
                    sm:h-44
                    object-cover
                    rounded-xl
                  "
                />

                <div className="flex-1">

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                      flex-wrap
                    "
                  >

                    <div>

                      <div className="flex items-center gap-2">

                        <Film className="w-4 h-4 text-indigo-400" />

                        <h2 className="text-xl font-bold">
                          {booking.movie?.title}
                        </h2>

                      </div>

                      <p
                        className="
                          text-xs
                          text-slate-500
                          mt-1
                        "
                      >
                        Booking ID: {booking._id}
                      </p>

                    </div>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${
                          booking.isPaid
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }
                      `}
                    >
                      {booking.isPaid
                        ? "Paid"
                        : "Pending"}
                    </span>

                  </div>

                  <div
                    className="
                      grid
                      sm:grid-cols-3
                      gap-4
                      mt-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-300
                      "
                    >
                      <CalendarDays className="w-4 h-4 text-indigo-400" />
                      {formatDate(booking.show?.date)}
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-300
                      "
                    >
                      <Clock3 className="w-4 h-4 text-indigo-400" />
                      {formatTime(booking.show?.time)}
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-300
                      "
                    >
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      Cinema Hall
                    </div>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-4
                      flex-wrap
                    "
                  >

                    <Armchair className="w-4 h-4 text-indigo-400" />

                    <span className="text-sm text-slate-400">
                      Seats:
                    </span>

                    {booking.bookedSeats?.map(
                      (seat) => (
                        <span
                          key={seat}
                          className="
                            px-2.5
                            py-1
                            rounded-md
                            bg-indigo-600/20
                            border
                            border-indigo-500/30
                            text-xs
                            font-medium
                            text-indigo-300
                          "
                        >
                          {seat}
                        </span>
                      )
                    )}

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mt-5
                      pt-5
                      border-t
                      border-white/10
                    "
                  >

                    <span className="text-sm text-slate-400">
                      Tickets: {booking.bookedSeats?.length}
                    </span>

                    <span
                      className="
                        text-xl
                        font-bold
                        text-indigo-400
                      "
                    >
                      ₹{booking.amount}
                    </span>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
