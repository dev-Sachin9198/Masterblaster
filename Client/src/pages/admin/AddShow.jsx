import { useState } from "react";
import toast from "react-hot-toast";

import { PlusSquare } from "lucide-react";

import { dummyShowsData } from "../../assets/assets";
import { addShow } from "../../utils/showStorage";

// ==================================================
// Add Show
// ==================================================
const AddShow = () => {
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");

  // ------------------------------------------------
  // Submit
  // ------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMovieId) {
      toast.error("Please select a movie.");
      return;
    }

    if (!date || !time) {
      toast.error("Please select a date and time.");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    const movie = dummyShowsData.find(
      (item) => String(item.id) === String(selectedMovieId)
    );

    if (!movie) {
      toast.error("Selected movie could not be found.");
      return;
    }

    const dateTimeIso = new Date(
      `${date}T${time}:00`
    ).toISOString();

    const newShow = addShow({
      movie,
      dateTimeIso,
      price,
    });

    if (!newShow) {
      toast.error("Could not add show. Please try again.");
      return;
    }

    toast.success(`Show added for "${movie.title}"`);

    setSelectedMovieId("");
    setDate("");
    setTime("");
    setPrice("");
  };

  // ==================================================
  // RETURN
  // ==================================================
  return (
    <div className="max-w-xl">

      <h1 className="text-2xl sm:text-3xl font-bold mb-8">
        Add Show
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Movie */}
        <div>

          <label className="block text-sm text-slate-400 mb-2">
            Movie
          </label>

          <select
            value={selectedMovieId}
            onChange={(e) =>
              setSelectedMovieId(e.target.value)
            }
            className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-white/5
              border
              border-white/10
              text-white
              outline-none
              focus:border-indigo-500
            "
          >
            <option value="" className="bg-slate-900">
              Select a movie
            </option>

            {dummyShowsData.map((movie) => (
              <option
                key={movie.id}
                value={movie.id}
                className="bg-slate-900"
              >
                {movie.title}
              </option>
            ))}
          </select>

        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-white
                outline-none
                focus:border-indigo-500
              "
            />

          </div>

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-white
                outline-none
                focus:border-indigo-500
              "
            />

          </div>

        </div>

        {/* Price */}
        <div>

          <label className="block text-sm text-slate-400 mb-2">
            Ticket Price (₹)
          </label>

          <input
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 180"
            className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-white/5
              border
              border-white/10
              text-white
              outline-none
              focus:border-indigo-500
              placeholder:text-slate-600
            "
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-500
            transition
            font-semibold
          "
        >
          <PlusSquare className="w-5 h-5" />
          Add Show
        </button>

      </form>

    </div>
  );
};

export default AddShow;
