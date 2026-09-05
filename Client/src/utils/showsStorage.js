// src/utils/showsStorage.js
//
// The demo data (dummyDateTimeData) is global — the same set of dates
// and times applies to every movie. Admin-added shows, on the other
// hand, are tied to one specific movie. This file merges the two so
// that a show the admin adds actually becomes bookable on the real
// movie/seat-selection/checkout pages, not just visible in the admin
// panel.

const ADMIN_SHOWS_KEY = "adminShows";

const readAdminShows = () => {
  try {
    const raw = localStorage.getItem(ADMIN_SHOWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse admin shows:", err);
    return [];
  }
};

// Default ticket price used for the pre-existing dummy show times,
// since that demo data has no price attached to it.
export const DEFAULT_TICKET_PRICE = 180;

// ==================================================
// Get all admin-added shows (used by the admin panel)
// ==================================================
export const getAdminShows = () => {
  return readAdminShows()
    .slice()
    .sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
};

// ==================================================
// Add a Show
// ==================================================
export const addShow = ({ movieId, date, time, price }) => {
  if (!movieId || !date || !time || !price || Number(price) <= 0) {
    return null;
  }

  const shows = readAdminShows();

  // ISO datetime built from the date + time inputs
  const isoTime = new Date(`${date}T${time}:00`).toISOString();

  const newShow = {
    showId: `admin_${Date.now()}`,
    movieId: String(movieId),
    date,
    time: isoTime,
    price: Number(price),
    createdAt: new Date().toISOString(),
  };

  shows.push(newShow);

  localStorage.setItem(
    ADMIN_SHOWS_KEY,
    JSON.stringify(shows)
  );

  return newShow;
};

// ==================================================
// Delete a Show
// ==================================================
export const deleteShow = (showId) => {
  const shows = readAdminShows().filter(
    (show) => show.showId !== showId
  );

  localStorage.setItem(
    ADMIN_SHOWS_KEY,
    JSON.stringify(shows)
  );
};

// ==================================================
// Get all dates available for a movie
// (dummy dates apply to every movie + any admin dates
// added specifically for this movie)
// ==================================================
export const getDatesForMovie = (movieId, dummyDateTimeData) => {
  const dummyDates = Object.keys(dummyDateTimeData || {});

  const adminDates = readAdminShows()
    .filter(
      (show) => String(show.movieId) === String(movieId)
    )
    .map((show) => show.date);

  return Array.from(
    new Set([...dummyDates, ...adminDates])
  ).sort();
};

// ==================================================
// Get all shows for a movie on a specific date
// (merged: dummy global shows + admin shows for this movie)
// ==================================================
export const getShowsForMovieDate = (
  movieId,
  date,
  dummyDateTimeData
) => {
  const dummyShows = (
    dummyDateTimeData?.[date] || []
  ).map((show) => ({
    showId: show.showId,
    time: show.time,
    price: DEFAULT_TICKET_PRICE,
    isAdminShow: false,
  }));

  const adminShows = readAdminShows()
    .filter(
      (show) =>
        String(show.movieId) === String(movieId) &&
        show.date === date
    )
    .map((show) => ({
      showId: show.showId,
      time: show.time,
      price: show.price,
      isAdminShow: true,
    }));

  return [...dummyShows, ...adminShows].sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );
};

// ==================================================
// Find one specific show for a movie + date + showId
// (used by SeatLayout & Checkout to resolve the show
// and its price)
// ==================================================
export const findShow = (
  movieId,
  date,
  showId,
  dummyDateTimeData
) => {
  const shows = getShowsForMovieDate(
    movieId,
    date,
    dummyDateTimeData
  );

  return (
    shows.find((show) => String(show.showId) === String(showId)) ||
    null
  );
};
