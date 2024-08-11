import { calculateScore } from "@/lib/utils";
import { setUserAnswers } from "@/services/redux/slices/questionsSlice";
import { setScore } from "@/services/redux/slices/scoreSlice";
import { AppDispatch, RootState } from "@/services/redux/store";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const Quiz = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { matchedQuestions } = useSelector(
    (state: RootState) => state.questions
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<(string[] | string)[]>([]);

  const [timer, setTimer] = useState(30);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setSelectedOptions([]);
    setTimer(30);
  }, [currentQuestionIndex]);

  const handleOptionChange = (option: string) => {
    if (matchedQuestions[currentQuestionIndex].type === "single") {
      setSelectedOptions([option]);
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleNextQuestion = () => {
    const newAnswers = [...allAnswers];
    newAnswers[currentQuestionIndex] =
      selectedOptions.length === 1 ? selectedOptions[0] : selectedOptions;
    setAllAnswers(newAnswers);

    if (currentQuestionIndex < matchedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = calculateScore(newAnswers, matchedQuestions);
      dispatch(setScore(finalScore));
      dispatch(setUserAnswers(newAnswers));
      navigate({ to: "/final-score" });
    }
  };

  const handleSubmit = () => {
    const finalScore = calculateScore(allAnswers, matchedQuestions);
    dispatch(setScore(finalScore));
    dispatch(setUserAnswers(allAnswers));
    navigate({ to: "/final-score" });
  };

  if (!matchedQuestions || matchedQuestions.length === 0) {
    toast({
      title: "No questions found",
      description:
        "Either you haven’t selected any tags, or the tags you have selected don’t match any available questions.",
    });
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of {matchedQuestions.length}
          </h2>
          <span className="text-lg font-bold text-red-600">
            Time Left: {timer}s
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {matchedQuestions[currentQuestionIndex].question}
          </h2>
          <div className="space-y-2">
            {matchedQuestions[currentQuestionIndex].options.map(
              (option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                    selectedOptions.includes(option)
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-100"
                  }`}
                >
                  <input
                    type={
                      matchedQuestions[currentQuestionIndex].type === "single"
                        ? "radio"
                        : "checkbox"
                    }
                    name="options"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              )
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          {currentQuestionIndex === matchedQuestions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
