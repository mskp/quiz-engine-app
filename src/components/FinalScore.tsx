import { selectScore } from "@/services/redux/slices/scoreSlice";
import { RootState } from "@/services/redux/store";
import { Navigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { toast } from "./ui/use-toast";

const FinalScore = () => {
  const score = useSelector(selectScore);
  const selectedTags = useSelector(
    (state: RootState) => state.tags.selectedTags
  );

  if (!selectedTags.length) {
    toast({
      title: "Please select tags",
    });
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Quiz Completed!
        </h1>
        <p className="text-2xl text-gray-700 mb-4">Your Final Score:</p>
        <div className="text-5xl font-extrabold text-blue-600 mb-6">
          {score}
        </div>
      </div>
    </div>
  );
};

export default FinalScore;
