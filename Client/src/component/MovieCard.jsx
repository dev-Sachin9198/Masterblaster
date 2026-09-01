import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Convert minutes into hours and minutes
  const timeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
  };

  const handleMovieClick = () => {
    navigate(`/movies/${movie.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleMovieClick}
      className="
        flex flex-col justify-between
        p-3
        bg-gray-800
        rounded-2xl
        hover:-translate-y-1
        transition duration-300
        w-60
        cursor-pointer
      "
    >
      {/* Movie Image */}
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-lg h-52 w-full object-cover"
      />

      {/* Movie Title */}
      <p className="font-semibold mt-2 truncate">
        {movie.title}
      </p>

      {/* Movie Details */}
      <p className="text-sm text-gray-400 mt-2">
        {new Date(movie.release_date).getFullYear()}
        {" • "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}
        {" • "}
        {timeFormat(movie.runtime)}
      </p>

      {/* Bottom */}
      <div className="flex items-center justify-between mt-4 pb-3">

        {/* Buy Tickets */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleMovieClick();
          }}
          className="
            px-4 py-2
            text-xs
            bg-primary
            hover:bg-primary-dull
            transition
            rounded-full
            font-medium
            cursor-pointer
          "
        >
          Buy Tickets
        </button>

        {/* Rating */}
        <p className="flex items-center gap-1 text-sm text-gray-400">
          <StarIcon className="h-4 w-4 text-primary fill-primary" />

          {movie.vote_average.toFixed(1)}
        </p>

      </div>
    </div>
  );
};

export default MovieCard;

