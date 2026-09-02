import { useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Check,
  Clock3,
  MapPin,
  Armchair,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  dummyShowsData,
  dummyDateTimeData,
  dummyDashboardData,
  dummyBookingData,
} from "../assets/assets";

// ==================================================
// Seat Layout
// ==================================================
const SeatLayout = () => {
  const navigate = useNavigate();

  const { id, date } = useParams();

  const [searchParams] =
    useSearchParams();

  const showId =
    searchParams.get("showId");

  const [selectedSeats, setSelectedSeats] =
    useState([]);

  // ==================================================
  // MOVIE
  // ==================================================
  const movie = useMemo(() => {

    return dummyShowsData?.find(
      (item) =>
        String(item.id) === String(id)
    );

  }, [id]);

  // ==================================================
  // SHOW
  // ==================================================
  const show = useMemo(() => {

    if (!date || !showId) {
      return null;
    }

    const showsForDate =
      dummyDateTimeData?.[date];

    if (!showsForDate) {
      return null;
    }

    return (
      showsForDate.find(
        (item) =>
          String(item.showId) ===
          String(showId)
      ) || null
    );

  }, [date, showId]);

  // ==================================================
  // SEAT CONFIG
  // ==================================================
  const rows = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const seatsPerRow = 10;

  const ticketPrice = 180;

  // ==================================================
  // OCCUPIED SEATS
  // ==================================================
  const occupiedSeats = useMemo(() => {

    const seats = new Set();

    // ------------------------------------------------
    // Dashboard active show
    // ------------------------------------------------
    const activeShow =
      dummyDashboardData?.activeShows?.find(
        (item) =>
          String(item._id) ===
          String(showId)
      );

    if (activeShow?.occupiedSeats) {

      Object.keys(
        activeShow.occupiedSeats
      ).forEach((seat) => {
        seats.add(seat);
      });

    }

    // ------------------------------------------------
    // Booking data
    // ------------------------------------------------
    dummyBookingData?.forEach(
      (booking) => {

        if (
          String(booking?.show?._id) ===
          String(showId)
        ) {

          booking.bookedSeats?.forEach(
            (seat) => {
              seats.add(seat);
            }
          );

        }

      }
    );

    // ------------------------------------------------
    // Demo fallback
    // ------------------------------------------------
    if (seats.size === 0) {

      [
        "A3",
        "A4",
        "B6",
        "B7",
        "C2",
        "C3",
        "D8",
        "E5",
        "E6",
        "F1",
      ].forEach((seat) => {
        seats.add(seat);
      });

    }

    return Array.from(seats);

  }, [showId]);

  // ==================================================
  // SELECT SEAT
  // ==================================================
  const handleSeatClick = (
    seatNumber
  ) => {

    if (
      occupiedSeats.includes(
        seatNumber
      )
    ) {
      toast.error(
        `${seatNumber} is already occupied`
      );

      return;
    }

    setSelectedSeats((prev) => {

      if (prev.includes(seatNumber)) {

        return prev.filter(
          (seat) =>
            seat !== seatNumber
        );

      }

      return [
        ...prev,
        seatNumber,
      ];

    });

  };

  // ==================================================
  // TOTAL
  // ==================================================
  const totalPrice =
    selectedSeats.length *
    ticketPrice;

  // ==================================================
  // CHECKOUT
  // ==================================================
  const handleProceedToCheckout =
    () => {

      // No seat
      if (
        selectedSeats.length === 0
      ) {

        toast.error(
          "Please select at least one seat."
        );

        return;
      }

      // Login
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        toast.error(
          "Please login first to proceed to checkout."
        );

        return;
      }

      // Invalid movie
      if (!movie?.id) {

        toast.error(
          "Movie information is missing."
        );

        return;
      }

      // Invalid show
      if (!show?.showId) {

        toast.error(
          "Show information is missing."
        );

        return;
      }

      // Checkout
      navigate(
        `/checkout?movieId=${movie.id}&showId=${show.showId}&date=${date}&seats=${selectedSeats.join(
          ","
        )}&amount=${totalPrice}`
      );

    };

  // ==================================================
  // INVALID
  // ==================================================
  if (!movie || !show) {

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
            Show Not Found
          </h1>

          <p className="text-slate-400 mb-6">
            The selected movie show could not
            be found.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/movies")
            }
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
            Back to Movies
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
        pb-36
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-12
        "
      >

        {/* Back */}
        <button
          type="button"
          onClick={() =>
            navigate(-1)
          }
          className="
            flex
            items-center
            gap-2
            text-slate-400
            hover:text-white
            transition
            mb-8
          "
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Movie Info */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            p-5
            rounded-2xl
            bg-white/5
            border
            border-white/10
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Armchair
                className="
                  w-6
                  h-6
                  text-indigo-400
                "
              />

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                "
              >
                {movie.title}
              </h1>

            </div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-4
                mt-3
                text-sm
                text-slate-400
              "
            >

              <span
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Clock3 className="w-4 h-4" />

                {new Date(
                  show.time
                ).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <MapPin className="w-4 h-4" />

                Cinema Hall
              </span>

              <span>
                Date: {date}
              </span>

            </div>

          </div>

          {/* Price */}
          <div
            className="
              text-left
              md:text-right
            "
          >

            <p className="text-sm text-slate-400">
              Ticket Price
            </p>

            <p
              className="
                text-2xl
                font-bold
                text-indigo-400
              "
            >
              ₹{ticketPrice}
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          SCREEN
      ================================================= */}
      <div
        className="
          max-w-5xl
          mx-auto
          px-5
          mt-14
        "
      >

        <div className="text-center">

          <p
            className="
              text-sm
              text-slate-400
              mb-4
              tracking-[0.3em]
            "
          >
            SCREEN
          </p>

          <div
            className="
              h-3
              w-full
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-white
              to-transparent
              opacity-80
              shadow-[0_0_30px_rgba(255,255,255,0.25)]
            "
          />

          <p
            className="
              text-xs
              text-slate-500
              mt-3
            "
          >
            All eyes this way
          </p>

        </div>

      </div>

      {/* =================================================
          SEAT LAYOUT
      ================================================= */}
      <div
        className="
          max-w-5xl
          mx-auto
          px-5
          mt-12
        "
      >

        <div className="space-y-4">

          {rows.map((row) => (

            <div
              key={row}
              className="
                flex
                items-center
                justify-center
                gap-2
                sm:gap-3
              "
            >

              {/* Left row */}
              <div
                className="
                  w-7
                  sm:w-10
                  text-center
                  text-xs
                  sm:text-sm
                  text-slate-500
                  font-semibold
                "
              >
                {row}
              </div>

              {/* Seats */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  sm:gap-2
                "
              >

                {Array.from(
                  {
                    length:
                      seatsPerRow,
                  },
                  (_, index) => {

                    const seatNumber =
                      `${row}${index + 1}`;

                    const isOccupied =
                      occupiedSeats.includes(
                        seatNumber
                      );

                    const isSelected =
                      selectedSeats.includes(
                        seatNumber
                      );

                    return (
                      <button
                        key={seatNumber}
                        type="button"
                        disabled={isOccupied}
                        onClick={() =>
                          handleSeatClick(
                            seatNumber
                          )
                        }
                        aria-label={`Seat ${seatNumber}`}
                        className={`
                          relative
                          w-7
                          h-7
                          sm:w-9
                          sm:h-9
                          rounded-lg
                          text-[9px]
                          sm:text-xs
                          font-medium
                          transition-all
                          duration-200
                          border

                          ${
                            isOccupied
                              ? `
                                bg-slate-800
                                border-slate-700
                                text-slate-600
                                cursor-not-allowed
                              `
                              : isSelected
                              ? `
                                bg-indigo-600
                                border-indigo-400
                                text-white
                                scale-110
                                shadow-lg
                                shadow-indigo-500/30
                              `
                              : `
                                bg-white/5
                                border-white/10
                                text-slate-400
                                hover:bg-white/10
                                hover:border-indigo-400/50
                                hover:text-white
                              `
                          }
                        `}
                      >

                        {isSelected ? (
                          <Check
                            className="
                              w-4
                              h-4
                              mx-auto
                            "
                          />
                        ) : (
                          index + 1
                        )}

                      </button>
                    );
                  }
                )}

              </div>

              {/* Right row */}
              <div
                className="
                  w-7
                  sm:w-10
                  text-center
                  text-xs
                  sm:text-sm
                  text-slate-500
                  font-semibold
                "
              >
                {row}
              </div>

            </div>

          ))}

        </div>

        {/* =================================================
            LEGEND
        ================================================= */}
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-5
            mt-12
            text-sm
            text-slate-400
          "
        >

          {/* Available */}
          <div className="flex items-center gap-2">

            <span
              className="
                w-5
                h-5
                rounded-md
                bg-white/5
                border
                border-white/10
              "
            />

            <span>
              Available
            </span>

          </div>

          {/* Selected */}
          <div className="flex items-center gap-2">

            <span
              className="
                w-5
                h-5
                rounded-md
                bg-indigo-600
                border
                border-indigo-400
              "
            />

            <span>
              Selected
            </span>

          </div>

          {/* Occupied */}
          <div className="flex items-center gap-2">

            <span
              className="
                w-5
                h-5
                rounded-md
                bg-slate-800
                border
                border-slate-700
              "
            />

            <span>
              Occupied
            </span>

          </div>

        </div>

      </div>

      {/* =================================================
          BOTTOM BAR
      ================================================= */}
      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          bg-slate-950/95
          backdrop-blur-xl
          border-t
          border-white/10
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            lg:px-12
            py-4
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          {/* Seats */}
          <div
            className="
              text-center
              sm:text-left
              max-w-md
            "
          >

            <p
              className="
                text-xs
                text-slate-500
                uppercase
                tracking-wider
              "
            >
              Selected Seats
            </p>

            <p
              className="
                text-white
                font-semibold
                mt-1
                break-words
              "
            >
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "No seats selected"}
            </p>

          </div>

          {/* Count */}
          <div className="text-center">

            <p className="text-xs text-slate-500">
              Tickets
            </p>

            <p className="text-xl font-bold">
              {selectedSeats.length}
            </p>

          </div>

          {/* Amount */}
          <div className="text-center">

            <p className="text-xs text-slate-500">
              Total Amount
            </p>

            <p
              className="
                text-xl
                font-bold
                text-indigo-400
              "
            >
              ₹{totalPrice}
            </p>

          </div>

          {/* Checkout */}
          <button
            type="button"
            onClick={
              handleProceedToCheckout
            }
            className="
              w-full
              sm:w-auto
              min-w-[210px]
              px-7
              py-3.5
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-500
              text-white
              font-semibold
              transition-all
              duration-300
              shadow-lg
              shadow-indigo-600/20
              hover:scale-[1.02]
              active:scale-95
            "
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  );
};

export default SeatLayout;