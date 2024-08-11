import TagSelection from "@/components/TagSelector";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: TagSelection,
});
