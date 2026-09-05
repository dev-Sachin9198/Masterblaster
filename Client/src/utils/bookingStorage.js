// src/utils/bookingStorage.js

const BOOKINGS_KEY = "myBookings";

const getAllBookings = () => {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse bookings:", err);
    return [];
  }
};

// ==================================================
// Save Booking
// Called on successful payment. userId comes from
// Clerk's useUser() -> user.id
// ==================================================
export const saveBooking = (userId, booking) => {
  if (!userId) {
    return null;
  }

  const bookings = getAllBookings();

  const newBooking = {
    _id: `bk_${Date.now()}`,
    user: userId,
    createdAt: new Date().toISOString(),
    isPaid: true,
    ...booking,
  };

  bookings.unshift(newBooking);

  localStorage.setItem(
    BOOKINGS_KEY,
    JSON.stringify(bookings)
  );

  return newBooking;
};

// ==================================================
// Get Bookings for the logged-in user only
// ==================================================
export const getUserBookings = (userId) => {
  if (!userId) {
    return [];
  }

  return getAllBookings().filter(
    (booking) => booking.user === userId
  );
};

// ==================================================
// Get EVERY booking across all users — admin panel only.
// Do not use this on user-facing pages.
// ==================================================
export const getAllBookingsAdmin = () => {
  return getAllBookings().slice().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

// ==================================================
// Dashboard stats — admin panel only
// ==================================================
export const getBookingStats = () => {
  const bookings = getAllBookings();

  const totalBookings = bookings.length;

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (Number(booking.amount) || 0),
    0
  );

  const totalUsers = new Set(
    bookings.map((booking) => booking.user)
  ).size;

  return {
    totalBookings,
    totalRevenue,
    totalUsers,
  };
};

