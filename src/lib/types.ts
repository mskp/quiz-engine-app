export type Question = {
  question: string;
  options: string[];
  correct: string[];
  type: "single" | "multiple";
  tags: string[];
};
