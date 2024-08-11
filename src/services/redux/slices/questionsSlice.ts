import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "@/data/data.json";

interface Question {
  question: string;
  options: string[];
  correct: string[];
  type: "single" | "multiple";
  tags: string[];
}

interface QuestionsState {
  allQuestions: Question[];
  matchedQuestions: Question[];
  userAnswers: (string[] | string)[];
}

const initialState: QuestionsState = {
  allQuestions: data.questions as Question[],
  matchedQuestions: [],
  userAnswers: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setMatchedQuestions(state, action: PayloadAction<Question[]>) {
      state.matchedQuestions = action.payload;
    },
    setUserAnswers(state, action: PayloadAction<(string[] | string)[]>) {
      state.userAnswers = action.payload;
    },
  },
});

export const { setMatchedQuestions, setUserAnswers } = questionsSlice.actions;

export default questionsSlice.reducer;
