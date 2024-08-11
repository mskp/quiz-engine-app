import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const { setScore } = scoreSlice.actions;

export default scoreSlice.reducer;
