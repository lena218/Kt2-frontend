export interface Room {
  id: string;
  name: string;
  capacity: number;
  floor: number;
  equipment: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  date: string;      // YYYY-MM-DD
  time: string;      // HH:00
  guestName: string;
  meetingTitle: string;
}