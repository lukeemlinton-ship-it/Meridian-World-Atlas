import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Plus, c as MapPin, d as Compass, f as Bookmark, h as ArrowLeft, i as Route, l as Locate, m as ArrowUpDown, o as Navigation, p as BookmarkCheck, r as Search, s as Minus, t as X, u as Layers } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-u_13oeYc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Badge({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full bg-elevated px-2 py-0.5 text-[11px] font-medium tracking-wide text-muted uppercase", className),
		children
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-border hover:shadow-border-hover",
			ghost: "text-fg hover:bg-elevated",
			outline: "text-fg shadow-border hover:bg-elevated",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	type,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type = "text", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	type,
	className: cn("flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-border", "placeholder:text-subtle", "transition-[box-shadow] duration-150 ease-[var(--ease-out)]", "focus-visible:outline-none focus-visible:shadow-border-hover focus-visible:ring-2 focus-visible:ring-ring/40", "disabled:cursor-not-allowed disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn("h-px w-full bg-border", className)
	});
}
var CATEGORIES = [
	"city",
	"nature",
	"culture",
	"coast",
	"mountain"
];
var CATEGORY_LABEL = {
	city: "City",
	nature: "Nature",
	culture: "Culture",
	coast: "Coast",
	mountain: "Mountain",
	search: "Search",
	pin: "Pin"
};
var HOME = {
	id: "prime-meridian",
	name: "Prime Meridian",
	region: "Greenwich, London",
	blurb: "The line that split the world into hemispheres. East meets west on this quiet hill above the Thames.",
	category: "culture",
	lat: 51.4778,
	lng: -.0015,
	zoom: 13
};
var DESTINATIONS = [
	HOME,
	{
		id: "kyoto",
		name: "Fushimi Inari",
		region: "Kyoto, Japan",
		blurb: "Thousands of vermilion gates climb the mountain, each one a wish left standing.",
		category: "culture",
		lat: 34.9671,
		lng: 135.7727,
		zoom: 14
	},
	{
		id: "oia",
		name: "Oia",
		region: "Santorini, Greece",
		blurb: "Whitewashed cliffs over a drowned caldera. The Aegean at its most theatrical.",
		category: "coast",
		lat: 36.4618,
		lng: 25.3753,
		zoom: 14
	},
	{
		id: "paine",
		name: "Torres del Paine",
		region: "Patagonia, Chile",
		blurb: "Granite towers, wind, and water the color of glacial milk. The south at full volume.",
		category: "nature",
		lat: -50.9423,
		lng: -73.4068,
		zoom: 10
	},
	{
		id: "marrakech",
		name: "Jemaa el-Fnaa",
		region: "Marrakech, Morocco",
		blurb: "A square that becomes a city after dusk: steam, drums, and orange-wood smoke.",
		category: "city",
		lat: 31.6258,
		lng: -7.9891,
		zoom: 15
	},
	{
		id: "skogafoss",
		name: "Skógafoss",
		region: "South Coast, Iceland",
		blurb: "A curtain of meltwater on the old sea cliffs. Walk the spray and keep going east.",
		category: "nature",
		lat: 63.5321,
		lng: -19.5114,
		zoom: 13
	},
	{
		id: "manhattan",
		name: "Midtown",
		region: "New York, USA",
		blurb: "A grid that never quite sleeps. Look up — the skyline is the map.",
		category: "city",
		lat: 40.758,
		lng: -73.9855,
		zoom: 13
	},
	{
		id: "venice",
		name: "San Marco",
		region: "Venice, Italy",
		blurb: "A city drawn in water. Stone, tide, and a piazza that has seen every century in.",
		category: "city",
		lat: 45.434,
		lng: 12.3388,
		zoom: 15
	},
	{
		id: "machu-picchu",
		name: "Machu Picchu",
		region: "Cusco, Peru",
		blurb: "A citadel in the clouds, held by terraces and silence. Arrive before the day does.",
		category: "culture",
		lat: -13.1631,
		lng: -72.545,
		zoom: 14
	},
	{
		id: "louise",
		name: "Lake Louise",
		region: "Banff, Canada",
		blurb: "A turquoise bowl under the Rockies. Canoes look like punctuation on the water.",
		category: "mountain",
		lat: 51.4254,
		lng: -116.1773,
		zoom: 13
	},
	{
		id: "table-mountain",
		name: "Table Mountain",
		region: "Cape Town, South Africa",
		blurb: "A flat-topped sentinel over two oceans. The city gathers at its feet.",
		category: "mountain",
		lat: -33.9628,
		lng: 18.4098,
		zoom: 12
	},
	{
		id: "shibuya",
		name: "Shibuya Crossing",
		region: "Tokyo, Japan",
		blurb: "The world's most famous pause. Then everyone moves at once.",
		category: "city",
		lat: 35.6595,
		lng: 139.7004,
		zoom: 16
	},
	{
		id: "eiffel",
		name: "Champ de Mars",
		region: "Paris, France",
		blurb: "Iron lace against a wide lawn. The tower is only half the view.",
		category: "city",
		lat: 48.8584,
		lng: 2.2945,
		zoom: 15
	},
	{
		id: "petra",
		name: "The Treasury",
		region: "Petra, Jordan",
		blurb: "A façade carved from rose stone, waiting at the end of a long, cool siq.",
		category: "culture",
		lat: 30.3225,
		lng: 35.4513,
		zoom: 15
	},
	{
		id: "geiranger",
		name: "Geirangerfjord",
		region: "Møre og Romsdal, Norway",
		blurb: "Waterfalls thread the cliffs. The ferry feels like the only moving thing.",
		category: "coast",
		lat: 62.1015,
		lng: 7.2056,
		zoom: 11
	},
	{
		id: "alfama",
		name: "Alfama",
		region: "Lisbon, Portugal",
		blurb: "Tram rails, tiled façades, and the river widening toward the Atlantic.",
		category: "city",
		lat: 38.7126,
		lng: -9.13,
		zoom: 15
	},
	{
		id: "grand-canyon",
		name: "South Rim",
		region: "Arizona, USA",
		blurb: "A wound in the plateau so old it reads as a country of its own.",
		category: "nature",
		lat: 36.0544,
		lng: -112.1401,
		zoom: 12
	},
	{
		id: "marina-bay",
		name: "Marina Bay",
		region: "Singapore",
		blurb: "A harbour remade as a garden. Light on water, and the city behind it.",
		category: "city",
		lat: 1.2834,
		lng: 103.8607,
		zoom: 15
	},
	{
		id: "positano",
		name: "Positano",
		region: "Amalfi Coast, Italy",
		blurb: "Houses stacked like a landslide of color, catching the Tyrrhenian light.",
		category: "coast",
		lat: 40.628,
		lng: 14.485,
		zoom: 14
	},
	{
		id: "zermatt",
		name: "Zermatt",
		region: "Valais, Switzerland",
		blurb: "Car-free streets under the Matterhorn. The peak is a compass needle.",
		category: "mountain",
		lat: 46.0207,
		lng: 7.7491,
		zoom: 13
	},
	{
		id: "havana",
		name: "Malecón",
		region: "Havana, Cuba",
		blurb: "A seawall built for lingering. Spray, chrome, and the Gulf Stream just offshore.",
		category: "coast",
		lat: 23.1416,
		lng: -82.3519,
		zoom: 14
	},
	{
		id: "sapa",
		name: "Sa Pa",
		region: "Lào Cai, Vietnam",
		blurb: "Rice terraces folded into the Hoàng Liên mountains, green on green.",
		category: "mountain",
		lat: 22.3364,
		lng: 103.844,
		zoom: 12
	},
	{
		id: "dubrovnik",
		name: "Old Town",
		region: "Dubrovnik, Croatia",
		blurb: "Marble streets inside limestone walls, the Adriatic knocking at the gates.",
		category: "coast",
		lat: 42.6404,
		lng: 18.1081,
		zoom: 15
	},
	{
		id: "uyuni",
		name: "Salar de Uyuni",
		region: "Potosí, Bolivia",
		blurb: "The world's largest mirror, when the rains come. Sky and salt trade places.",
		category: "nature",
		lat: -20.1338,
		lng: -67.4891,
		zoom: 9
	},
	{
		id: "chefchaouen",
		name: "Chefchaouen",
		region: "Rif Mountains, Morocco",
		blurb: "A blue medina in a green fold of the Rif. Every alley is a quieter shade.",
		category: "city",
		lat: 35.1688,
		lng: -5.2636,
		zoom: 15
	},
	{
		id: "yosemite",
		name: "Yosemite Valley",
		region: "California, USA",
		blurb: "Granite walls, a river, and light that makes the valley feel staged.",
		category: "nature",
		lat: 37.7459,
		lng: -119.5936,
		zoom: 12
	},
	{
		id: "edinburgh",
		name: "Old Town",
		region: "Edinburgh, Scotland",
		blurb: "A ridge of stone and wynds, castle at one end, palace at the other.",
		category: "city",
		lat: 55.9486,
		lng: -3.1915,
		zoom: 14
	},
	{
		id: "luang-prabang",
		name: "Luang Prabang",
		region: "Laos",
		blurb: "Temples at the confluence of two rivers. Dawn belongs to the monks.",
		category: "culture",
		lat: 19.886,
		lng: 102.135,
		zoom: 14
	},
	{
		id: "cappadocia",
		name: "Göreme",
		region: "Cappadocia, Turkey",
		blurb: "A landscape hollowed into dwellings. Balloons lift off like punctuation at sunrise.",
		category: "culture",
		lat: 38.6431,
		lng: 34.8283,
		zoom: 12
	},
	{
		id: "queenstown",
		name: "Queenstown",
		region: "Otago, New Zealand",
		blurb: "A lake town under The Remarkables. The Southern Alps do what the name promises.",
		category: "mountain",
		lat: -45.0312,
		lng: 168.6626,
		zoom: 12
	}
];
var PHOTON = "https://photon.komoot.io";
var OSRM = "https://router.project-osrm.org";
function regionFromProps(props) {
	const parts = [
		props.street,
		props.city ?? props.district ?? props.county,
		props.state,
		props.country
	];
	return [...new Set(parts.filter(Boolean))].join(", ");
}
async function searchPlaces(query, signal) {
	const q = query.trim();
	if (q.length < 2) return [];
	const url = `${PHOTON}/api/?q=${encodeURIComponent(q)}&limit=12&lang=en`;
	const res = await fetch(url, { signal });
	if (!res.ok) throw new Error("Search failed");
	const data = await res.json();
	const hits = [];
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
			rank: scoreHit(name, q, props)
		});
	}
	hits.sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
	const seen = /* @__PURE__ */ new Set();
	const unique = [];
	for (const hit of hits) {
		const key = `${hit.name}|${hit.region}`;
		if (seen.has(key)) continue;
		seen.add(key);
		unique.push(hit);
		if (unique.length >= 6) break;
	}
	return unique;
}
function scoreHit(name, query, props) {
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
async function reverseGeocode(lat, lng, signal) {
	const url = `${PHOTON}/reverse?lat=${lat}&lon=${lng}`;
	const res = await fetch(url, { signal });
	if (!res.ok) return {
		id: `pin:${lat.toFixed(5)},${lng.toFixed(5)}`,
		name: "Dropped pin",
		region: formatCoord(lat, lng),
		lat,
		lng
	};
	const props = ((await res.json()).features?.[0])?.properties ?? {};
	const name = [props.housenumber, props.street].filter(Boolean).join(" ") || props.name || props.city || "Dropped pin";
	return {
		id: `pin:${props.osm_id ?? `${lat.toFixed(5)},${lng.toFixed(5)}`}`,
		name,
		region: regionFromProps(props) || formatCoord(lat, lng),
		lat,
		lng
	};
}
async function fetchRoute(from, to, signal) {
	const url = `${OSRM}/route/v1/driving/${`${from.lng},${from.lat};${to.lng},${to.lat}`}?overview=full&geometries=geojson`;
	try {
		const res = await fetch(url, { signal });
		if (!res.ok) throw new Error("unroutable");
		const data = await res.json();
		const route = data.routes?.[0];
		if (data.code !== "Ok" || !route?.geometry?.coordinates?.length) throw new Error("unroutable");
		return {
			coords: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
			distanceM: route.distance,
			durationS: route.duration,
			source: "road"
		};
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") throw err;
		return {
			coords: greatCircle(from, to, 64),
			distanceM: haversine(from.lat, from.lng, to.lat, to.lng),
			durationS: 0,
			source: "great-circle"
		};
	}
}
function haversine(lat1, lng1, lat2, lng2) {
	const R = 6371e3;
	const p1 = lat1 * Math.PI / 180;
	const p2 = lat2 * Math.PI / 180;
	const dp = (lat2 - lat1) * Math.PI / 180;
	const dl = (lng2 - lng1) * Math.PI / 180;
	const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
	return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function greatCircle(from, to, steps) {
	const φ1 = from.lat * Math.PI / 180;
	const λ1 = from.lng * Math.PI / 180;
	const φ2 = to.lat * Math.PI / 180;
	const λ2 = to.lng * Math.PI / 180;
	const d = 2 * Math.asin(Math.sqrt(Math.sin((φ2 - φ1) / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2));
	if (d === 0) return [[from.lat, from.lng], [to.lat, to.lng]];
	const coords = [];
	for (let i = 0; i <= steps; i++) {
		const f = i / steps;
		const a = Math.sin((1 - f) * d) / Math.sin(d);
		const b = Math.sin(f * d) / Math.sin(d);
		const x = a * Math.cos(φ1) * Math.cos(λ1) + b * Math.cos(φ2) * Math.cos(λ2);
		const y = a * Math.cos(φ1) * Math.sin(λ1) + b * Math.cos(φ2) * Math.sin(λ2);
		const z = a * Math.sin(φ1) + b * Math.sin(φ2);
		const φ = Math.atan2(z, Math.sqrt(x * x + y * y));
		const λ = Math.atan2(y, x);
		coords.push([φ * 180 / Math.PI, λ * 180 / Math.PI]);
	}
	return coords;
}
function formatCoord(lat, lng) {
	const ns = lat >= 0 ? "N" : "S";
	const ew = lng >= 0 ? "E" : "W";
	return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${ew}`;
}
function formatDistance(meters) {
	if (!Number.isFinite(meters)) return "—";
	if (meters < 1e3) return `${Math.round(meters)} m`;
	if (meters < 1e4) return `${(meters / 1e3).toFixed(1)} km`;
	return `${Math.round(meters / 1e3)} km`;
}
function formatDuration(seconds) {
	if (!seconds || seconds <= 0) return "";
	const m = Math.round(seconds / 60);
	if (m < 60) return `${m} min`;
	const h = Math.floor(m / 60);
	const rem = m % 60;
	return rem ? `${h} hr ${rem} min` : `${h} hr`;
}
var memoryStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {},
	clear: () => {},
	key: () => null,
	length: 0
};
function asPlace(hit, category) {
	return {
		id: hit.id,
		name: hit.name,
		region: hit.region,
		blurb: hit.region || "A place on the map.",
		category,
		lat: hit.lat,
		lng: hit.lng,
		zoom: 14
	};
}
var useMeridian = create()(persist((set, get) => ({
	saved: [],
	mapStyle: "night",
	lastView: null,
	selected: null,
	tab: "explore",
	filter: "all",
	flyTo: null,
	userLocation: null,
	routeFrom: null,
	routeTo: null,
	route: null,
	routeStatus: "idle",
	picking: null,
	sheetOpen: false,
	setTab: (tab) => set({
		tab,
		sheetOpen: true
	}),
	setFilter: (filter) => set({ filter }),
	setMapStyle: (mapStyle) => set({ mapStyle }),
	setLastView: (lastView) => set({ lastView }),
	selectPlace: (place, fly = true) => set((s) => ({
		selected: place,
		sheetOpen: true,
		flyTo: fly ? {
			lat: place.lat,
			lng: place.lng,
			zoom: place.zoom,
			nonce: (s.flyTo?.nonce ?? 0) + 1
		} : s.flyTo
	})),
	selectHit: (hit) => get().selectPlace(asPlace(hit, "search")),
	clearSelected: () => set({ selected: null }),
	toggleSave: (place) => {
		if (get().saved.some((p) => p.id === place.id)) {
			set({ saved: get().saved.filter((p) => p.id !== place.id) });
			return;
		}
		set({ saved: [{
			id: place.id,
			name: place.name,
			region: place.region,
			lat: place.lat,
			lng: place.lng,
			category: place.category,
			savedAt: Date.now()
		}, ...get().saved] });
	},
	isSaved: (id) => get().saved.some((p) => p.id === id),
	setUserLocation: (userLocation) => set({ userLocation }),
	setRouteFrom: (routeFrom) => set({
		routeFrom,
		picking: null
	}),
	setRouteTo: (routeTo) => set({
		routeTo,
		picking: null
	}),
	setRoute: (route) => set({ route }),
	setRouteStatus: (routeStatus) => set({ routeStatus }),
	setPicking: (picking) => set({
		picking,
		tab: picking ? "route" : get().tab
	}),
	setSheetOpen: (sheetOpen) => set({ sheetOpen }),
	requestFly: (lat, lng, zoom = 13) => set((s) => ({ flyTo: {
		lat,
		lng,
		zoom,
		nonce: (s.flyTo?.nonce ?? 0) + 1
	} }))
}), {
	name: "meridian-v1",
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : localStorage),
	partialize: (s) => ({
		saved: s.saved,
		mapStyle: s.mapStyle,
		lastView: s.lastView
	})
}));
function curatedList(filter) {
	if (filter === "all") return DESTINATIONS;
	return DESTINATIONS.filter((d) => d.category === filter);
}
var TABS = [
	{
		id: "explore",
		label: "Explore",
		icon: Compass
	},
	{
		id: "saved",
		label: "Saved",
		icon: Bookmark
	},
	{
		id: "route",
		label: "Route",
		icon: Route
	}
];
function SearchField({ autoFocus = false }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const boxRef = (0, import_react.useRef)(null);
	const selectHit = useMeridian((s) => s.selectHit);
	const selectPlace = useMeridian((s) => s.selectPlace);
	const localHits = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		if (query.length < 2) return [];
		return DESTINATIONS.filter((d) => d.name.toLowerCase().includes(query) || d.region.toLowerCase().includes(query)).slice(0, 4).map((d) => ({
			id: d.id,
			name: d.name,
			region: d.region,
			lat: d.lat,
			lng: d.lng
		}));
	}, [q]);
	(0, import_react.useEffect)(() => {
		const query = q.trim();
		if (query.length < 2) {
			setHits([]);
			setBusy(false);
			return;
		}
		const ctrl = new AbortController();
		const t = window.setTimeout(() => {
			setBusy(true);
			searchPlaces(query, ctrl.signal).then((rows) => {
				setHits(rows);
				setOpen(true);
			}).catch((err) => {
				if (err instanceof DOMException && err.name === "AbortError") return;
				setHits([]);
			}).finally(() => setBusy(false));
		}, 280);
		return () => {
			window.clearTimeout(t);
			ctrl.abort();
		};
	}, [q]);
	(0, import_react.useEffect)(() => {
		function onDoc(e) {
			if (!boxRef.current?.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: boxRef,
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				autoFocus,
				placeholder: "Search a city, peak, or street",
				"aria-label": "Search places",
				className: "pl-10 pr-10",
				onChange: (e) => {
					setQ(e.target.value);
					if (e.target.value.trim().length >= 2) setOpen(true);
				},
				onFocus: () => {
					if (q.trim().length >= 2) setOpen(true);
				},
				onKeyDown: (e) => {
					if (e.key === "Escape") {
						setOpen(false);
						e.target.blur();
					}
				}
			}),
			q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Clear search",
				className: "absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-muted hover:text-fg",
				onClick: () => {
					setQ("");
					setHits([]);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}) : null,
			open && (localHits.length > 0 || hits.length > 0 || busy) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "absolute top-[calc(100%+6px)] right-0 left-0 z-30 overflow-hidden rounded-md bg-elevated shadow-panel",
				children: busy && localHits.length === 0 && hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-3 text-sm text-muted",
					children: "Searching…"
				}) : [...localHits, ...hits.filter((h) => !localHits.some((l) => l.name === h.name && l.region === h.region))].slice(0, 7).map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-start gap-2.5 px-3 py-2.5 text-left hover:bg-surface",
					onClick: () => {
						const curated = DESTINATIONS.find((d) => d.id === hit.id);
						if (curated) selectPlace(curated);
						else selectHit(hit);
						setOpen(false);
						setQ(hit.name);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm text-fg",
							children: hit.name
						}), hit.region ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs text-muted",
							children: hit.region
						}) : null]
					})]
				}) }, hit.id))
			}) : null
		]
	});
}
function ExplorerBody() {
	const tab = useMeridian((s) => s.tab);
	const selected = useMeridian((s) => s.selected);
	const clearSelected = useMeridian((s) => s.clearSelected);
	if (selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: clearSelected,
			className: "mb-3 flex h-11 items-center gap-2 text-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceDetail, { place: selected })]
	});
	if (tab === "saved") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedList, {});
	if (tab === "route") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteForm, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExploreList, {});
}
function TabBar() {
	const tab = useMeridian((s) => s.tab);
	const setTab = useMeridian((s) => s.setTab);
	const clearSelected = useMeridian((s) => s.clearSelected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1 rounded-lg bg-elevated p-1",
		children: TABS.map((t) => {
			const Icon = t.icon;
			const active = tab === t.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					clearSelected();
					setTab(t.id);
				},
				className: cn("flex h-10 items-center justify-center gap-1.5 rounded-md text-xs font-medium transition-colors duration-150", active ? "bg-surface text-fg shadow-border" : "text-muted hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), t.label]
			}, t.id);
		})
	});
}
function ExploreList() {
	const filter = useMeridian((s) => s.filter);
	const setFilter = useMeridian((s) => s.setFilter);
	const selectPlace = useMeridian((s) => s.selectPlace);
	const places = (0, import_react.useMemo)(() => curatedList(filter), [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-1.5 overflow-x-auto pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
				active: filter === "all",
				onClick: () => setFilter("all"),
				children: "All"
			}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
				active: filter === c,
				onClick: () => setFilter(c),
				children: CATEGORY_LABEL[c]
			}, c))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "min-h-0 flex-1 space-y-1 overflow-y-auto pr-1",
			children: places.map((place, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "motion-safe:animate-rise",
				style: { animationDelay: `${Math.min(i, 12) * 40}ms` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => selectPlace(place),
					className: "flex w-full items-start gap-3 rounded-md px-2.5 py-2.5 text-left hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm bg-elevated text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-medium text-fg",
								children: place.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: CATEGORY_LABEL[place.category] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block truncate text-xs text-muted",
							children: place.region
						})]
					})]
				})
			}, place.id))
		})]
	});
}
function SavedList() {
	const saved = useMeridian((s) => s.saved);
	const selectPlace = useMeridian((s) => s.selectPlace);
	const toggleSave = useMeridian((s) => s.toggleSave);
	if (saved.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-start justify-center px-1 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-fg italic",
			children: "Nothing saved yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xs text-sm leading-relaxed text-muted",
			children: "Pin places from Explore or drop a marker on the map. They stay on this device."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "min-h-0 flex-1 space-y-1 overflow-y-auto pr-1",
		children: saved.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex min-w-0 flex-1 items-start gap-3 rounded-md px-2.5 py-2.5 text-left hover:bg-elevated",
				onClick: () => selectPlace({
					id: s.id,
					name: s.name,
					region: s.region,
					blurb: s.region,
					category: s.category,
					lat: s.lat,
					lng: s.lng,
					zoom: 14
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-sm font-medium text-fg",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-xs text-muted",
						children: s.region || formatCoord(s.lat, s.lng)
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				"aria-label": `Remove ${s.name}`,
				onClick: () => toggleSave({
					id: s.id,
					name: s.name,
					region: s.region,
					blurb: "",
					category: s.category,
					lat: s.lat,
					lng: s.lng,
					zoom: 14
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}, s.id))
	});
}
function PlaceDetail({ place }) {
	const saved = useMeridian((s) => s.isSaved(place.id));
	const toggleSave = useMeridian((s) => s.toggleSave);
	const setRouteTo = useMeridian((s) => s.setRouteTo);
	const setTab = useMeridian((s) => s.setTab);
	const userLocation = useMeridian((s) => s.userLocation);
	const setRouteFrom = useMeridian((s) => s.setRouteFrom);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "self-start",
				children: CATEGORY_LABEL[place.category]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-3xl leading-tight text-fg italic",
				children: place.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: place.region
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-fg/90",
				children: place.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-xs tabular-nums text-subtle",
				children: formatCoord(place.lat, place.lng)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: saved ? "secondary" : "default",
						onClick: () => {
							toggleSave(place);
							toast(saved ? "Removed from saved" : "Saved to this device");
						},
						children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {}), saved ? "Saved" : "Save place"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => {
							setRouteTo({
								name: place.name,
								lat: place.lat,
								lng: place.lng
							});
							if (userLocation) setRouteFrom({
								name: "My location",
								lat: userLocation.lat,
								lng: userLocation.lng
							});
							setTab("route");
							useMeridian.setState({
								selected: null,
								sheetOpen: true
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {}), "Route here"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: async () => {
							const text = `${place.name} — ${formatCoord(place.lat, place.lng)}`;
							try {
								await navigator.clipboard.writeText(text);
								toast("Coordinates copied");
							} catch {
								const el = document.createElement("textarea");
								el.value = text;
								el.setAttribute("readonly", "");
								el.style.position = "fixed";
								el.style.left = "-9999px";
								document.body.appendChild(el);
								el.select();
								const ok = document.execCommand("copy");
								el.remove();
								if (ok) toast("Coordinates copied");
								else toast.error("Could not copy");
							}
						},
						children: "Copy coordinates"
					})
				]
			})
		]
	});
}
function RouteForm() {
	const from = useMeridian((s) => s.routeFrom);
	const to = useMeridian((s) => s.routeTo);
	const picking = useMeridian((s) => s.picking);
	const setPicking = useMeridian((s) => s.setPicking);
	const setRouteFrom = useMeridian((s) => s.setRouteFrom);
	const setRouteTo = useMeridian((s) => s.setRouteTo);
	const route = useMeridian((s) => s.route);
	const status = useMeridian((s) => s.routeStatus);
	const setRoute = useMeridian((s) => s.setRoute);
	const setRouteStatus = useMeridian((s) => s.setRouteStatus);
	const userLocation = useMeridian((s) => s.userLocation);
	const setUserLocation = useMeridian((s) => s.setUserLocation);
	(0, import_react.useEffect)(() => {
		if (!from || !to) {
			setRoute(null);
			setRouteStatus("idle");
			return;
		}
		const ctrl = new AbortController();
		setRouteStatus("loading");
		fetchRoute(from, to, ctrl.signal).then((r) => {
			setRoute(r);
			setRouteStatus("idle");
		}).catch((err) => {
			if (err instanceof DOMException && err.name === "AbortError") return;
			setRoute(null);
			setRouteStatus("error");
		});
		return () => ctrl.abort();
	}, [
		from,
		to,
		setRoute,
		setRouteStatus
	]);
	function useMyLocation(which) {
		const apply = (lat, lng) => {
			const stop = {
				name: "My location",
				lat,
				lng
			};
			if (which === "from") setRouteFrom(stop);
			else setRouteTo(stop);
		};
		if (userLocation) {
			apply(userLocation.lat, userLocation.lng);
			return;
		}
		if (!navigator.geolocation) {
			toast.error("Location is not available.");
			return;
		}
		navigator.geolocation.getCurrentPosition((pos) => {
			const loc = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			};
			setUserLocation(loc);
			apply(loc.lat, loc.lng);
		}, () => toast.error("Could not read your location."), {
			enableHighAccuracy: true,
			timeout: 8e3
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StopField, {
				letter: "A",
				label: "From",
				stop: from,
				active: picking === "from",
				onPick: () => setPicking(picking === "from" ? null : "from"),
				onLocate: () => useMyLocation("from"),
				onClear: () => setRouteFrom(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-1 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Swap origin and destination",
					onClick: () => {
						setRouteFrom(to);
						setRouteTo(from);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StopField, {
				letter: "B",
				label: "To",
				stop: to,
				active: picking === "to",
				onPick: () => setPicking(picking === "to" ? null : "to"),
				onLocate: () => useMyLocation("to"),
				onClear: () => setRouteTo(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs leading-relaxed text-muted",
				children: picking ? "Tap the map to place this stop." : "Use your location, or tap the map after choosing a stop."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
			status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Tracing a line…"
			}) : null,
			status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: "Could not draw a route."
			}) : null,
			route ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl italic tabular-nums text-fg",
				children: formatDistance(route.distanceM)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: route.source === "road" ? formatDuration(route.durationS) || "Driving route" : "Great-circle line — no road route between these points"
			})] }) : null
		]
	});
}
function StopField({ letter, label, stop, active, onPick, onLocate, onClear }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md p-2.5 shadow-border", active && "shadow-border-hover bg-elevated"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 text-xs font-medium tracking-wide text-muted uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-5 items-center justify-center rounded-full bg-accent text-[10px] text-accent-fg",
					children: letter
				}), label]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": `Use my location as ${label}`,
					onClick: onLocate,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {})
				}), stop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": `Clear ${label}`,
					onClick: onClear,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onPick,
			className: "mt-1.5 w-full text-left text-sm text-fg",
			children: stop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate",
				children: stop.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-mono text-[11px] tabular-nums text-subtle",
				children: formatCoord(stop.lat, stop.lng)
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: active ? "Tap the map…" : "Choose on map"
			})
		})]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 shrink-0 rounded-full px-3 text-xs font-medium transition-colors duration-150", active ? "bg-fg text-bg" : "bg-elevated text-muted hover:text-fg"),
		children
	});
}
function CompassMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "13.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 5.5 L18.2 16 L16 26.5 L13.8 16 Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5.5 16 L16 13.8 L26.5 16 L16 18.2 Z",
				fill: "currentColor",
				opacity: "0.38"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "2.1",
				className: "fill-bg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "1.05",
				fill: "currentColor"
			})
		]
	});
}
function Wordmark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompassMark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("leading-none", compact && "hidden sm:block"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-xl italic tracking-tight text-fg",
				children: "Meridian"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-[10px] font-medium tracking-[0.18em] text-muted uppercase",
				children: "World atlas"
			})]
		})]
	});
}
var MAP_STYLES = {
	night: {
		label: "Night",
		url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
		attr: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OSM</a> &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
		subdomains: "abcd"
	},
	atlas: {
		label: "Atlas",
		url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
		attr: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OSM</a> &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
		subdomains: "abcd"
	},
	satellite: {
		label: "Satellite",
		url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
		attr: "Tiles &copy; Esri"
	}
};
var MAP_STYLE_ORDER = [
	"night",
	"atlas",
	"satellite"
];
function pinHtml(kind, label) {
	if (kind === "user") return `<div class="pin-user"><span class="pin-user-ring"></span><span class="pin-user-dot"></span></div>`;
	return `<div class="${kind === "saved" ? "pin pin-saved" : kind === "from" ? "pin pin-a" : kind === "to" ? "pin pin-b" : "pin"}">${label ? `<span class="pin-label">${label}</span>` : ""}<span class="pin-head"></span><span class="pin-stem"></span></div>`;
}
function MapCanvas() {
	const containerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const tilesRef = (0, import_react.useRef)(null);
	const layerRef = (0, import_react.useRef)(null);
	const routeRef = (0, import_react.useRef)(null);
	const LRef = (0, import_react.useRef)(null);
	const introRef = (0, import_react.useRef)(false);
	const mapStyle = useMeridian((s) => s.mapStyle);
	const selected = useMeridian((s) => s.selected);
	const saved = useMeridian((s) => s.saved);
	const flyTo = useMeridian((s) => s.flyTo);
	const route = useMeridian((s) => s.route);
	const routeFrom = useMeridian((s) => s.routeFrom);
	const routeTo = useMeridian((s) => s.routeTo);
	const userLocation = useMeridian((s) => s.userLocation);
	const picking = useMeridian((s) => s.picking);
	(0, import_react.useEffect)(() => {
		if (!containerRef.current) return;
		let cancelled = false;
		const onZoom = (e) => {
			const map = mapRef.current;
			if (!map) return;
			const delta = e.detail;
			map.setZoom(map.getZoom() + delta);
		};
		window.addEventListener("meridian:zoom", onZoom);
		(async () => {
			const mod = await import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
			const L = mod.default ?? mod;
			if (cancelled || !containerRef.current) return;
			LRef.current = L;
			const last = useMeridian.getState().lastView;
			const start = last ?? {
				lat: 20,
				lng: 8,
				zoom: 2
			};
			const map = L.map(containerRef.current, {
				zoomControl: false,
				attributionControl: true,
				minZoom: 2,
				maxZoom: 19,
				worldCopyJump: true
			}).setView([start.lat, start.lng], start.zoom);
			const style = MAP_STYLES[useMeridian.getState().mapStyle];
			const tiles = L.tileLayer(style.url, {
				attribution: style.attr,
				subdomains: style.subdomains ?? "abc",
				maxZoom: 19
			}).addTo(map);
			const markers = L.layerGroup().addTo(map);
			mapRef.current = map;
			tilesRef.current = tiles;
			layerRef.current = markers;
			map.attributionControl.setPrefix("");
			map.on("click", (e) => {
				const { lat, lng } = e.latlng;
				const state = useMeridian.getState();
				(async () => {
					let hit;
					try {
						hit = await reverseGeocode(lat, lng);
					} catch {
						hit = {
							id: `pin:${lat.toFixed(5)},${lng.toFixed(5)}`,
							name: "Dropped pin",
							region: "",
							lat,
							lng
						};
					}
					if (state.picking === "from") {
						state.setRouteFrom({
							name: hit.name,
							lat,
							lng
						});
						return;
					}
					if (state.picking === "to") {
						state.setRouteTo({
							name: hit.name,
							lat,
							lng
						});
						return;
					}
					state.selectPlace({
						id: hit.id,
						name: hit.name,
						region: hit.region,
						blurb: hit.region || "A point you marked on the map.",
						category: "pin",
						lat,
						lng,
						zoom: Math.max(map.getZoom(), 14)
					}, false);
				})();
			});
			map.on("moveend", () => {
				const c = map.getCenter();
				useMeridian.getState().setLastView({
					lat: c.lat,
					lng: c.lng,
					zoom: map.getZoom()
				});
			});
			if (!last && !introRef.current) {
				introRef.current = true;
				const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
				window.setTimeout(() => {
					if (!mapRef.current) return;
					if (reduce) map.setView([HOME.lat, HOME.lng], HOME.zoom);
					else map.flyTo([HOME.lat, HOME.lng], HOME.zoom, {
						duration: 2.1,
						easeLinearity: .25
					});
				}, 280);
			}
			syncMarkers(L, markers);
		})();
		return () => {
			cancelled = true;
			window.removeEventListener("meridian:zoom", onZoom);
			mapRef.current?.remove();
			mapRef.current = null;
			tilesRef.current = null;
			layerRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const L = LRef.current;
		if (!map || !L) return;
		const style = MAP_STYLES[mapStyle];
		tilesRef.current?.remove();
		const tiles = L.tileLayer(style.url, {
			attribution: style.attr,
			subdomains: style.subdomains ?? "abc",
			maxZoom: 19
		}).addTo(map);
		tilesRef.current = tiles;
	}, [mapStyle]);
	(0, import_react.useEffect)(() => {
		const L = LRef.current;
		const layer = layerRef.current;
		if (!L || !layer) return;
		syncMarkers(L, layer);
	}, [
		selected,
		saved,
		routeFrom,
		routeTo,
		userLocation
	]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const L = LRef.current;
		if (!map || !L) return;
		routeRef.current?.remove();
		routeRef.current = null;
		if (!route?.coords.length) return;
		const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "cadetblue";
		const line = L.polyline(route.coords, {
			color: accent,
			weight: 4,
			opacity: .92,
			lineJoin: "round",
			dashArray: route.source === "great-circle" ? "8 10" : void 0
		}).addTo(map);
		routeRef.current = line;
		map.fitBounds(line.getBounds(), {
			padding: [48, 48],
			maxZoom: 14
		});
	}, [route]);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		if (!map || !flyTo) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) map.setView([flyTo.lat, flyTo.lng], flyTo.zoom);
		else map.flyTo([flyTo.lat, flyTo.lng], flyTo.zoom, { duration: 1.15 });
	}, [flyTo]);
	(0, import_react.useEffect)(() => {
		if (picking) mapRef.current?.getContainer().style.setProperty("cursor", "crosshair");
		else mapRef.current?.getContainer().style.removeProperty("cursor");
	}, [picking]);
	function syncMarkers(L, layer) {
		layer.clearLayers();
		const state = useMeridian.getState();
		const icon = (kind, label) => L.divIcon({
			className: "meridian-divicon",
			html: pinHtml(kind, label),
			iconSize: kind === "user" ? [16, 16] : [22, 34],
			iconAnchor: kind === "user" ? [8, 8] : [11, 34]
		});
		const shown = /* @__PURE__ */ new Set();
		if (state.userLocation) L.marker([state.userLocation.lat, state.userLocation.lng], {
			icon: icon("user"),
			interactive: false,
			zIndexOffset: 400
		}).addTo(layer);
		for (const place of DESTINATIONS) {
			const mark = L.marker([place.lat, place.lng], {
				icon: icon(state.saved.some((s) => s.id === place.id) ? "saved" : "place"),
				zIndexOffset: 100
			});
			mark.on("click", (ev) => {
				L.DomEvent.stopPropagation(ev);
				useMeridian.getState().selectPlace(place, false);
			});
			mark.addTo(layer);
			shown.add(place.id);
		}
		for (const s of state.saved) {
			if (shown.has(s.id)) continue;
			const p = {
				id: s.id,
				name: s.name,
				region: s.region,
				blurb: s.region,
				category: s.category,
				lat: s.lat,
				lng: s.lng,
				zoom: 14
			};
			const mark = L.marker([s.lat, s.lng], {
				icon: icon("saved"),
				zIndexOffset: 200
			});
			mark.on("click", (ev) => {
				L.DomEvent.stopPropagation(ev);
				useMeridian.getState().selectPlace(p, false);
			});
			mark.addTo(layer);
			shown.add(s.id);
		}
		if (state.selected && !shown.has(state.selected.id)) L.marker([state.selected.lat, state.selected.lng], {
			icon: icon("place"),
			zIndexOffset: 300
		}).addTo(layer);
		if (state.routeFrom) L.marker([state.routeFrom.lat, state.routeFrom.lng], {
			icon: icon("from", "A"),
			zIndexOffset: 500
		}).addTo(layer);
		if (state.routeTo) L.marker([state.routeTo.lat, state.routeTo.lng], {
			icon: icon("to", "B"),
			zIndexOffset: 500
		}).addTo(layer);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "absolute inset-0 z-0 h-full w-full",
		role: "application",
		"aria-label": "World map"
	});
}
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 8, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-sm bg-elevated px-2.5 py-1.5 text-xs text-fg shadow-panel", "origin-[var(--radix-tooltip-content-transform-origin)]", "data-[state=delayed-open]:animate-rise data-[state=closed]:opacity-0", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
function MapControls() {
	const mapStyle = useMeridian((s) => s.mapStyle);
	const setMapStyle = useMeridian((s) => s.setMapStyle);
	const setUserLocation = useMeridian((s) => s.setUserLocation);
	const requestFly = useMeridian((s) => s.requestFly);
	const [open, setOpen] = (0, import_react.useState)(false);
	function locate() {
		if (!navigator.geolocation) {
			toast.error("Location is not available in this browser.");
			return;
		}
		navigator.geolocation.getCurrentPosition((pos) => {
			const loc = {
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			};
			setUserLocation(loc);
			requestFly(loc.lat, loc.lng, 14);
		}, () => toast.error("Could not read your location."), {
			enableHighAccuracy: true,
			timeout: 8e3
		});
	}
	function zoomBy(delta) {
		window.dispatchEvent(new CustomEvent("meridian:zoom", { detail: delta }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute top-20 right-3 z-20 flex flex-col items-end gap-2 md:top-4 md:right-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto flex flex-col overflow-hidden rounded-lg bg-surface shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlButton, {
						label: "Zoom in",
						onClick: () => zoomBy(1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlButton, {
						label: "Zoom out",
						onClick: () => zoomBy(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlButton, {
				label: "My location",
				onClick: locate,
				className: "pointer-events-auto rounded-lg bg-surface shadow-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locate, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlButton, {
					label: "Map style",
					onClick: () => setOpen((v) => !v),
					className: "rounded-lg bg-surface shadow-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {})
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-0 right-14 flex flex-col overflow-hidden rounded-md bg-surface shadow-panel",
					children: MAP_STYLE_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMapStyle(id);
							setOpen(false);
						},
						className: cn("h-11 min-w-32 px-3 text-left text-sm transition-colors duration-150", mapStyle === id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
						children: MAP_STYLES[id].label
					}, id))
				}) : null]
			})
		]
	});
}
function ControlButton({ label, onClick, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": label,
			onClick,
			className: cn("rounded-none", className),
			children
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "left",
		children: label
	})] });
}
function AppShell() {
	const sheetOpen = useMeridian((s) => s.sheetOpen);
	const setSheetOpen = useMeridian((s) => s.setSheetOpen);
	const picking = useMeridian((s) => s.picking);
	const lastView = useMeridian((s) => s.lastView);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			const tag = e.target?.tagName;
			if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
				e.preventDefault();
				const desktop = window.matchMedia("(min-width: 768px)").matches;
				document.querySelector(desktop ? "[data-search=\"desktop\"]" : "[data-search=\"mobile\"]")?.querySelector("input")?.focus();
			}
			if (e.key === "Escape") {
				useMeridian.getState().clearSelected();
				useMeridian.getState().setPicking(null);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const expanded = sheetOpen;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start gap-2 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto rounded-xl bg-surface px-3 py-2 shadow-panel md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { compact: true })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-search": "mobile",
					className: "pointer-events-auto min-w-0 flex-1 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl bg-surface p-1.5 shadow-panel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "pointer-events-none absolute top-4 bottom-4 left-4 z-20 hidden w-[360px] md:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex h-full w-full flex-col rounded-xl bg-surface p-4 shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-search": "desktop",
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex min-h-0 flex-1 flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerBody, {})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapControls, {}),
			picking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute top-[5.5rem] left-1/2 z-20 -translate-x-1/2 rounded-full bg-surface px-3.5 py-2 text-xs text-fg shadow-panel md:top-4",
				children: "Tap the map to set this stop"
			}) : null,
			lastView ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-3 left-[392px] z-20 hidden font-mono text-[11px] tabular-nums text-subtle md:block",
				children: formatCoord(lastView.lat, lastView.lng)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 z-20 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto mx-2 mb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-hidden rounded-xl bg-surface shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex h-8 w-full items-center justify-center",
							"aria-expanded": expanded,
							"aria-label": expanded ? "Collapse panel" : "Expand panel",
							onClick: () => setSheetOpen(!expanded),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-10 rounded-full bg-border" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {})
						}),
						expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[58vh] overflow-y-auto px-3 pb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex min-h-48 flex-col",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerBody, {})
							})
						}) : null
					]
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
		delayDuration: 250,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "top-center",
			offset: 80,
			toastOptions: { className: "bg-elevated text-fg shadow-panel border-0" }
		})]
	});
}
//#endregion
export { Home as component };
