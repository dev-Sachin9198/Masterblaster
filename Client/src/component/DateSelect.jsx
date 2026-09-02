import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const DateSelect = ({
  dates,
  selectedDate,
  setSelectedDate,
  selectedShows,
  selectedTime,
  setSelectedTime,
  formatDate,
  formatTime,
  movieId,
}) => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // Select Seats
  // --------------------------------------------------
  const handleSelectSeats = () => {
    if (!movieId) {
      return;
    }

    if (!selectedDate) {
      return;
    }

    if (!selectedTime?.showId) {
      return;
    }

    navigate(
      `/Movies/${movieId}/${selectedDate}?showId=${selectedTime.showId}`
    );
  };

  // --------------------------------------------------
  // Previous Date
  // --------------------------------------------------
  const handlePreviousDate = () => {
    const currentIndex =
      dates.indexOf(selectedDate);

    if (currentIndex > 0) {
      const previousDate =
        dates[currentIndex - 1];

      setSelectedDate(previousDate);
      setSelectedTime(null);
    }
  };

  // --------------------------------------------------
  // Next Date
  // --------------------------------------------------
  const handleNextDate = () => {
    const currentIndex =
      dates.indexOf(selectedDate);

    if (
      currentIndex !== -1 &&
      currentIndex < dates.length - 1
    ) {
      const nextDate =
        dates[currentIndex + 1];

      setSelectedDate(nextDate);
      setSelectedTime(null);
    }
  };

  // --------------------------------------------------
  // Date formatting
  // --------------------------------------------------
  const getDateParts = (date) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return {
        weekday: "---",
        day: "--",
        month: "---",
      };
    }

    return {
      weekday: parsed.toLocaleDateString(
        "en-IN",
        {
          weekday: "short",
        }
      ),

      day: parsed.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
        }
      ),

      month: parsed.toLocaleDateString(
        "en-IN",
        {
          month: "short",
        }
      ),
    };
  };

  return (
    <section className="w-full mt-8">

      {/* =================================================
          HEADING
      ================================================= */}
      <div className="flex items-center gap-3 mb-6">

        <CalendarDays
          className="
            w-6
            h-6
            text-indigo-400
          "
        />

        <div>

          <h2
            className="
              text-xl
              sm:text-2xl
              font-semibold
              text-white
            "
          >
            Select Date & Time
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Choose your preferred date and showtime
          </p>

        </div>

      </div>

      {/* =================================================
          DATE SELECTOR
      ================================================= */}
      <div className="relative">

        {/* LEFT */}
        <button
          type="button"
          onClick={handlePreviousDate}
          disabled={
            !dates?.length ||
            dates.indexOf(selectedDate) <= 0
          }
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-10
            w-10
            h-10
            rounded-full
            bg-slate-800
            border
            border-white/10
            text-white
            flex
            items-center
            justify-center
            hover:bg-slate-700
            disabled:opacity-30
            disabled:cursor-not-allowed
            transition
          "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* DATES */}
        <div
          className="
            flex
            gap-3
            overflow-x-auto
            px-14
            pb-3
            scrollbar-hide
          "
        >

          {dates?.map((date) => {

            const isSelected =
              selectedDate === date;

            const parts =
              getDateParts(date);

            return (
              <button
                type="button"
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={`
                  min-w-[110px]
                  sm:min-w-[125px]
                  px-5
                  py-4
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  ${
                    isSelected
                      ? `
                        bg-indigo-600
                        border-indigo-400
                        text-white
                        shadow-lg
                        shadow-indigo-500/20
                      `
                      : `
                        bg-white/5
                        border-white/10
                        text-slate-300
                        hover:bg-white/10
                      `
                  }
                `}
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    opacity-70
                  "
                >
                  {parts.weekday}
                </p>

                <p
                  className="
                    text-lg
                    font-semibold
                    mt-1
                  "
                >
                  {parts.day}
                </p>

                <p
                  className="
                    text-xs
                    mt-1
                    opacity-70
                  "
                >
                  {parts.month}
                </p>

              </button>
            );
          })}

        </div>

        {/* RIGHT */}
        <button
          type="button"
          onClick={handleNextDate}
          disabled={
            !dates?.length ||
            dates.indexOf(selectedDate) ===
              dates.length - 1
          }
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-10
            w-10
            h-10
            rounded-full
            bg-slate-800
            border
            border-white/10
            text-white
            flex
            items-center
            justify-center
            hover:bg-slate-700
            disabled:opacity-30
            disabled:cursor-not-allowed
            transition
          "
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* =================================================
          SHOW TIMES
      ================================================= */}
      {selectedDate && (
        <div className="mt-8">

          <div
            className="
              flex
              items-center
              gap-2
              mb-5
            "
          >

            <Clock3
              className="
                w-5
                h-5
                text-indigo-400
              "
            />

            <h3
              className="
                text-lg
                font-semibold
                text-white
              "
            >
              Available Showtimes
            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            {selectedShows?.length > 0 ? (

              selectedShows.map((showTime) => {

                const isSelected =
                  selectedTime?.showId ===
                  showTime.showId;

                return (
                  <button
                    type="button"
                    key={showTime.showId}
                    onClick={() =>
                      setSelectedTime(showTime)
                    }
                    className={`
                      px-5
                      py-3
                      rounded-xl
                      border
                      text-sm
                      font-medium
                      transition-all
                      duration-300
                      ${
                        isSelected
                          ? `
                            bg-indigo-600
                            border-indigo-400
                            text-white
                            shadow-lg
                            shadow-indigo-500/20
                          `
                          : `
                            bg-white/5
                            border-white/10
                            text-slate-300
                            hover:bg-white/10
                            hover:border-indigo-400/40
                          `
                      }
                    `}
                  >
                    {formatTime
                      ? formatTime(showTime.time)
                      : showTime.time}
                  </button>
                );
              })

            ) : (

              <p className="text-slate-400 text-sm">
                No shows available for this date.
              </p>

            )}

          </div>

        </div>
      )}

      {/* =================================================
          SELECTED SHOW
      ================================================= */}
      {selectedTime && (
        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-5
            p-5
            rounded-2xl
            bg-black/20
            border
            border-white/10
          "
        >

          {/* Selected */}
          <div className="w-full sm:w-auto">

            <p
              className="
                text-xs
                text-slate-400
                uppercase
                tracking-wider
              "
            >
              Selected Show
            </p>

            <p
              className="
                text-white
                font-semibold
                mt-1
              "
            >
              {formatTime
                ? formatTime(selectedTime.time)
                : selectedTime.time}
            </p>

            <p
              className="
                text-xs
                text-slate-500
                mt-1
              "
            >
              Show ID: {selectedTime.showId}
            </p>

          </div>

          {/* Select Seats */}
          <button
            type="button"
            onClick={handleSelectSeats}
            className="
              w-full
              sm:w-auto
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
            Select Seats
          </button>

        </div>
      )}

    </section>
  );
};

export default DateSelect;