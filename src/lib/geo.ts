export type SearchHit = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  rank?: number;
};

export type RouteResult = {
  coords: [number, number][];
  distanceM: number;
  durationS: number;
  source: "road" | "great-circle";
};

const PHOTON = "https://photon.komoot.io";
const OSRM = "https://router.project-osrm.org";

function regionFromProps(props: {
  city?: string;
  state?: string;
  country?: string;
  street?: string;
  district?: string;
  county?: string;
}): string {
  const parts = [props.street, props.city ?? props.district ?? props.county, props.state, props.country];
  return [...new Set(parts.filter(Boolean))].join(", ");
}

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<SearchHit[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const url = `${PHOTON}/api/?q=${encodeURIComponent(q)}&limit=12&lang=en`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Search failed");
  const data = (await res.json()) as {
    features?: Array<{
      geometry?: { coordinates?: [number, number] };
      properties?: {
        name?: string;
        osm_id?: number;
        osm_type?: string;
        osm_value?: string;
        osm_key?: string;
        city?: string;
        state?: string;
        country?: string;
        street?: string;
        district?: string;
        county?: string;
        type?: string;
      };
    }>;
  };
  const hits: SearchHit[] = [];
  for (const f of data.features ?? []) {
    const coords = f.geometry?.coordinates;
    const props = f.properties ?? {};
    if (!coords || coords.length < 2) continue;
    const [lng, lat] = coords;
    const name = props.name || props.street || props.city || "Untitled place";
    hits.push({
      id: `osm:${props.osm_type ?? "n"}:${props.osm_id ?? `${lat},${lng}`}`,
      name,
      region: regionFromProps(props) || props.type || "",
      lat,
      lng,
      rank: scoreHit(name, q, props),
    });
  }
  hits.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
  const seen = new Set<string>();
  const unique: SearchHit[] = [];
  for (const hit of hits) {
    const key = `${hit.name}|${hit.region}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(hit);
    if (unique.length >= 6) break;
  }
  return unique;
}

function scoreHit(
  name: string,
  query: string,
  props: { osm_value?: string; type?: string; street?: string; country?: string },
): number {
  const n = name.toLowerCase();
  const q = query.trim().toLowerCase();
  let s = 0;
  if (n === q) s += 40;
  else if (n.startsWith(q)) s += 16;
  const osm = props.osm_value ?? "";
  if (osm === "city") s += 30;
  else if (osm === "town") s += 10;
  else if (osm === "administrative") s += 12;
  else if (osm === "village") s += 4;
  if (props.country && !props.street) s += 6;
  if (props.street) s -= 12;
  return s;
}

export async function reverseGeocode(lat: number, lng: number, signal?: AbortSignal): Promise<SearchHit> {
  const url = `${PHOTON}/reverse?lat=${lat}&lon=${lng}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    return { id: `pin:${lat.toFixed(5)},${lng.toFixed(5)}`, name: "Dropped pin", region: formatCoord(lat, lng), lat, lng };
  }
  const data = (await res.json()) as {
    features?: Array<{
      geometry?: { coordinates?: [number, number] };
      properties?: {
        name?: string;
        osm_id?: number;
        city?: string;
        state?: string;
        country?: string;
        street?: string;
        housenumber?: string;
        district?: string;
        county?: string;
        type?: string;
      };
    }>;
  };
  const f = data.features?.[0];
  const props = f?.properties ?? {};
  const name =
    [props.housenumber, props.street].filter(Boolean).join(" ") ||
    props.name ||
    props.city ||
    "Dropped pin";
  return {
    id: `pin:${props.osm_id ?? `${lat.toFixed(5)},${lng.toFixed(5)}`}`,
    name,
    region: regionFromProps(props) || formatCoord(lat, lng),
    lat,
    lng,
  };
}

export async function fetchRoute(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  signal?: AbortSignal,
): Promise<RouteResult> {
  const path = `${from.lng},${from.lat};${to.lng},${to.lat}`;
  const url = `${OSRM}/route/v1/driving/${path}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error("unroutable");
    const data = (await res.json()) as {
      code?: string;
      routes?: Array<{
        distance: number;
        duration: number;
        geometry?: { coordinates?: [number, number][] };
      }>;
    };
    const route = data.routes?.[0];
    if (data.code !== "Ok" || !route?.geometry?.coordinates?.length) throw new Error("unroutable");
    return {
      coords: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
      distanceM: route.distance,
      durationS: route.duration,
      source: "road",
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    const coords = greatCircle(from, to, 64);
    return {
      coords,
      distanceM: haversine(from.lat, from.lng, to.lat, to.lng),
      durationS: 0,
      source: "great-circle",
    };
  }
}

export function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function greatCircle(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  steps: number,
): [number, number][] {
  const φ1 = (from.lat * Math.PI) / 180;
  const λ1 = (from.lng * Math.PI) / 180;
  const φ2 = (to.lat * Math.PI) / 180;
  const λ2 = (to.lng * Math.PI) / 180;
  const d = 2 * Math.asin(
    Math.sqrt(Math.sin((φ2 - φ1) / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2),
  );
  if (d === 0) return [[from.lat, from.lng], [to.lat, to.lng]];
  const coords: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const a = Math.sin((1 - f) * d) / Math.sin(d);
    const b = Math.sin(f * d) / Math.sin(d);
    const x = a * Math.cos(φ1) * Math.cos(λ1) + b * Math.cos(φ2) * Math.cos(λ2);
    const y = a * Math.cos(φ1) * Math.sin(λ1) + b * Math.cos(φ2) * Math.sin(λ2);
    const z = a * Math.sin(φ1) + b * Math.sin(φ2);
    const φ = Math.atan2(z, Math.sqrt(x * x + y * y));
    const λ = Math.atan2(y, x);
    coords.push([(φ * 180) / Math.PI, (λ * 180) / Math.PI]);
  }
  return coords;
}

export function formatCoord(lat: number, lng: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${ew}`;
}

export function formatDistance(meters: number): string {
  if (!Number.isFinite(meters)) return "—";
  if (meters < 1000) return `${Math.round(meters)} m`;
  if (meters < 10000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters / 1000)} km`;
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "";
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem ? `${h} hr ${rem} min` : `${h} hr`;
}
