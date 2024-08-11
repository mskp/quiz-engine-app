import FinalScore from "@/components/FinalScore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/final-score")({
  component: FinalScore,
});
