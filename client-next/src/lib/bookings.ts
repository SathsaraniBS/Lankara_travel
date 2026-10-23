// Types + helpers for bookings. Pure functions only, so server and client components can both import this.

export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

// Shape returned by FastAPI: GET /api/bookings/ and GET /api/bookings/{id}
export interface ApiFlightInfo {
  airline: string;
  flight_number: string;
  departure_city: string;
  destination_city: string;
  departure_time: string;
  arrival_time: string;
  price: number;
}

export interface ApiHotelInfo {
  name: string;
  city: string;
  address: string | null;
  price_per_night: number;
  rating: number;
}

export interface ApiBooking {
  id: string;
  reference: string | null;
  status: BookingStatus;
  total_amount: number;
  passengers: number;
  rooms: number;
  check_in: string | null;
  check_out: string | null;
  nights: number | null;
  traveler_name: string | null;
  traveler_email: string | null;
  traveler_phone: string | null;
  special_requests: string | null;
  created_at: string;
  flight_info: ApiFlightInfo | null;
  hotel_info: ApiHotelInfo | null;
  payment_status: PaymentStatus | null;
}

export type BookingPhase = "pending" | "upcoming" | "completed" | "cancelled";

// What the bookings list needs to draw a card (plain, serialisable data)
export interface BookingView {
  id: string;
  reference: string;
  kind: "Hotel" | "Flight" | "Hotel + Flight";
  title: string;
  location: string;
  dateLine: string;
  detailLine1: string;
  detailLine2: string;
  total: number;
  phase: BookingPhase;
  paid: boolean;
  imageUrl: string;
  rebookHref: string;
  canPay: boolean;
  canCancel: boolean;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TIME_ZONE = "Asia/Colombo";

// "2026-04-12" -> "12 Apr 2026" (no Date object, so no time-zone surprises)
export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

// The API stores flight times as naive UTC ("2026-10-26T04:30:00"), so treat them as UTC
export function parseUtc(iso: string): Date {
  return new Date(/(Z|[+-]\d\d:\d\d)$/.test(iso) ? iso : `${iso}Z`);
}

export function formatDateTime(iso: string): string {
  const text = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(parseUtc(iso));
  return `${text} (Sri Lanka time)`;
}

function todayInColombo(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now); // YYYY-MM-DD
}

export function formatMoney(amount: number, currency: string): string {
  const code = currency.toUpperCase();
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: code, currencyDisplay: "code" })
      .format(amount)
      .replace(/\u00a0/g, " ");
  } catch {
    return `${code} ${amount.toFixed(2)}`;
  }
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const CITY_IMAGES: Record<string, string> = {
  colombo: "/images/colombo.jpg",
  galle: "/images/galle.jpg",
  kandy: "/images/Kandy.jpg",
  ella: "/images/ella.jpg",
  jaffna: "/images/jaffna.jpg",
  dambulla: "/images/sigiriya.jpg",
  sigiriya: "/images/sigiriya.jpg",
  anuradhapura: "/images/anuradhapura.jpg",
  "nuwara eliya": "/images/nuwaraeliya.webp",
  yala: "/images/safari-trip.jpg",
};
const DEFAULT_IMAGE = "/images/backimage.jpg";

export function imageForCity(city: string | null | undefined): string {
  return (city && CITY_IMAGES[city.trim().toLowerCase()]) || DEFAULT_IMAGE;
}

// pending = waiting for payment, upcoming = paid and still ahead, completed = paid and over, cancelled
export function phaseOf(b: ApiBooking, now: Date = new Date()): BookingPhase {
  if (b.status === "cancelled") return "cancelled";
  if (b.status === "pending") return "pending";

  const hotelOver = b.hotel_info ? (b.check_out ? b.check_out.slice(0, 10) < todayInColombo(now) : true) : true;
  const flightOver = b.flight_info ? parseUtc(b.flight_info.arrival_time) < now : true;
  return hotelOver && flightOver ? "completed" : "upcoming";
}

export function toBookingView(b: ApiBooking, now: Date = new Date()): BookingView {
  const phase = phaseOf(b, now);
  const hotel = b.hotel_info;
  const flight = b.flight_info;

  const kind: BookingView["kind"] = hotel && flight ? "Hotel + Flight" : hotel ? "Hotel" : "Flight";
  const title = hotel ? hotel.name : flight ? `${flight.departure_city} → ${flight.destination_city}` : "Booking";
  const location = hotel ? hotel.city : flight ? `${flight.airline} · ${flight.flight_number}` : "";

  const parts: string[] = [];
  if (hotel && b.check_in && b.check_out) {
    const nights = b.nights ?? 0;
    parts.push(`${formatDate(b.check_in)} – ${formatDate(b.check_out)} (${plural(nights, "night")})`);
  }
  if (flight) parts.push(`Departs ${formatDateTime(flight.departure_time)}`);

  const counts: string[] = [];
  if (hotel) counts.push(plural(b.rooms, "room"));
  if (flight) counts.push(plural(b.passengers, "passenger"));

  const detailLine2 =
    phase === "pending"
      ? "Awaiting payment"
      : b.traveler_name
        ? `Booked for ${b.traveler_name}`
        : "";

  return {
    id: b.id,
    reference: b.reference ?? b.id.slice(0, 8).toUpperCase(),
    kind,
    title,
    location,
    dateLine: parts.join(" · "),
    detailLine1: counts.join(" · "),
    detailLine2,
    total: b.total_amount,
    phase,
    paid: b.payment_status === "succeeded",
    imageUrl: imageForCity(hotel ? hotel.city : flight?.destination_city),
    rebookHref: hotel ? "/Hotels" : "/flights",
    canPay: phase === "pending",
    canCancel: phase === "pending",
  };
}