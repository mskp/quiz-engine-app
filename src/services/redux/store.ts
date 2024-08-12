import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./slices/questionsSlice";
import scoreReducer from "./slices/scoreSlice";
import tagsReducer from "./slices/tagsSlice";

const store = configureStore({
  reducer: {
    tags: tagsReducer,
    questions: questionsReducer,
    score: scoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
