import { createFileRoute } from "@tanstack/react-router";
import Custom404Page from "./404";

export const Route = createFileRoute("/$")({
  component: Custom404Page,
});
