import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Question {
  correct: string[];
  type: "single" | "multiple";
}

/**
 * Calculates the score based on the provided answers and questions.
 *
 * Each question carries 4 marks.
 *
 * Scoring Criteria:
 * - For single-answer questions:
 *   - +4 marks for a correct answer.
 *   - -2 marks for a wrong answer.
 *
 * - For multiple-answer questions:
 *   - +4 marks if all correct options are selected.
 *   - +1 mark for each correct option selected.
 *   - -1 mark for each incorrect option selected.
 *
 * @returns The total score calculated based on the answers provided.
 */
export const calculateScore = (
  answers: (string | string[])[],
  questions: Question[]
): number => {
  let score = 0;

  answers.forEach((answer, index) => {
    const question = questions[index];

    if (question.type === "single") {
      if (typeof answer === "string") {
        score += answer === question.correct[0] ? 4 : -2;
      }
    } else if (question.type === "multiple") {
      if (Array.isArray(answer)) {
        const correctAnswers = new Set(question.correct);
        const userAnswers = new Set(answer);

        userAnswers.forEach((option) => {
          score += correctAnswers.has(option) ? 1 : -1;
        });

        if (
          [...correctAnswers].every((correctOption) =>
            userAnswers.has(correctOption)
          )
        ) {
          score += 4;
        }
      }
    }
  });

  return score;
};
