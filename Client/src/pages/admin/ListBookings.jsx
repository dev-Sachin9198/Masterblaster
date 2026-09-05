import { useEffect, useState } from "react";

import { Ticket } from "lucide-react";

import { getAllBookingsAdmin } from "../../utils/bookingStorage";

// --------------------------------------------------
// Format Date + Time
// --------------------------------------------------
const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ==================================================
// List Bookings
// ==================================================
const ListBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getAllBookingsAdmin());
  }, []);

  // ==================================================
  // RETURN
  // ==================================================
  return (
    <div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-8">
        All Bookings
      </h1>

      {bookings.length === 0 ? (

        <div
          className="
            rounded-2xl
            bg-white/5
            border
            border-white/10
            p-10
            text-center
          "
        >
          <Ticket className="w-8 h-8 text-slate-600 mx-auto mb-3" />

          <p className="text-slate-400">
            No bookings have been made yet.
          </p>
        </div>

      ) : (

        <div
          className="
            rounded-2xl
            border
            border-white/10
            overflow-hidden
          "
        >

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="bg-white/5 text-left text-slate-400">
                  <th className="px-5 py-3 font-medium">Movie</th>
                  <th className="px-5 py-3 font-medium">Show Time</th>
                  <th className="px-5 py-3 font-medium">Seats</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Booked On</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-t border-white/10"
                  >

                    <td className="px-5 py-4 font-medium">
                      {booking.movie?.title || "N/A"}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {formatDateTime(booking.show?.time)}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {booking.bookedSeats?.join(", ") || "—"}
                    </td>

                    <td className="px-5 py-4 font-semibold text-indigo-400">
                      ₹{booking.amount}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`
                          px-2.5
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            booking.isPaid
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-amber-500/15 text-amber-400"
                          }
                        `}
                      >
                        {booking.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400 text-xs">
                      {formatDateTime(booking.createdAt)}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
};

export default ListBookings;
