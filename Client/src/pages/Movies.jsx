import {dummyShowsData} from "../assets/assets";
import MovieCard from "../component/MovieCard";
import BlurCircle from "../component/BlurCircle";

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle className="top-150 left-0"/>
      <BlurCircle className="bottom-50 right-50"/>
      <h1 className="text-lg font-medium my-4">
        Now Showing
      </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-26">
    {dummyShowsData.map((movie) => (
      <MovieCard movie={movie} key={movie.id} />
    ))}
    </div>
    </div>
  ) : (
    <div>No movies available</div>
  );
};

export default Movies;
