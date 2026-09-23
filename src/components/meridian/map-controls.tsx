import { Layers, Locate, Minus, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MAP_STYLE_ORDER, MAP_STYLES } from "@/lib/map-tiles";
import { useMeridian } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MapControls() {
  const mapStyle = useMeridian((s) => s.mapStyle);
  const setMapStyle = useMeridian((s) => s.setMapStyle);
  const setUserLocation = useMeridian((s) => s.setUserLocation);
  const requestFly = useMeridian((s) => s.requestFly);
  const [open, setOpen] = useState(false);

  function locate() {
    if (!navigator.geolocation) {
      toast.error("Location is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        requestFly(loc.lat, loc.lng, 14);
      },
      () => toast.error("Could not read your location."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function zoomBy(delta: number) {
    window.dispatchEvent(new CustomEvent("meridian:zoom", { detail: delta }));
  }

  return (
    <div className="pointer-events-none absolute top-20 right-3 z-20 flex flex-col items-end gap-2 md:top-4 md:right-4">
      <div className="pointer-events-auto flex flex-col overflow-hidden rounded-lg bg-surface shadow-panel">
        <ControlButton label="Zoom in" onClick={() => zoomBy(1)}>
          <Plus />
        </ControlButton>
        <div className="h-px bg-border" />
        <ControlButton label="Zoom out" onClick={() => zoomBy(-1)}>
          <Minus />
        </ControlButton>
      </div>
      <ControlButton
        label="My location"
        onClick={locate}
        className="pointer-events-auto rounded-lg bg-surface shadow-panel"
      >
        <Locate />
      </ControlButton>
      <div className="pointer-events-auto relative">
        <ControlButton
          label="Map style"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg bg-surface shadow-panel"
        >
          <Layers />
        </ControlButton>
        {open ? (
          <div className="absolute top-0 right-14 flex flex-col overflow-hidden rounded-md bg-surface shadow-panel">
            {MAP_STYLE_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMapStyle(id);
                  setOpen(false);
                }}
                className={cn(
                  "h-11 min-w-32 px-3 text-left text-sm transition-colors duration-150",
                  mapStyle === id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg",
                )}
              >
                {MAP_STYLES[id].label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={label}
          onClick={onClick}
          className={cn("rounded-none", className)}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">{label}</TooltipContent>
    </Tooltip>
  );
}
