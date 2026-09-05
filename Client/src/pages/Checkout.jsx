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

import { useUser } from "@clerk/react";

import {
  dummyShowsData,
  dummyDateTimeData,
} from "../assets/assets";

import { saveBooking } from "../utils/bookingStorage";

// ==================================================
// Razorpay Config
// ==================================================
const RAZORPAY_CHECKOUT_SRC =
  "https://checkout.razorpay.com/v1/checkout.js";

// Backend URL — set VITE_API_URL in your frontend .env
// for production; falls back to local dev server.
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// Loads the Razorpay checkout script once and reuses it
// if the user opens checkout more than once.
const loadRazorpayScript = () => {
  return new Promise((resolve) => {

    if (
      document.querySelector(
        `script[src="${RAZORPAY_CHECKOUT_SRC}"]`
      )
    ) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src = RAZORPAY_CHECKOUT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);

  });
};

const Checkout = () => {
  const navigate = useNavigate();

  const { isSignedIn, user } = useUser();

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
  const ticketPrice = 149;

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
  // PAYMENT (Razorpay)
  // ==================================================
  const handlePayment = async () => {

    if (!isSignedIn) {

      toast.error(
        "Please login before payment."
      );

      return;
    }

    // 1. Load Razorpay's checkout script
    const scriptLoaded =
      await loadRazorpayScript();

    if (!scriptLoaded) {

      toast.error(
        "Failed to load payment gateway. Check your internet connection."
      );

      return;
    }

    try {

      // 2. Ask our backend to create a Razorpay order
      const orderRes = await fetch(
        `${API_BASE_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount,
            bookingInfo: {
              movie: movie.title,
              seats: selectedSeats.join(","),
              showId: show.showId,
            },
          }),
        }
      );

      const orderData = await orderRes.json();

      if (!orderData.success) {

        toast.error(
          "Could not initiate payment. Please try again."
        );

        return;
      }

      // 3. Open Razorpay Checkout popup
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "MasterBlaster Movies",
        description: `${movie.title} — ${selectedSeats.join(", ")}`,
        image: movie.poster_path,
        order_id: orderData.order.id,

        // Runs when payment succeeds on Razorpay's side
        handler: async (response) => {

          try {

            // 4. Ask backend to verify the payment signature
            const verifyRes = await fetch(
              `${API_BASE_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {

              toast.error(
                "Payment verification failed. If money was deducted, contact support."
              );

              return;
            }

            // 5. Only after verified payment, save the booking
            const booking = saveBooking(user.id, {
              movie: {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                runtime: movie.runtime,
              },
              show: {
                showId: show.showId,
                date,
                time: show.time,
              },
              bookedSeats: selectedSeats,
              amount: totalAmount,
              paymentId: response.razorpay_payment_id,
            });

            if (!booking) {

              toast.error(
                "Payment succeeded but booking could not be saved."
              );

              return;
            }

            toast.success(
              "Payment successful! Booking confirmed."
            );

            setTimeout(() => {

              navigate("/my-booking");

            }, 1200);

          } catch (err) {

            console.error(
              "Verification error:",
              err
            );

            toast.error(
              "Something went wrong while verifying your payment."
            );
          }
        },

        prefill: {
          name: user?.fullName || "",
          email:
            user?.primaryEmailAddress
              ?.emailAddress || "",
        },

        theme: {
          color: "#4f46e5",
        },

        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled.");
          },
        },
      };

      const razorpayInstance =
        new window.Razorpay(options);

      razorpayInstance.on(
        "payment.failed",
        (response) => {
          toast.error(
            `Payment failed: ${response.error.description}`
          );
        }
      );

      razorpayInstance.open();

    } catch (err) {

      console.error("Payment error:", err);

      toast.error(
        "Something went wrong. Please try again."
      );
    }
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