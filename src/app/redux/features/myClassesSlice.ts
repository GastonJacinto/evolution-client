import { createSlice } from '@reduxjs/toolkit';

export const myClassesSlice = createSlice({
  name: 'myClasses',
  initialState: {
    myClasses: [],
  },
  reducers: {
    getClasses: (state, classes) => {
      state.myClasses = classes.payload;
    },
  },
});

export const { getClasses } = myClassesSlice.actions;
export default myClassesSlice.reducer;
