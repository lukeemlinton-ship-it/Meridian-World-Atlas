import {
  ArrowLeft,
  ArrowUpDown,
  Bookmark,
  BookmarkCheck,
  Compass,
  MapPin,
  Navigation,
  Route as RouteIcon,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES, CATEGORY_LABEL, DESTINATIONS, type Category, type Place } from "@/lib/destinations";
import { fetchRoute, formatCoord, formatDistance, formatDuration, searchPlaces, type SearchHit } from "@/lib/geo";
import { curatedList, useMeridian, type PanelTab } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS: { id: PanelTab; label: string; icon: typeof Compass }[] = [
  { id: "explore", label: "Explore", icon: Compass },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "route", label: "Route", icon: RouteIcon },
];

export function SearchField({ autoFocus = false }: { autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const selectHit = useMeridian((s) => s.selectHit);
  const selectPlace = useMeridian((s) => s.selectPlace);

  const localHits = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    return DESTINATIONS.filter(
      (d) => d.name.toLowerCase().includes(query) || d.region.toLowerCase().includes(query),
    )
      .slice(0, 4)
      .map((d) => ({
        id: d.id,
        name: d.name,
        region: d.region,
        lat: d.lat,
        lng: d.lng,
      }));
  }, [q]);

  useEffect(() => {
    const query = q.trim();
    if (query.length < 2) {
      setHits([]);
      setBusy(false);
      return;
    }
    const ctrl = new AbortController();
    const t = window.setTimeout(() => {
      setBusy(true);
      void searchPlaces(query, ctrl.signal)
        .then((rows) => {
          setHits(rows);
          setOpen(true);
        })
        .catch((err) => {
          if (err instanceof DOMException && err.name === "AbortError") return;
          setHits([]);
        })
        .finally(() => setBusy(false));
    }, 280);
    return () => {
      window.clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
      <Input
        value={q}
        autoFocus={autoFocus}
        placeholder="Search a city, peak, or street"
        aria-label="Search places"
        className="pl-10 pr-10"
        onChange={(e) => {
          setQ(e.target.value);
          if (e.target.value.trim().length >= 2) setOpen(true);
        }}
        onFocus={() => {
          if (q.trim().length >= 2) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      {q ? (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-sm text-muted hover:text-fg"
          onClick={() => {
            setQ("");
            setHits([]);
          }}
        >
          <X className="size-4" />
        </button>
      ) : null}
      {open && (localHits.length > 0 || hits.length > 0 || busy) ? (
        <ul className="absolute top-[calc(100%+6px)] right-0 left-0 z-30 overflow-hidden rounded-md bg-elevated shadow-panel">
          {busy && localHits.length === 0 && hits.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">Searching…</li>
          ) : (
            [...localHits, ...hits.filter((h) => !localHits.some((l) => l.name === h.name && l.region === h.region))]
              .slice(0, 7)
              .map((hit) => (
              <li key={hit.id}>
                <button
                  type="button"
                  className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left hover:bg-surface"
                  onClick={() => {
                    const curated = DESTINATIONS.find((d) => d.id === hit.id);
                    if (curated) selectPlace(curated);
                    else selectHit(hit);
                    setOpen(false);
                    setQ(hit.name);
                  }}
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-fg">{hit.name}</span>
                    {hit.region ? (
                      <span className="block truncate text-xs text-muted">{hit.region}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

export function ExplorerBody() {
  const tab = useMeridian((s) => s.tab);
  const selected = useMeridian((s) => s.selected);
  const clearSelected = useMeridian((s) => s.clearSelected);

  if (selected) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <button
          type="button"
          onClick={clearSelected}
          className="mb-3 flex h-11 items-center gap-2 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
        <PlaceDetail place={selected} />
      </div>
    );
  }

  if (tab === "saved") return <SavedList />;
  if (tab === "route") return <RouteForm />;
  return <ExploreList />;
}

export function TabBar() {
  const tab = useMeridian((s) => s.tab);
  const setTab = useMeridian((s) => s.setTab);
  const clearSelected = useMeridian((s) => s.clearSelected);

  return (
    <div className="grid grid-cols-3 gap-1 rounded-lg bg-elevated p-1">
      {TABS.map((t) => {
        const Icon = t.icon;
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              clearSelected();
              setTab(t.id);
            }}
            className={cn(
              "flex h-10 items-center justify-center gap-1.5 rounded-md text-xs font-medium transition-colors duration-150",
              active ? "bg-surface text-fg shadow-border" : "text-muted hover:text-fg",
            )}
          >
            <Icon className="size-3.5" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function ExploreList() {
  const filter = useMeridian((s) => s.filter);
  const setFilter = useMeridian((s) => s.setFilter);
  const selectPlace = useMeridian((s) => s.selectPlace);
  const places = useMemo(() => curatedList(filter), [filter]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex gap-1.5 overflow-x-auto pb-3">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
            {CATEGORY_LABEL[c]}
          </FilterChip>
        ))}
      </div>
      <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
        {places.map((place, i) => (
          <li
            key={place.id}
            className="motion-safe:animate-rise"
            style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
          >
            <button
              type="button"
              onClick={() => selectPlace(place)}
              className="flex w-full items-start gap-3 rounded-md px-2.5 py-2.5 text-left hover:bg-elevated"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm bg-elevated text-accent">
                <MapPin className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-medium text-fg">{place.name}</span>
                  <Badge>{CATEGORY_LABEL[place.category]}</Badge>
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted">{place.region}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SavedList() {
  const saved = useMeridian((s) => s.saved);
  const selectPlace = useMeridian((s) => s.selectPlace);
  const toggleSave = useMeridian((s) => s.toggleSave);

  if (saved.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-start justify-center px-1 py-10">
        <p className="font-display text-2xl text-fg italic">Nothing saved yet.</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
          Pin places from Explore or drop a marker on the map. They stay on this device.
        </p>
      </div>
    );
  }

  return (
    <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
      {saved.map((s) => (
        <li key={s.id} className="flex items-center gap-1">
          <button
            type="button"
            className="flex min-w-0 flex-1 items-start gap-3 rounded-md px-2.5 py-2.5 text-left hover:bg-elevated"
            onClick={() =>
              selectPlace({
                id: s.id,
                name: s.name,
                region: s.region,
                blurb: s.region,
                category: s.category,
                lat: s.lat,
                lng: s.lng,
                zoom: 14,
              })
            }
          >
            <BookmarkCheck className="mt-0.5 size-4 shrink-0 text-accent" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-fg">{s.name}</span>
              <span className="block truncate text-xs text-muted">{s.region || formatCoord(s.lat, s.lng)}</span>
            </span>
          </button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Remove ${s.name}`}
            onClick={() =>
              toggleSave({
                id: s.id,
                name: s.name,
                region: s.region,
                blurb: "",
                category: s.category,
                lat: s.lat,
                lng: s.lng,
                zoom: 14,
              })
            }
          >
            <X />
          </Button>
        </li>
      ))}
    </ul>
  );
}

function PlaceDetail({ place }: { place: Place }) {
  const saved = useMeridian((s) => s.isSaved(place.id));
  const toggleSave = useMeridian((s) => s.toggleSave);
  const setRouteTo = useMeridian((s) => s.setRouteTo);
  const setTab = useMeridian((s) => s.setTab);
  const userLocation = useMeridian((s) => s.userLocation);
  const setRouteFrom = useMeridian((s) => s.setRouteFrom);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <Badge className="self-start">{CATEGORY_LABEL[place.category]}</Badge>
      <h2 className="mt-3 font-display text-3xl leading-tight text-fg italic">{place.name}</h2>
      <p className="mt-1 text-sm text-muted">{place.region}</p>
      <p className="mt-4 text-sm leading-relaxed text-fg/90">{place.blurb}</p>
      <p className="mt-4 font-mono text-xs tabular-nums text-subtle">{formatCoord(place.lat, place.lng)}</p>
      <div className="mt-6 flex flex-col gap-2">
        <Button
          variant={saved ? "secondary" : "default"}
          onClick={() => {
            toggleSave(place);
            toast(saved ? "Removed from saved" : "Saved to this device");
          }}
        >
          {saved ? <BookmarkCheck /> : <Bookmark />}
          {saved ? "Saved" : "Save place"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setRouteTo({ name: place.name, lat: place.lat, lng: place.lng });
            if (userLocation) {
              setRouteFrom({ name: "My location", lat: userLocation.lat, lng: userLocation.lng });
            }
            setTab("route");
            useMeridian.setState({ selected: null, sheetOpen: true });
          }}
        >
          <Navigation />
          Route here
        </Button>
        <Button
          variant="ghost"
          onClick={async () => {
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
          }}
        >
          Copy coordinates
        </Button>
      </div>
    </div>
  );
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

  useEffect(() => {
    if (!from || !to) {
      setRoute(null);
      setRouteStatus("idle");
      return;
    }
    const ctrl = new AbortController();
    setRouteStatus("loading");
    void fetchRoute(from, to, ctrl.signal)
      .then((r) => {
        setRoute(r);
        setRouteStatus("idle");
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setRoute(null);
        setRouteStatus("error");
      });
    return () => ctrl.abort();
  }, [from, to, setRoute, setRouteStatus]);

  function useMyLocation(which: "from" | "to") {
    const apply = (lat: number, lng: number) => {
      const stop = { name: "My location", lat, lng };
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
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        apply(loc.lat, loc.lng);
      },
      () => toast.error("Could not read your location."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <StopField
        letter="A"
        label="From"
        stop={from}
        active={picking === "from"}
        onPick={() => setPicking(picking === "from" ? null : "from")}
        onLocate={() => useMyLocation("from")}
        onClear={() => setRouteFrom(null)}
      />
      <div className="my-1 flex justify-center">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Swap origin and destination"
          onClick={() => {
            setRouteFrom(to);
            setRouteTo(from);
          }}
        >
          <ArrowUpDown />
        </Button>
      </div>
      <StopField
        letter="B"
        label="To"
        stop={to}
        active={picking === "to"}
        onPick={() => setPicking(picking === "to" ? null : "to")}
        onLocate={() => useMyLocation("to")}
        onClear={() => setRouteTo(null)}
      />
      <p className="mt-3 text-xs leading-relaxed text-muted">
        {picking ? "Tap the map to place this stop." : "Use your location, or tap the map after choosing a stop."}
      </p>
      <Separator className="my-4" />
      {status === "loading" ? <p className="text-sm text-muted">Tracing a line…</p> : null}
      {status === "error" ? <p className="text-sm text-danger">Could not draw a route.</p> : null}
      {route ? (
        <div>
          <p className="font-display text-3xl italic tabular-nums text-fg">{formatDistance(route.distanceM)}</p>
          <p className="mt-1 text-sm text-muted">
            {route.source === "road"
              ? formatDuration(route.durationS) || "Driving route"
              : "Great-circle line — no road route between these points"}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function StopField({
  letter,
  label,
  stop,
  active,
  onPick,
  onLocate,
  onClear,
}: {
  letter: string;
  label: string;
  stop: { name: string; lat: number; lng: number } | null;
  active: boolean;
  onPick: () => void;
  onLocate: () => void;
  onClear: () => void;
}) {
  return (
    <div className={cn("rounded-md p-2.5 shadow-border", active && "shadow-border-hover bg-elevated")}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted uppercase">
          <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] text-accent-fg">
            {letter}
          </span>
          {label}
        </span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm" aria-label={`Use my location as ${label}`} onClick={onLocate}>
            <Navigation />
          </Button>
          {stop ? (
            <Button variant="ghost" size="icon-sm" aria-label={`Clear ${label}`} onClick={onClear}>
              <X />
            </Button>
          ) : null}
        </div>
      </div>
      <button type="button" onClick={onPick} className="mt-1.5 w-full text-left text-sm text-fg">
        {stop ? (
          <>
            <span className="block truncate">{stop.name}</span>
            <span className="block font-mono text-[11px] tabular-nums text-subtle">
              {formatCoord(stop.lat, stop.lng)}
            </span>
          </>
        ) : (
          <span className="text-muted">{active ? "Tap the map…" : "Choose on map"}</span>
        )}
      </button>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 shrink-0 rounded-full px-3 text-xs font-medium transition-colors duration-150",
        active ? "bg-fg text-bg" : "bg-elevated text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
