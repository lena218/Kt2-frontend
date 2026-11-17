export const WORK_START_HOUR = 9;
export const WORK_END_HOUR = 20;
export const STEP_MINUTES = 15;

export function generateTimeSlots(): number[] {
  const slots: number[] = [];
  const start = WORK_START_HOUR * 60;
  // Убираем 20:00, поэтому ставим строгое "меньше" (<)
  const end = WORK_END_HOUR * 60; 
  for (let m = start; m < end; m += STEP_MINUTES) {
    slots.push(m);
  }
  return slots;
}

export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Новая функция: проверяет, пересекается ли время с уже существующими бронями
export function isTimeOverlapping(
  start: number, 
  duration: number, 
  bookings: any[]
): boolean {
  const end = start + duration;
  
  return bookings.some((b) => {
    const bStart = b.startMinutes;
    const bEnd = b.startMinutes + b.durationMinutes;
    
    // Если начало нового бронирования раньше конца старого и конец позже начала старого — это пересечение
    return start < bEnd && end > bStart;
  });
}