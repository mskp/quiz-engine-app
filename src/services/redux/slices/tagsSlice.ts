import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    selectedTags: [],
  },
  reducers: {
    setTags(state, action) {
      state.selectedTags = action.payload;
    },
  },
});

export const selectSelectedTags = (state: RootState) => state.tags.selectedTags;

export const { setTags } = tagsSlice.actions;

export const tagsReducer = tagsSlice.reducer;

export default tagsReducer;
