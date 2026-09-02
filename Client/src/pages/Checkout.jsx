import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Ticket,
} from "lucide-react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  dummyShowsData,
  dummyDateTimeData,
} from "../assets/assets";

const Checkout = () => {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  // ==================================================
  // URL DATA
  // ==================================================
  const movieId =
    searchParams.get("movieId");

  const showId =
    searchParams.get("showId");

  const date =
    searchParams.get("date");

  const seatsParam =
    searchParams.get("seats");

  // ==================================================
  // MOVIE
  // ==================================================
  const movie =
    dummyShowsData.find(
      (item) =>
        String(item.id) ===
        String(movieId)
    );

  // ==================================================
  // SHOW
  // ==================================================
  const show =
    date && showId
      ? dummyDateTimeData?.[date]?.find(
          (item) =>
            String(item.showId) ===
            String(showId)
        )
      : null;

  // ==================================================
  // SEATS
  // ==================================================
  const selectedSeats = seatsParam
    ? seatsParam
        .split(",")
        .filter(Boolean)
    : [];

  // ==================================================
  // PRICE
  // ==================================================
  const ticketPrice = 180;

  const totalAmount =
    selectedSeats.length *
    ticketPrice;

  // ==================================================
  // TIME
  // ==================================================
  const formattedTime = show?.time
    ? new Date(
        show.time
      ).toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      )
    : "N/A";

  // ==================================================
  // DATE
  // ==================================================
  const formattedDate = date
    ? new Date(
        `${date}T00:00:00`
      ).toLocaleDateString(
        "en-IN",
        {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "N/A";

  // ==================================================
  // INVALID
  // ==================================================
  if (
    !movie ||
    !show ||
    selectedSeats.length === 0
  ) {

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
            🎟️
          </div>

          <h1
            className="
              text-3xl
              font-bold
              mb-3
            "
          >
            Invalid Checkout
          </h1>

          <p
            className="
              text-slate-400
              mb-6
              max-w-md
            "
          >
            Movie, show or selected seat
            information is missing.
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
  // PAYMENT
  // ==================================================
  const handlePayment = () => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      toast.error(
        "Please login before payment."
      );

      return;
    }

    /*
      Abhi dummy payment hai.

      Real project me yahan:
      Razorpay / Stripe / backend API
      connect karna hai.
    */

    toast.success(
      "Payment successful! Booking confirmed."
    );

    // Demo booking success
    setTimeout(() => {

      navigate("/my-booking");

    }, 1200);
  };

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
          max-w-6xl
          mx-auto
          px-5
          sm:px-8
          lg:px-12
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="mb-8">

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
              mb-6
            "
          >

            <ArrowLeft className="w-5 h-5" />

            Back to Seat Layout

          </button>

          <div className="flex items-center gap-3">

            <Ticket
              className="
                w-7
                h-7
                text-indigo-400
              "
            />

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
              "
            >
              Checkout
            </h1>

          </div>

          <p
            className="
              text-slate-400
              mt-2
            "
          >
            Review your booking before payment.
          </p>

        </div>

        {/* =================================================
            GRID
        ================================================= */}
        <div
          className="
            grid
            lg:grid-cols-[1.4fr_0.8fr]
            gap-8
          "
        >

          {/* =================================================
              LEFT
          ================================================= */}
          <div className="space-y-6">

            {/* Movie Card */}
            <div
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
                  flex
                  flex-col
                  sm:flex-row
                  gap-5
                "
              >

                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="
                    w-full
                    sm:w-36
                    h-52
                    sm:h-52
                    object-cover
                    rounded-xl
                  "
                />

                <div>

                  <p
                    className="
                      text-xs
                      text-indigo-400
                      uppercase
                      tracking-wider
                      mb-2
                    "
                  >
                    Movie
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    {movie.title}
                  </h2>

                  <p
                    className="
                      text-slate-400
                      mt-3
                      text-sm
                      leading-6
                    "
                  >
                    {movie.overview}
                  </p>

                </div>

              </div>

            </div>

            {/* Show Details */}
            <div
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-6
              "
            >

              <h2
                className="
                  text-xl
                  font-semibold
                  mb-5
                "
              >
                Show Details
              </h2>

              <div
                className="
                  grid
                  sm:grid-cols-3
                  gap-4
                "
              >

                {/* Date */}
                <div
                  className="
                    p-4
                    rounded-xl
                    bg-black/20
                    border
                    border-white/5
                  "
                >

                  <CalendarDays
                    className="
                      w-5
                      h-5
                      text-indigo-400
                      mb-3
                    "
                  />

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    DATE
                  </p>

                  <p
                    className="
                      text-sm
                      font-semibold
                      mt-1
                    "
                  >
                    {formattedDate}
                  </p>

                </div>

                {/* Time */}
                <div
                  className="
                    p-4
                    rounded-xl
                    bg-black/20
                    border
                    border-white/5
                  "
                >

                  <Clock3
                    className="
                      w-5
                      h-5
                      text-indigo-400
                      mb-3
                    "
                  />

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    TIME
                  </p>

                  <p
                    className="
                      text-sm
                      font-semibold
                      mt-1
                    "
                  >
                    {formattedTime}
                  </p>

                </div>

                {/* Hall */}
                <div
                  className="
                    p-4
                    rounded-xl
                    bg-black/20
                    border
                    border-white/5
                  "
                >

                  <MapPin
                    className="
                      w-5
                      h-5
                      text-indigo-400
                      mb-3
                    "
                  />

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    VENUE
                  </p>

                  <p
                    className="
                      text-sm
                      font-semibold
                      mt-1
                    "
                  >
                    Cinema Hall
                  </p>

                </div>

              </div>

            </div>

            {/* Seats */}
            <div
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-6
              "
            >

              <h2
                className="
                  text-xl
                  font-semibold
                  mb-5
                "
              >
                Selected Seats
              </h2>

              <div className="flex flex-wrap gap-3">

                {selectedSeats.map(
                  (seat) => (

                    <div
                      key={seat}
                      className="
                        px-5
                        py-3
                        rounded-xl
                        bg-indigo-600
                        border
                        border-indigo-400
                        font-semibold
                      "
                    >
                      {seat}
                    </div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}
          <div>

            <div
              className="
                lg:sticky
                lg:top-28
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-6
              "
            >

              <h2
                className="
                  text-xl
                  font-semibold
                  mb-6
                "
              >
                Booking Summary
              </h2>

              {/* Movie */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  pb-5
                  border-b
                  border-white/10
                "
              >

                <div>

                  <p className="text-slate-400 text-sm">
                    Movie
                  </p>

                  <p
                    className="
                      font-semibold
                      mt-1
                    "
                  >
                    {movie.title}
                  </p>

                </div>

              </div>

              {/* Tickets */}
              <div
                className="
                  flex
                  justify-between
                  py-5
                  border-b
                  border-white/10
                "
              >

                <span className="text-slate-400">
                  Tickets
                </span>

                <span className="font-semibold">
                  {selectedSeats.length}
                </span>

              </div>

              {/* Seats */}
              <div
                className="
                  flex
                  justify-between
                  py-5
                  border-b
                  border-white/10
                  gap-5
                "
              >

                <span className="text-slate-400">
                  Seats
                </span>

                <span
                  className="
                    font-semibold
                    text-right
                  "
                >
                  {selectedSeats.join(", ")}
                </span>

              </div>

              {/* Price */}
              <div
                className="
                  flex
                  justify-between
                  py-5
                  border-b
                  border-white/10
                "
              >

                <span className="text-slate-400">
                  Price / Ticket
                </span>

                <span className="font-semibold">
                  ₹{ticketPrice}
                </span>

              </div>

              {/* Total */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  pt-6
                "
              >

                <div>

                  <p className="text-slate-400 text-sm">
                    Total Amount
                  </p>

                  <p
                    className="
                      text-3xl
                      font-bold
                      text-indigo-400
                      mt-1
                    "
                  >
                    ₹{totalAmount}
                  </p>

                </div>

              </div>

              {/* Pay */}
              <button
                type="button"
                onClick={handlePayment}
                className="
                  w-full
                  mt-6
                  py-4
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  via-purple-600
                  to-pink-600
                  hover:opacity-90
                  text-white
                  font-bold
                  transition
                  hover:scale-[1.02]
                  active:scale-95
                "
              >
                Pay ₹{totalAmount}
              </button>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  mt-4
                  text-xs
                  text-slate-500
                "
              >

                <CheckCircle2
                  className="w-4 h-4"
                />

                Secure booking

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;