import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from "./slices/tagsSlice";
import questionsReducer from "./slices/questionsSlice";
import scoreReducer from "./slices/scoreSlice";

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
