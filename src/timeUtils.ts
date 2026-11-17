export const WORK_START_HOUR = 9;
export const WORK_END_HOUR = 20;
export const STEP_MINUTES = 15;

export function generateTimeSlots(): number[] {
  const slots: number[] = [];
  const start = WORK_START_HOUR * 60;
  const end = WORK_END_HOUR * 60; 
  for (let m = start; m < end; m += STEP_MINUTES) {
    slots.push(m);
  }
  return slots;
}

export function formatTime(minutes: number): string {
  // Если пришло undefined или NaN — возвращаем заглушку вместо "NaN:NaN"
  if (typeof minutes !== 'number' || Number.isNaN(minutes)) {
    return '--:--';
  }
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function isTimeOverlapping(
  start: number, 
  duration: number, 
  bookings: any[]
): boolean {
  const end = start + duration;
  
  return bookings.some((b) => {
    if (typeof b.startMinutes !== 'number' || typeof b.durationMinutes !== 'number') {
      return false; // Пропускаем битые брони
    }
    const bStart = b.startMinutes;
    const bEnd = b.startMinutes + b.durationMinutes;
    return start < bEnd && end > bStart;
  });
}