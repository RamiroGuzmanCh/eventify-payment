export class Student {
  id: number;
  name: string;
  description: string;
  date: string; // Puedes usar Date si prefieres manejar objetos de fecha
  location: string;
  capacity: number;
  organizer_id: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.date = "";
    this.location = "";
    this.capacity = 0;
    this.organizer_id = 0;
  }
}
