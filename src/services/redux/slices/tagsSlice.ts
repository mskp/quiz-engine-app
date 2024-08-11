import { createSlice } from "@reduxjs/toolkit";

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

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
