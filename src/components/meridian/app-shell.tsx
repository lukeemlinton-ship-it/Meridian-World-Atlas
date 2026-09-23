import { useEffect } from "react";
import { ExplorerBody, SearchField, TabBar } from "@/components/meridian/explorer-panel";
import { Wordmark } from "@/components/meridian/logo";
import { MapCanvas } from "@/components/meridian/map-canvas";
import { MapControls } from "@/components/meridian/map-controls";
import { formatCoord } from "@/lib/geo";
import { useMeridian } from "@/lib/store";

export function AppShell() {
  const sheetOpen = useMeridian((s) => s.sheetOpen);
  const setSheetOpen = useMeridian((s) => s.setSheetOpen);
  const picking = useMeridian((s) => s.picking);
  const lastView = useMeridian((s) => s.lastView);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        const desktop = window.matchMedia("(min-width: 768px)").matches;
        const root = document.querySelector(
          desktop ? '[data-search="desktop"]' : '[data-search="mobile"]',
        );
        root?.querySelector("input")?.focus();
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

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      <MapCanvas />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start gap-2 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:p-4">
        <div className="pointer-events-auto rounded-xl bg-surface px-3 py-2 shadow-panel md:hidden">
          <Wordmark compact />
        </div>
        <div data-search="mobile" className="pointer-events-auto min-w-0 flex-1 md:hidden">
          <div className="rounded-xl bg-surface p-1.5 shadow-panel">
            <SearchField />
          </div>
        </div>
      </header>

      <aside className="pointer-events-none absolute top-4 bottom-4 left-4 z-20 hidden w-[360px] md:flex">
        <div className="pointer-events-auto flex h-full w-full flex-col rounded-xl bg-surface p-4 shadow-panel">
          <Wordmark />
          <div data-search="desktop" className="mt-5">
            <SearchField />
          </div>
          <div className="mt-4">
            <TabBar />
          </div>
          <div className="mt-4 flex min-h-0 flex-1 flex-col">
            <ExplorerBody />
          </div>
        </div>
      </aside>

      <MapControls />

      {picking ? (
        <div className="pointer-events-none absolute top-[5.5rem] left-1/2 z-20 -translate-x-1/2 rounded-full bg-surface px-3.5 py-2 text-xs text-fg shadow-panel md:top-4">
          Tap the map to set this stop
        </div>
      ) : null}

      {lastView ? (
        <div className="pointer-events-none absolute bottom-3 left-[392px] z-20 hidden font-mono text-[11px] tabular-nums text-subtle md:block">
          {formatCoord(lastView.lat, lastView.lng)}
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 md:hidden">
        <div className="pointer-events-auto mx-2 mb-[max(0.5rem,env(safe-area-inset-bottom))] overflow-hidden rounded-xl bg-surface shadow-panel">
          <button
            type="button"
            className="flex h-8 w-full items-center justify-center"
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse panel" : "Expand panel"}
            onClick={() => setSheetOpen(!expanded)}
          >
            <span className="h-1 w-10 rounded-full bg-border" />
          </button>
          <div className="px-3 pb-2">
            <TabBar />
          </div>
          {expanded ? (
            <div className="max-h-[58vh] overflow-y-auto px-3 pb-3">
              <div className="flex min-h-48 flex-col">
                <ExplorerBody />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
