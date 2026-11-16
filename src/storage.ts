import type { Booking } from './types';

const KEY = 'bookings';

export function getBookings(): Booking[] {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveBooking(booking: Booking) {
  const all = getBookings();
  all.push(booking);
  localStorage.setItem(KEY, JSON.stringify(all));
}