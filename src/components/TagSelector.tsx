import data from "@/data/data.json";
import { cn } from "@/lib/utils";
import { setMatchedQuestions } from "@/services/redux/slices/questionsSlice";
import { setTags } from "@/services/redux/slices/tagsSlice";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";
import { toast } from "./ui/use-toast";

interface Question {
  question: string;
  options: string[];
  correct: string[];
  type: "single" | "multiple";
  tags: string[];
}

const TagSelection = () => {
  const [selectedTags, setSelectedTagsState] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    if (selectedTags.length >= 20 && !selectedTags.includes(tag)) {
      toast({
        title: "Cannot select more than 20 tags",
      });
      return;
    }

    if (selectedTags.includes(tag)) {
      setSelectedTagsState(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTagsState([...selectedTags, tag]);
    }
  };

  const filterQuestionsByTags = (): Question[] => {
    const allQuestions: Question[] = data.questions as Question[];

    const scoredQuestions = allQuestions.map((question) => {
      const matchCount = question.tags.reduce(
        (count, tag) => (selectedTags.includes(tag) ? count + 1 : count),
        0
      );
      return { ...question, matchCount };
    });

    const filteredQuestions = scoredQuestions.filter(
      (question) => question.matchCount > 0
    );

    const sortedQuestions = filteredQuestions.sort(
      (a, b) => b.matchCount - a.matchCount
    );

    const topQuestions = sortedQuestions.slice(
      0,
      Math.min(10, sortedQuestions.length)
    );

    return topQuestions;
  };

  const handleStartQuiz = () => {
    if (selectedTags.length < 3) {
      return toast({
        title: "Please select at least 3 tags.",
      });
    }

    const matchedQuestions = filterQuestionsByTags();
    dispatch(setTags(selectedTags));
    dispatch(setMatchedQuestions(matchedQuestions));
    navigate({ to: "/quiz" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Select Up to 20 Tags
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {data.uniqueTags.map((tag, index) => {
          return (
            <Toggle
              key={`${index}-${tag}`}
              onClick={() => handleTagClick(tag)}
              className={cn(
                "px-4 py-2 rounded-md border border-gray-300 shadow-sm cursor-pointer transition duration-300 ease-in-out hover:bg-blue-400 hover:text-white focus:outline-none bg-gray-100 text-gray-800",
                { "!bg-blue-600 !text-white": selectedTags.includes(tag) }
              )}
            >
              {tag}
            </Toggle>
          );
        })}
      </div>
      <Button onClick={handleStartQuiz} className="w-full">
        Start Quiz
      </Button>
    </div>
  );
};

export default TagSelection;
