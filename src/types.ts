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
  date: string;
  startMinutes: number;    
  durationMinutes: number; 
  guestName: string;
  meetingTitle: string;
}