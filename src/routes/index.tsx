import { createFileRoute } from "@tanstack/react-router";
import SkyNowHome from "@/components/skynow/SkyNowHome";

export const Route = createFileRoute("/")({
  component: SkyNowHome,
});