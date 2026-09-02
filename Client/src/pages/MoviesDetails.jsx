import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Heart,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

import {
  dummyShowsData,
  dummyDateTimeData,
} from "../assets/assets";

import DateSelect from "../component/DateSelect";
import MovieCard from "../component/MovieCard";
import Loading from "../component/Loading";

// --------------------------------------------------
// Format Runtime
// --------------------------------------------------
const timeFormat = (minutes) => {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return `${hours}h ${mins}m`;
};

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
// Movies Details
// ==================================================
export default function MoviesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);

  // ------------------------------------------------
  // Get Movie
  // ------------------------------------------------
  useEffect(() => {
    setLoading(true);

    const movieId = Number(id);

    const movie = dummyShowsData.find(
      (item) => Number(item.id) === movieId
    );

    const timer = setTimeout(() => {
      if (movie) {
        setShow({
          movie,
          datetime: dummyDateTimeData,
        });

        const availableDates = Object.keys(
          dummyDateTimeData || {}
        );

        if (availableDates.length > 0) {
          setSelectedDate(availableDates[0]);
        }
      } else {
        setShow(null);
      }

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------
  if (loading) {
    return <Loading />;
  }

  // ------------------------------------------------
  // Movie Not Found
  // ------------------------------------------------
  if (!show) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center px-6">
        <div className="text-center">

          <div className="text-6xl mb-5">
            🎬
          </div>

          <h1 className="text-2xl font-semibold">
            Movie Not Found
          </h1>

          <p className="text-gray-400 mt-2">
            The movie you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="
              mt-6
              px-7
              py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              via-pink-500
              to-red-500
              hover:scale-105
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

  const movie = show.movie;

  const dates = Object.keys(
    show.datetime || {}
  );

  const selectedShows =
    selectedDate &&
    show.datetime?.[selectedDate]
      ? show.datetime[selectedDate]
      : [];

  // ------------------------------------------------
  // Scroll Booking
  // ------------------------------------------------
  const scrollToBooking = () => {
    const bookingSection =
      document.getElementById("dateSelect");

    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==================================================
  // RETURN
  // ==================================================
  return (
    <div className="min-h-screen bg-[#09090B] text-white">

      {/* =================================================
          HERO
      ================================================= */}
      <section className="relative overflow-hidden">

        {/* Background */}
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            opacity-40
            scale-105
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#09090B]
            via-[#09090B]/80
            to-[#09090B]/30
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#09090B]
            via-transparent
            to-[#09090B]/30
          "
        />

        {/* Content */}
        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-6
            md:px-10
            lg:px-16
            pt-32
            pb-20
            flex
            items-end
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[280px_1fr]
              gap-8
              items-end
              w-full
            "
          >

            {/* Poster */}
            <div className="hidden md:block">

              <img
                src={movie.poster_path}
                alt={movie.title}
                className="
                  w-full
                  object-cover
                  rounded-2xl
                  shadow-2xl
                  border
                  border-white/10
                "
              />

            </div>

            {/* Information */}
            <div className="max-w-4xl">

              {/* Back */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-300
                  hover:text-white
                  transition
                  mb-8
                "
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              {/* Language */}
              <p
                className="
                  uppercase
                  text-[#f84565]
                  text-sm
                  font-semibold
                  tracking-wider
                "
              >
                {movie.original_language || "ENGLISH"}
              </p>

              {/* Title */}
              <h1
                className="
                  text-4xl
                  md:text-6xl
                  lg:text-7xl
                  font-bold
                  leading-tight
                  mt-2
                "
              >
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p
                  className="
                    text-gray-300
                    italic
                    mt-4
                    text-lg
                  "
                >
                  "{movie.tagline}"
                </p>
              )}

              {/* Meta */}
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-5
                  mt-6
                  text-gray-300
                "
              >

                {/* Rating */}
                <div className="flex items-center gap-2">

                  <Star
                    className="
                      w-5
                      h-5
                      text-[#f84565]
                      fill-[#f84565]
                    "
                  />

                  <span className="font-semibold text-white">
                    {Number(
                      movie.vote_average || 0
                    ).toFixed(1)}
                  </span>

                  <span className="text-sm">
                    (
                    {Number(
                      movie.vote_count || 0
                    ).toLocaleString()}
                    {" "}votes)
                  </span>

                </div>

                <span>•</span>

                {/* Release */}
                <div className="flex items-center gap-2">

                  <CalendarDays className="w-4 h-4" />

                  {movie.release_date
                    ? new Date(
                        movie.release_date
                      ).getFullYear()
                    : "N/A"}

                </div>

                <span>•</span>

                {/* Runtime */}
                <div className="flex items-center gap-2">

                  <Clock3 className="w-4 h-4" />

                  {timeFormat(movie.runtime)}

                </div>

              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mt-6">

                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      px-4
                      py-1.5
                      rounded-full
                      bg-white/10
                      border
                      border-white/10
                      text-sm
                      text-gray-300
                    "
                  >
                    {genre.name}
                  </span>
                ))}

              </div>

              {/* Overview */}
              <p
                className="
                  mt-7
                  max-w-3xl
                  text-gray-300
                  leading-7
                  text-sm
                  md:text-base
                "
              >
                {movie.overview ||
                  "No movie description available."}
              </p>

              {/* Buttons */}
              <div
                className="
                  flex
                  flex-wrap
                  gap-4
                  mt-8
                "
              >

                {/* Buy Tickets */}
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="
                    px-10
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    rounded-xl
                    cursor-pointer
                    bg-gradient-to-r
                    from-purple-600
                    via-pink-500
                    to-red-500
                    shadow-lg
                    shadow-purple-500/30
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-xl
                    active:scale-95
                  "
                >
                  Buy Tickets
                </button>

                {/* Trailer */}
                {movie.trailer && (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      items-center
                      gap-2
                      px-7
                      py-3
                      rounded-full
                      bg-white/10
                      hover:bg-white/20
                      border
                      border-white/10
                      transition
                      font-semibold
                    "
                  >
                    <PlayCircle className="w-5 h-5" />
                    Watch Trailer
                  </a>
                )}

                {/* Favorite */}
                <button
                  type="button"
                  onClick={() =>
                    setIsFavorite((prev) => !prev)
                  }
                  aria-label="Add to favorites"
                  className={`
                    p-3
                    rounded-full
                    border
                    transition
                    ${
                      isFavorite
                        ? "bg-[#f84565] border-[#f84565]"
                        : "bg-white/10 border-white/10 hover:bg-white/20"
                    }
                  `}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={
                      isFavorite
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CAST
      ================================================= */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          lg:px-16
          pt-16
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-7
          "
        >

          <p className="text-2xl font-semibold">
            Your Favorite Stars
          </p>

          <Users className="text-[#f84565]" />

        </div>

        <div
          className="
            flex
            gap-6
            overflow-x-auto
            pb-5
            scrollbar-hide
          "
        >

          {movie.casts?.slice(0, 9).map(
            (cast, index) => (
              <div
                key={`${cast.name}-${index}`}
                className="
                  min-w-[100px]
                  text-center
                  group
                "
              >

                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="
                    w-24
                    h-24
                    rounded-full
                    object-cover
                    mx-auto
                    border
                    border-white/10
                    group-hover:border-[#f84565]
                    transition
                  "
                />

                <p
                  className="
                    text-sm
                    font-medium
                    mt-3
                    truncate
                  "
                >
                  {cast.name}
                </p>

              </div>
            )
          )}

        </div>

      </section>

      {/* =================================================
          DATE SELECT
      ================================================= */}
      <section
        id="dateSelect"
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          lg:px-16
          py-10
          scroll-mt-20
        "
      >

        <DateSelect
          movieId={movie.id}
          dates={dates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedShows={selectedShows}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          formatDate={formatDate}
          formatTime={formatTime}
          dateTime={show.datetime}
        />

      </section>

      {/* =================================================
          YOU MAY ALSO LIKE
      ================================================= */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          lg:px-16
          pb-20
        "
      >

        <p
          className="
            text-2xl
            font-semibold
            mt-12
            mb-8
          "
        >
          You May Also Like
        </p>

        <div
          className="
            flex
            flex-wrap
            max-sm:justify-center
            gap-8
          "
        >

          {dummyShowsData
            .filter(
              (item) => item.id !== movie.id
            )
            .slice(0, 4)
            .map((item) => (
              <MovieCard
                key={item.id}
                movie={item}
              />
            ))}

        </div>

        <div className="flex justify-center mt-20">

          <button
            type="button"
            onClick={() => navigate("/movies")}
            className="
              px-10
              py-3
              text-sm
              font-semibold
              text-white
              rounded-xl
              cursor-pointer
              bg-gradient-to-r
              from-purple-600
              via-pink-500
              to-red-500
              hover:scale-105
              transition
            "
          >
            Show More
          </button>

        </div>

      </section>

    </div>
  );
}