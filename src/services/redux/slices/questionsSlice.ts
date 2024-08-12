import data from "@/data/data.json";
import { Question } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

export const selectMatchedQuestions = (state: RootState) =>
  state.questions.matchedQuestions;

export const { setMatchedQuestions, setUserAnswers } = questionsSlice.actions;

const questionsReducer = questionsSlice.reducer;

export default questionsReducer;
