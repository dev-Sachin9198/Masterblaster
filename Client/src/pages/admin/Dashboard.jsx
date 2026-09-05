import { useEffect, useState } from "react";

import {
  Ticket,
  IndianRupee,
  Clapperboard,
  Users,
} from "lucide-react";

import { getBookingStats } from "../../utils/bookingStorage";
import { getAllShows } from "../../utils/showStorage";

// ==================================================
// Dashboard
// ==================================================
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });

  const [shows, setShows] = useState([]);

  // ------------------------------------------------
  // Load stats
  // ------------------------------------------------
  useEffect(() => {
    setStats(getBookingStats());
    setShows(getAllShows());
  }, []);

  const cards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: Ticket,
    },
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: IndianRupee,
    },
    {
      label: "Active Shows",
      value: shows.length,
      icon: Clapperboard,
    },
    {
      label: "Total Customers",
      value: stats.totalUsers,
      icon: Users,
    },
  ];

  // ==================================================
  // RETURN
  // ==================================================
  return (
    <div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* =================================================
          STAT CARDS
      ================================================= */}
      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          sm:gap-6
          mb-12
        "
      >

        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="
              rounded-2xl
              bg-white/5
              border
              border-white/10
              p-5
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-indigo-600/20
                flex
                items-center
                justify-center
                mb-4
              "
            >
              <Icon className="w-5 h-5 text-indigo-400" />
            </div>

            <p className="text-2xl font-bold">
              {value}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {label}
            </p>

          </div>
        ))}

      </div>

      {/* =================================================
          ACTIVE SHOWS
      ================================================= */}
      <h2 className="text-xl font-semibold mb-5">
        Active Shows
      </h2>

      {shows.length === 0 ? (

        <p className="text-slate-400 text-sm">
          No shows have been added yet.
        </p>

      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {shows.map((show) => (
            <div
              key={show._id}
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-4
                flex
                gap-4
              "
            >

              <img
                src={show.movie?.poster_path}
                alt={show.movie?.title}
                className="
                  w-16
                  h-24
                  object-cover
                  rounded-lg
                  shrink-0
                "
              />

              <div className="min-w-0">

                <p className="font-semibold truncate">
                  {show.movie?.title}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(
                    show.showDateTime
                  ).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="text-sm text-indigo-400 font-semibold mt-2">
                  ₹{show.showPrice}
                </p>

              </div>

            </div>
          ))}

        </div>

      )}

    </div>
  );
};

export default Dashboard;
