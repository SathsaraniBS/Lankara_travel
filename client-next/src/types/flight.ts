export interface Flight {
  id: string;
  airline: string;
  flight_number: string;
  departure_city: string;
  destination_city: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  seats_available: number;
}

export interface FlightListResponse {
  total: number;
  page: number;
  page_size: number;
  results: Flight[];
}