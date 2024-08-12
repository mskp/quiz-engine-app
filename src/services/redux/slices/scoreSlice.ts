import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ScoreState {
  score: number;
}

const initialState: ScoreState = {
  score: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
  },
});

export const selectScore = (state: RootState) => state.score.score;

export const { setScore } = scoreSlice.actions;

const scoreReducer = scoreSlice.reducer;

export default scoreReducer;
