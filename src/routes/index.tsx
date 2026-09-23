import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AppShell } from "@/components/meridian/app-shell";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <TooltipProvider delayDuration={250}>
      <AppShell />
      <Toaster
        theme="dark"
        position="top-center"
        offset={80}
        toastOptions={{
          className: "bg-elevated text-fg shadow-panel border-0",
        }}
      />
    </TooltipProvider>
  );
}
