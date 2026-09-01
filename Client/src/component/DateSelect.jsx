import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";

const DateSelect = ({
  dates,
  selectedDate,
  setSelectedDate,
  selectedShows,
  selectedTime,
  setSelectedTime,
  formatDate,
  formatTime,
  handleBooking,
  dateTime,
}) => {
  return (
    <section
      id="booking"
      className="
        max-w-7xl
        mx-auto
        px-6
        md:px-10
        lg:px-16
        py-20
      "
    >
      {/* Heading */}
      <div className="mb-8">
        <p className="text-2xl md:text-3xl font-semibold">
          Choose Date & Time
        </p>

        <p className="text-gray-400 mt-2">
          Select your preferred date and showtime.
        </p>
      </div>

      {/* Booking Box */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-[#f84565]/20
          bg-[#f84565]/5
          p-6
          md:p-8
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            -top-24
            -left-24
            w-60
            h-60
            rounded-full
            bg-[#f84565]/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -right-24
            w-60
            h-60
            rounded-full
            bg-[#f84565]/10
            blur-3xl
          "
        />

        <div className="relative z-10">

          {/* Dates */}
          <div className="flex items-center gap-4">

            {/* Previous */}
            <button
              className="
                hidden
                md:flex
                p-2
                rounded-full
                bg-white/5
                hover:bg-white/10
                transition
              "
            >
              <ChevronLeft />
            </button>

            {/* Date List */}
            <div
              className="
                flex
                gap-3
                overflow-x-auto
                no-scrollbar
                flex-1
              "
            >
              {dates.map((date) => {

                const isActive = selectedDate === date;

                return (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    className={`
                      min-w-[100px]
                      px-4
                      py-3
                      rounded-xl
                      border
                      transition

                      ${
                        isActive
                          ? "bg-[#f84565] border-[#f84565]"
                          : "bg-white/5 border-white/10 hover:border-[#f84565]/50"
                      }
                    `}
                  >
                    <CalendarDays
                      className="
                        w-5
                        h-5
                        mx-auto
                        mb-2
                      "
                    />

                    <p className="text-sm font-medium">
                      {formatDate(date)}
                    </p>

                    <p className="text-xs mt-1 opacity-70">
                      {dateTime[date].length} Shows
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Next */}
            <button
              className="
                hidden
                md:flex
                p-2
                rounded-full
                bg-white/5
                hover:bg-white/10
                transition
              "
            >
              <ChevronRight />
            </button>

          </div>


          {/* Selected Date */}
          {selectedDate && (
            <div className="mt-10">

              {/* Showtime Heading */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-5
                "
              >
                <Clock3 className="w-5 h-5 text-[#f84565]" />

                <h3 className="font-semibold">
                  Available Showtimes
                </h3>
              </div>


              {/* Showtimes */}
              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  md:grid-cols-4
                  lg:grid-cols-6
                  gap-3
                "
              >
                {selectedShows.map((showTime) => {

                  const active =
                    selectedTime?.showId === showTime.showId;

                  return (
                    <button
                      key={showTime.showId}
                      onClick={() =>
                        setSelectedTime(showTime)
                      }
                      className={`
                        px-4
                        py-3
                        rounded-xl
                        border
                        transition

                        ${
                          active
                            ? "bg-[#f84565] border-[#f84565]"
                            : "bg-white/5 border-white/10 hover:border-[#f84565]"
                        }
                      `}
                    >
                      {formatTime(showTime.time)}
                    </button>
                  );
                })}
              </div>


              {/* Continue / Select Seats */}
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
                  <div>
                    <p className="text-gray-400 text-sm">
                      Selected Show
                    </p>

                    <p className="font-semibold mt-1">
                      {formatDate(selectedDate)}
                      {" • "}
                      {formatTime(selectedTime.time)}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleBooking(selectedTime)
                    }
                    className="
                      w-full
                      sm:w-auto
                      px-8
                      py-3
                      rounded-full
                      bg-[#f84565]
                      hover:bg-[#d63854]
                      transition
                      font-semibold
                      active:scale-95
                    "
                  >
                    Select Seats
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default DateSelect;

