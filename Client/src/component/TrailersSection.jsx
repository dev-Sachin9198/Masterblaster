import { useState } from "react";
import { dummyTrailers } from "../assets/assets";

function TrailersSection() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <section className="px-6 md:px-16 lg:px-36 py-16 bg-[#09090B] text-white">

      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-8">
        Trailers
      </h2>

      {/* Main Trailer */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">

          <iframe
            key={currentTrailer.videoUrl}
            src={currentTrailer.videoUrl.replace(
              "watch?v=",
              "embed/"
            )}
            title="Movie Trailer"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>
      </div>

      {/* Trailer Thumbnails */}
      <div className="flex gap-5 mt-8 overflow-x-auto pb-3">

        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            onClick={() => setCurrentTrailer(trailer)}
            className={`
              w-56
              rounded-xl
              overflow-hidden
              cursor-pointer
              border-2
              transition
              ${
                currentTrailer === trailer
                  ? "border-primary scale-105"
                  : "border-transparent hover:border-gray-500"
              }
            `}
          >
            <img
              src={trailer.image}
              alt={`Trailer ${index + 1}`}
              className="w-full h-32 object-cover"
            />
          </div>
        ))}

      </div>

    </section>
  );
}

export default TrailersSection;

