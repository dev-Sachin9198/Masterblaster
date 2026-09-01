import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Heart,
  PlayCircle,
  Star,
  Ticket,
  Users,
} from "lucide-react";

import {
  dummyShowsData,
  dummyDateTimeData,
} from "../assets/assets";

// DateSelect component
import DateSelect from "../component/DateSelect";


// -----------------------------
// Format Runtime
// -----------------------------
const timeFormat = (minutes) => {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
};


// -----------------------------
// Format Date
// -----------------------------
const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};


// -----------------------------
// Format Time
// -----------------------------
const formatTime = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


export default function MoviesDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);


  // -----------------------------
  // Get Movie
  // -----------------------------
  useEffect(() => {
    const movie = dummyShowsData.find(
      (movie) => movie.id === parseInt(id)
    );

    if (movie) {
      setShow({
        movie,
        datetime: dummyDateTimeData,
      });

      const firstDate = Object.keys(dummyDateTimeData)[0];

      setSelectedDate(firstDate);
    } else {
      setShow(null);
    }
  }, [id]);


  // -----------------------------
  // Loading / Not Found
  // -----------------------------
  if (!show) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">

        <div className="text-center">

          <p className="text-xl font-semibold">
            Movie not found
          </p>

          <button
            onClick={() => navigate("/movies")}
            className="
              mt-5
              px-6
              py-3
              rounded-full
              bg-[#f84565]
              hover:bg-[#d63854]
              transition
            "
          >
            Browse Movies
          </button>

        </div>

      </div>
    );
  }


  const movie = show.movie;

  const dates = Object.keys(show.datetime);


  const selectedShows =
    selectedDate && show.datetime[selectedDate]
      ? show.datetime[selectedDate]
      : [];


  // -----------------------------
  // Book Ticket
  // -----------------------------
  const handleBooking = (showTime) => {
    setSelectedTime(showTime);

    navigate(
      `/seat-layout?movieId=${movie.id}&showId=${showTime.showId}`
    );
  };


  // -----------------------------
  // Scroll Booking
  // -----------------------------
  const scrollToBooking = () => {
    document
      .getElementById("booking")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  return (
    <div className="min-h-screen bg-[#09090B] text-white">


      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative min-h-[720px] overflow-hidden">


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


        {/* Dark Overlay */}

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
            min-h-[720px]
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
                  h-[410px]
                  object-cover
                  rounded-2xl
                  shadow-2xl
                  border
                  border-white/10
                "
              />

            </div>


            {/* Movie Information */}

            <div className="max-w-4xl">


              {/* Back */}

              <button
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

              <p className="
                uppercase
                text-[#f84565]
                text-sm
                font-semibold
                tracking-wider
              ">
                {movie.original_language || "EN"}
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
                <p className="
                  text-gray-300
                  italic
                  mt-4
                  text-lg
                ">
                  "{movie.tagline}"
                </p>
              )}


              {/* Rating / Date / Runtime */}

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
                    {movie.vote_average.toFixed(1)}
                  </span>

                  <span className="text-sm">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>

                </div>


                <span>•</span>


                {/* Release */}

                <div className="flex items-center gap-2">

                  <CalendarDays className="w-4 h-4" />

                  {new Date(
                    movie.release_date
                  ).getFullYear()}

                </div>


                <span>•</span>


                {/* Runtime */}

                <div className="flex items-center gap-2">

                  <Clock3 className="w-4 h-4" />

                  {timeFormat(movie.runtime)}

                </div>

              </div>


              {/* Genres */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                  mt-6
                "
              >

                {movie.genres.map((genre) => (
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
                {movie.overview}
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

                {/* Book */}

                <button>
                  <a
  href="#dateSelect"
  className="
    inline-block
    px-10 py-3
    text-sm
    font-semibold
    text-white
    rounded-md
    cursor-pointer
    bg-gradient-to-r
    from-purple-600
    via-pink-500
    to-red-500
    bg-[length:200%_200%]
    animate-gradient
    shadow-lg
    shadow-purple-500/30
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-xl
    hover:shadow-pink-500/40
    active:scale-95
  "
>
  Buy Tickets
</a>
                  
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
                  onClick={() =>
                    setIsFavorite(!isFavorite)
                  }
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


      {/* =====================================================
          CAST SECTION
      ====================================================== */}

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

          <div>

            <p className="text-2xl font-semibold">
              Your Favorite Stars
            </p>

          </div>

          <Users className="text-[#f84565]" />

        </div>

<div className="
  flex
  gap-6
  overflow-x-auto
  pb-5
  no-scrollbar
">
  {movie.casts?.slice(0, 9).map((cast, index) => (
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

      <p className="
        text-sm
        font-medium
        mt-3
        truncate
      ">
        {cast.name}
      </p>
    </div>
  ))}
</div>

      </section>


      {/* =====================================================
          DATE SELECT / BOOKING SECTION
      ====================================================== */}

      <DateSelect
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedShows={selectedShows}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        formatDate={formatDate}
        formatTime={formatTime}
        handleBooking={handleBooking}
        dateTime={show.datetime}
      />

    </div>
  );
}


