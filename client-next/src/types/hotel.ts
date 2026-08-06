export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string | null;
  price_per_night: number;
  rating: number;
  rooms_available: number;
}

export interface HotelListResponse {
  total: number;
  page: number;
  page_size: number;
  results: Hotel[];
}