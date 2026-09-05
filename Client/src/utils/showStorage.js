// src/utils/showStorage.js

import { dummyDashboardData } from "../assets/assets";

const SHOWS_KEY = "adminShows";

// ==================================================
// Shows added by the admin (persisted)
// ==================================================
const getAdminShows = () => {
  try {
    const raw = localStorage.getItem(SHOWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse shows:", err);
    return [];
  }
};

// ==================================================
// Add Show
// movie      -> the full movie object (from dummyShowsData)
// dateTimeIso -> ISO string of the show's date + time
// price      -> ticket price for this show
// ==================================================
export const addShow = ({ movie, dateTimeIso, price }) => {
  if (!movie || !dateTimeIso || !price) {
    return null;
  }

  const shows = getAdminShows();

  const newShow = {
    _id: `show_${Date.now()}`,
    movie,
    showDateTime: dateTimeIso,
    showPrice: Number(price),
    occupiedSeats: {},
    createdAt: new Date().toISOString(),
  };

  shows.unshift(newShow);

  localStorage.setItem(
    SHOWS_KEY,
    JSON.stringify(shows)
  );

  return newShow;
};

// ==================================================
// All shows — seeded demo shows + admin-added shows,
// newest first. Used by the admin Dashboard/List pages.
// ==================================================
export const getAllShows = () => {
  const seeded = dummyDashboardData?.activeShows || [];
  const adminShows = getAdminShows();

  return [...adminShows, ...seeded];
};
