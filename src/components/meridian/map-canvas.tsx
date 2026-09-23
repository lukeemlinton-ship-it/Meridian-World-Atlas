import { useEffect, useRef } from "react";
import { DESTINATIONS, HOME, type Place } from "@/lib/destinations";
import { reverseGeocode } from "@/lib/geo";
import { MAP_STYLES } from "@/lib/map-tiles";
import { useMeridian } from "@/lib/store";

type LeafletNS = typeof import("leaflet");

function pinHtml(kind: "place" | "saved" | "from" | "to" | "user", label?: string) {
  if (kind === "user") {
    return `<div class="pin-user"><span class="pin-user-ring"></span><span class="pin-user-dot"></span></div>`;
  }
  const cls = kind === "saved" ? "pin pin-saved" : kind === "from" ? "pin pin-a" : kind === "to" ? "pin pin-b" : "pin";
  const tag = label ? `<span class="pin-label">${label}</span>` : "";
  return `<div class="${cls}">${tag}<span class="pin-head"></span><span class="pin-stem"></span></div>`;
}

export function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const tilesRef = useRef<import("leaflet").TileLayer | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const routeRef = useRef<import("leaflet").Polyline | null>(null);
  const LRef = useRef<LeafletNS | null>(null);
  const introRef = useRef(false);

  const mapStyle = useMeridian((s) => s.mapStyle);
  const selected = useMeridian((s) => s.selected);
  const saved = useMeridian((s) => s.saved);
  const flyTo = useMeridian((s) => s.flyTo);
  const route = useMeridian((s) => s.route);
  const routeFrom = useMeridian((s) => s.routeFrom);
  const routeTo = useMeridian((s) => s.routeTo);
  const userLocation = useMeridian((s) => s.userLocation);
  const picking = useMeridian((s) => s.picking);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;

    const onZoom = (e: Event) => {
      const map = mapRef.current;
      if (!map) return;
      const delta = (e as CustomEvent<number>).detail;
      map.setZoom(map.getZoom() + delta);
    };
    window.addEventListener("meridian:zoom", onZoom);

    void (async () => {
      const mod = await import("leaflet");
      const L = (mod as unknown as { default?: LeafletNS }).default ?? mod;
      if (cancelled || !containerRef.current) return;
      LRef.current = L;

      const last = useMeridian.getState().lastView;
      const start = last ?? { lat: 20, lng: 8, zoom: 2 };
      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        minZoom: 2,
        maxZoom: 19,
        worldCopyJump: true,
      }).setView([start.lat, start.lng], start.zoom);

      const style = MAP_STYLES[useMeridian.getState().mapStyle];
      const tiles = L.tileLayer(style.url, {
        attribution: style.attr,
        subdomains: style.subdomains ?? "abc",
        maxZoom: 19,
      }).addTo(map);

      const markers = L.layerGroup().addTo(map);
      mapRef.current = map;
      tilesRef.current = tiles;
      layerRef.current = markers;

      map.attributionControl.setPrefix("");

      map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
        const { lat, lng } = e.latlng;
        const state = useMeridian.getState();
        void (async () => {
          let hit;
          try {
            hit = await reverseGeocode(lat, lng);
          } catch {
            hit = {
              id: `pin:${lat.toFixed(5)},${lng.toFixed(5)}`,
              name: "Dropped pin",
              region: "",
              lat,
              lng,
            };
          }
          if (state.picking === "from") {
            state.setRouteFrom({ name: hit.name, lat, lng });
            return;
          }
          if (state.picking === "to") {
            state.setRouteTo({ name: hit.name, lat, lng });
            return;
          }
          state.selectPlace(
            {
              id: hit.id,
              name: hit.name,
              region: hit.region,
              blurb: hit.region || "A point you marked on the map.",
              category: "pin",
              lat,
              lng,
              zoom: Math.max(map.getZoom(), 14),
            },
            false,
          );
        })();
      });

      map.on("moveend", () => {
        const c = map.getCenter();
        useMeridian.getState().setLastView({ lat: c.lat, lng: c.lng, zoom: map.getZoom() });
      });

      if (!last && !introRef.current) {
        introRef.current = true;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.setTimeout(() => {
          if (!mapRef.current) return;
          if (reduce) map.setView([HOME.lat, HOME.lng], HOME.zoom);
          else map.flyTo([HOME.lat, HOME.lng], HOME.zoom, { duration: 2.1, easeLinearity: 0.25 });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- map is created once
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;
    const style = MAP_STYLES[mapStyle];
    tilesRef.current?.remove();
    const tiles = L.tileLayer(style.url, {
      attribution: style.attr,
      subdomains: style.subdomains ?? "abc",
      maxZoom: 19,
    }).addTo(map);
    tilesRef.current = tiles;
  }, [mapStyle]);

  useEffect(() => {
    const L = LRef.current;
    const layer = layerRef.current;
    if (!L || !layer) return;
    syncMarkers(L, layer);
  }, [selected, saved, routeFrom, routeTo, userLocation]);

  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;
    routeRef.current?.remove();
    routeRef.current = null;
    if (!route?.coords.length) return;
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() ||
      "cadetblue";
    const line = L.polyline(route.coords, {
      color: accent,
      weight: 4,
      opacity: 0.92,
      lineJoin: "round",
      dashArray: route.source === "great-circle" ? "8 10" : undefined,
    }).addTo(map);
    routeRef.current = line;
    map.fitBounds(line.getBounds(), { padding: [48, 48], maxZoom: 14 });
  }, [route]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyTo) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) map.setView([flyTo.lat, flyTo.lng], flyTo.zoom);
    else map.flyTo([flyTo.lat, flyTo.lng], flyTo.zoom, { duration: 1.15 });
  }, [flyTo]);

  useEffect(() => {
    if (picking) {
      mapRef.current?.getContainer().style.setProperty("cursor", "crosshair");
    } else {
      mapRef.current?.getContainer().style.removeProperty("cursor");
    }
  }, [picking]);

  function syncMarkers(L: LeafletNS, layer: import("leaflet").LayerGroup) {
    layer.clearLayers();
    const state = useMeridian.getState();
    const icon = (kind: "place" | "saved" | "from" | "to" | "user", label?: string) =>
      L.divIcon({
        className: "meridian-divicon",
        html: pinHtml(kind, label),
        iconSize: kind === "user" ? [16, 16] : [22, 34],
        iconAnchor: kind === "user" ? [8, 8] : [11, 34],
      });

    const shown = new Set<string>();

    if (state.userLocation) {
      L.marker([state.userLocation.lat, state.userLocation.lng], {
        icon: icon("user"),
        interactive: false,
        zIndexOffset: 400,
      }).addTo(layer);
    }

    for (const place of DESTINATIONS) {
      const mark = L.marker([place.lat, place.lng], {
        icon: icon(state.saved.some((s) => s.id === place.id) ? "saved" : "place"),
        zIndexOffset: 100,
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
      const p: Place = {
        id: s.id,
        name: s.name,
        region: s.region,
        blurb: s.region,
        category: s.category,
        lat: s.lat,
        lng: s.lng,
        zoom: 14,
      };
      const mark = L.marker([s.lat, s.lng], { icon: icon("saved"), zIndexOffset: 200 });
      mark.on("click", (ev) => {
        L.DomEvent.stopPropagation(ev);
        useMeridian.getState().selectPlace(p, false);
      });
      mark.addTo(layer);
      shown.add(s.id);
    }

    if (state.selected && !shown.has(state.selected.id)) {
      const mark = L.marker([state.selected.lat, state.selected.lng], {
        icon: icon("place"),
        zIndexOffset: 300,
      });
      mark.addTo(layer);
    }

    if (state.routeFrom) {
      L.marker([state.routeFrom.lat, state.routeFrom.lng], {
        icon: icon("from", "A"),
        zIndexOffset: 500,
      }).addTo(layer);
    }
    if (state.routeTo) {
      L.marker([state.routeTo.lat, state.routeTo.lng], {
        icon: icon("to", "B"),
        zIndexOffset: 500,
      }).addTo(layer);
    }
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full"
      role="application"
      aria-label="World map"
    />
  );
}
