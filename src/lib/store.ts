import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DESTINATIONS, type Category, type Place } from "@/lib/destinations";
import type { MapStyleId } from "@/lib/map-tiles";
import type { RouteResult, SearchHit } from "@/lib/geo";

export type PanelTab = "explore" | "saved" | "route";
export type Picking = "from" | "to" | null;

export type SavedPlace = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  category: Category;
  savedAt: number;
};

export type Stop = {
  name: string;
  lat: number;
  lng: number;
} | null;

export type FlyTo = {
  lat: number;
  lng: number;
  zoom: number;
  nonce: number;
};

type Persisted = {
  saved: SavedPlace[];
  mapStyle: MapStyleId;
  lastView: { lat: number; lng: number; zoom: number } | null;
};

type State = Persisted & {
  selected: Place | null;
  tab: PanelTab;
  filter: Category | "all";
  mapStyle: MapStyleId;
  flyTo: FlyTo | null;
  userLocation: { lat: number; lng: number } | null;
  routeFrom: Stop;
  routeTo: Stop;
  route: RouteResult | null;
  routeStatus: "idle" | "loading" | "error";
  picking: Picking;
  sheetOpen: boolean;
  setTab: (tab: PanelTab) => void;
  setFilter: (filter: Category | "all") => void;
  setMapStyle: (style: MapStyleId) => void;
  setLastView: (view: { lat: number; lng: number; zoom: number }) => void;
  selectPlace: (place: Place, fly?: boolean) => void;
  selectHit: (hit: SearchHit) => void;
  clearSelected: () => void;
  toggleSave: (place: Place) => void;
  isSaved: (id: string) => boolean;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;
  setRouteFrom: (stop: Stop) => void;
  setRouteTo: (stop: Stop) => void;
  setRoute: (route: RouteResult | null) => void;
  setRouteStatus: (status: State["routeStatus"]) => void;
  setPicking: (picking: Picking) => void;
  setSheetOpen: (open: boolean) => void;
  requestFly: (lat: number, lng: number, zoom?: number) => void;
};

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};

function asPlace(hit: SearchHit, category: Category): Place {
  return {
    id: hit.id,
    name: hit.name,
    region: hit.region,
    blurb: hit.region || "A place on the map.",
    category,
    lat: hit.lat,
    lng: hit.lng,
    zoom: 14,
  };
}

export const useMeridian = create<State>()(
  persist(
    (set, get) => ({
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
      setTab: (tab) => set({ tab, sheetOpen: true }),
      setFilter: (filter) => set({ filter }),
      setMapStyle: (mapStyle) => set({ mapStyle }),
      setLastView: (lastView) => set({ lastView }),
      selectPlace: (place, fly = true) =>
        set((s) => ({
          selected: place,
          sheetOpen: true,
          flyTo: fly ? { lat: place.lat, lng: place.lng, zoom: place.zoom, nonce: (s.flyTo?.nonce ?? 0) + 1 } : s.flyTo,
        })),
      selectHit: (hit) => get().selectPlace(asPlace(hit, "search")),
      clearSelected: () => set({ selected: null }),
      toggleSave: (place) => {
        const exists = get().saved.some((p) => p.id === place.id);
        if (exists) {
          set({ saved: get().saved.filter((p) => p.id !== place.id) });
          return;
        }
        const next: SavedPlace = {
          id: place.id,
          name: place.name,
          region: place.region,
          lat: place.lat,
          lng: place.lng,
          category: place.category,
          savedAt: Date.now(),
        };
        set({ saved: [next, ...get().saved] });
      },
      isSaved: (id) => get().saved.some((p) => p.id === id),
      setUserLocation: (userLocation) => set({ userLocation }),
      setRouteFrom: (routeFrom) => set({ routeFrom, picking: null }),
      setRouteTo: (routeTo) => set({ routeTo, picking: null }),
      setRoute: (route) => set({ route }),
      setRouteStatus: (routeStatus) => set({ routeStatus }),
      setPicking: (picking) => set({ picking, tab: picking ? "route" : get().tab }),
      setSheetOpen: (sheetOpen) => set({ sheetOpen }),
      requestFly: (lat, lng, zoom = 13) =>
        set((s) => ({ flyTo: { lat, lng, zoom, nonce: (s.flyTo?.nonce ?? 0) + 1 } })),
    }),
    {
      name: "meridian-v1",
      storage: createJSONStorage(() => (typeof window === "undefined" ? memoryStorage : localStorage)),
      partialize: (s) => ({ saved: s.saved, mapStyle: s.mapStyle, lastView: s.lastView }),
    },
  ),
);

export function curatedList(filter: Category | "all"): Place[] {
  if (filter === "all") return DESTINATIONS;
  return DESTINATIONS.filter((d) => d.category === filter);
}
