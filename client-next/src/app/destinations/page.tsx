// src/app/destinations/[slug]/page.tsx
// Server Component. Next.js 16: `params` is a Promise and must be awaited.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  Clock,
  Languages,
  Landmark,
  Leaf,
  Lightbulb,
  MapPin,
  Star,
  Thermometer,
  Users,
} from "lucide-react";
import { destinationImage, getDestination, getDestinations } from "@/lib/destinations";

type Params = Promise<{ slug: string }>;

const FALLBACK = "linear-gradient(135deg, #0b4a40 0%, #2f7d6d 60%, #8fc9b8 100%)";

const bg = (url: string) => ({
  backgroundImage: `url(${url}), ${FALLBACK}`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const card =
  "rounded-2xl border border-[#d5e8e2] bg-[#f6fbf9] p-5 shadow-sm";
const cardTitle = "font-serif text-xl font-bold text-[#0b4a40]";

export async function generateStaticParams() {
  const all = await getDestinations();
  return all.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) return { title: "Destination not found | Lankara Travels" };
  return {
    title: `${d.name} | Lankara Travels`,
    description: d.intro,
    openGraph: {
      title: `${d.name} — ${d.tagline}`,
      description: d.intro,
      images: [destinationImage(d.slug, "hero")],
    },
  };
}

export default async function DestinationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) notFound();

  const planHref = `/planning-a-trip?destination=${d.slug}`;
  const packagesHref = `/holiday-packages?destination=${d.slug}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${d.name}, Sri Lanka`
  )}`;

  // OpenStreetMap embed (no API key needed)
  const { lat, lng } = d.map;
  const bbox = `${lng - 0.45},${lat - 0.3},${lng + 0.45},${lat + 0.3}`;
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  const statIcons = [Landmark, Users, CalendarDays];

  return (
    <main className="min-h-screen bg-[#eef7f4] text-[#1c3a35]">
      {/* ───────── Hero ───────── */}
      <section className="relative isolate overflow-hidden bg-[#08352f] text-white">
        <div className="absolute inset-0 -z-10" style={bg(destinationImage(d.slug, "hero"))} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#08352f]/90 via-[#08352f]/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#08352f]/70 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/destinations" className="hover:text-white">Destinations</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-white">{d.name}</span>
          </nav>

          <div className="relative mt-6 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#2f9d7f] px-2.5 py-1 text-xs font-medium">
              <Leaf className="h-3.5 w-3.5" aria-hidden />
              {d.category}
            </span>
            <h1 className="mt-3 font-serif text-5xl font-bold leading-none sm:text-6xl">{d.name}</h1>
            <p className="mt-2 font-serif text-lg sm:text-xl">{d.tagline}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">{d.intro}</p>
          </div>

          <p
            className="pointer-events-none absolute right-6 top-24 hidden max-w-[16rem] -rotate-6 text-right text-2xl text-white/95 md:block lg:right-16"
            style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
            aria-hidden
          >
            {d.script}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {d.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 border-white/30 sm:border-r sm:pr-6 last:border-r-0">
                <Star className="h-4 w-4 text-[#f2c94c]" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Body ───────── */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        {/* Main column */}
        <div className="space-y-6">
          {/* About */}
          <section className={`${card} grid gap-5 md:grid-cols-[1.1fr_1fr]`} aria-labelledby="about">
            <div>
              <h2 id="about" className={`${cardTitle} flex items-center gap-2`}>
                <Landmark className="h-5 w-5" aria-hidden /> About {d.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#1c3a35]/90">{d.about}</p>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-[#d5e8e2] pt-4">
                {d.stats.map((s, i) => {
                  const Icon = statIcons[i % statIcons.length];
                  return (
                    <div key={s.label} className="flex items-start gap-2">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0b4a40]" aria-hidden />
                      <div>
                        <dd className="text-sm font-semibold text-[#0b4a40]">{s.value}</dd>
                        <dt className="text-xs text-[#1c3a35]/70">{s.label}</dt>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div
              className="relative min-h-52 overflow-hidden rounded-xl"
              style={bg(destinationImage(d.slug, "hero"))}
              role="img"
              aria-label={`${d.name} landscape`}
            >
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-[#0b4a40]/90 px-3.5 py-1.5 text-xs font-medium text-white">
                {d.attractions[0].name}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </section>

          {/* Top attractions */}
          <section className={card} aria-labelledby="attractions">
            <div className="flex items-center justify-between">
              <h2 id="attractions" className={`${cardTitle} flex items-center gap-2`}>
                <Landmark className="h-5 w-5" aria-hidden /> Top Attractions
              </h2>
              <Link href={planHref} className="inline-flex items-center gap-1 text-xs font-semibold text-[#0b4a40] hover:underline">
                Add to my trip <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {d.attractions.map((a, i) => (
                <li key={a.name} className="overflow-hidden rounded-xl border border-[#d5e8e2] bg-white">
                  <div className="h-28" style={bg(destinationImage(d.slug, `attraction-${i + 1}`))} role="img" aria-label={a.name} />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-[#0b4a40]">{a.name}</h3>
                    <p className="mt-1 text-xs leading-snug text-[#1c3a35]/75">{a.description}</p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-[#1c3a35]/80">
                      <MapPin className="h-3.5 w-3.5 text-[#0b4a40]" aria-hidden />
                      {a.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Itineraries + tips */}
          <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <section className={card} aria-labelledby="itineraries">
              <div className="flex items-center justify-between">
                <h2 id="itineraries" className={`${cardTitle} flex items-center gap-2`}>
                  <CalendarDays className="h-5 w-5" aria-hidden /> Suggested Itineraries
                </h2>
                <Link href={packagesHref} className="text-xs font-semibold text-[#0b4a40] hover:underline">
                  View all
                </Link>
              </div>

              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {d.itineraries.map((it, i) => (
                  <li key={it.days}>
                    <Link
                      href={`${packagesHref}&days=${it.days}`}
                      className="group block overflow-hidden rounded-xl border border-[#d5e8e2] bg-white transition hover:border-[#0b4a40]/40 hover:shadow-md"
                    >
                      <div className="h-24" style={bg(destinationImage(d.slug, `itinerary-${i + 1}`))} role="img" aria-label={`${it.days} day itinerary`} />
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-[#0b4a40]">
                          {it.days} {it.days === 1 ? "Day" : "Days"} in {d.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#1c3a35]/75">{it.theme}</p>
                        <p className="mt-2 flex items-center justify-between text-xs text-[#1c3a35]/80">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-[#0b4a40]" aria-hidden />
                            {it.days} {it.days === 1 ? "Day" : "Days"}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#0b4a40] transition-transform group-hover:translate-x-1" aria-hidden />
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className={card} aria-labelledby="tips">
              <h2 id="tips" className={`${cardTitle} flex items-center gap-2`}>
                <Lightbulb className="h-5 w-5" aria-hidden /> Travel Tips
              </h2>
              <ul className="mt-4 space-y-3">
                {d.tips.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm leading-snug">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0b4a40]" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6" aria-label={`${d.name} quick facts`}>
          <section className={card} aria-labelledby="quick-info">
            <h2 id="quick-info" className={`${cardTitle} flex items-center gap-2`}>
              <Clock className="h-5 w-5" aria-hidden /> Quick Info
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              {[
                { icon: CalendarDays, label: "Best Time to Visit", value: d.quickInfo.bestTime },
                { icon: Thermometer, label: "Average Temperature", value: d.quickInfo.temperature },
                { icon: Clock, label: "Travel Time from Colombo", value: d.quickInfo.travelTime },
                { icon: Languages, label: "Main Language", value: d.quickInfo.language },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#0b4a40]" aria-hidden />
                  <div>
                    <dt className="font-semibold text-[#0b4a40]">{label}</dt>
                    <dd className="text-[#1c3a35]/80">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#0b4a40] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#08352f]"
            >
              <MapPin className="h-4 w-4" aria-hidden /> View on Map
            </a>
          </section>

          <section className={card} aria-labelledby="activities">
            <h2 id="activities" className={`${cardTitle} flex items-center gap-2`}>
              <Star className="h-5 w-5" aria-hidden /> Popular Activities
            </h2>
            <ul className="mt-3 divide-y divide-[#d5e8e2]">
              {d.activities.map((a) => (
                <li key={a}>
                  <Link
                    href={`/experiences?destination=${d.slug}`}
                    className="flex items-center justify-between py-2.5 text-sm hover:text-[#0b4a40]"
                  >
                    {a}
                    <ChevronRight className="h-4 w-4 text-[#0b4a40]" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="relative isolate overflow-hidden rounded-2xl p-6 text-white"
            style={bg(destinationImage(d.slug, "hero"))}
            aria-labelledby="cta"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#08352f] via-[#08352f]/70 to-[#08352f]/20" />
            <div className="pt-24">
              <h2 id="cta" className="font-serif text-xl font-bold">Plan your {d.name} trip</h2>
              <p className="mt-1 text-sm text-white/90">{d.ctaText}</p>
              <Link
                href={planHref}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f2c94c] px-5 py-2 text-sm font-semibold text-[#08352f] transition hover:bg-[#ffd966]"
              >
                Plan your trip <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </section>
        </aside>
      </div>

      {/* ───────── Map + why visit ───────── */}
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <section className={`${card} overflow-hidden p-0`} aria-label={`Map of ${d.name}`}>
          <div className="grid md:grid-cols-[220px_1fr]">
            <ul className="space-y-2.5 border-b border-[#d5e8e2] p-5 text-sm md:border-b-0 md:border-r">
              {d.attractions.map((a) => (
                <li key={a.name} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-[#0b4a40]" aria-hidden />
                  {a.name}
                </li>
              ))}
            </ul>
            <iframe
              title={`${d.name} on the map`}
              src={osmSrc}
              loading="lazy"
              className="h-72 w-full border-0"
            />
          </div>
        </section>

        <section className={card} aria-labelledby="why">
          <h2 id="why" className={cardTitle}>Why visit {d.name}?</h2>
          <ul className="mt-4 space-y-3">
            {d.whyVisit.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm leading-snug">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0b4a40]" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}