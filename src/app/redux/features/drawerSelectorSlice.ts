import { createSlice } from '@reduxjs/toolkit';

export const drawerSelectorSlice = createSlice({
  name: 'drawerSelector',
  initialState: {
    tab: 1,
  },
  reducers: {
    changeTab: (state, tab) => {
      state.tab = tab.payload;
    },
  },
});
export const { changeTab } = drawerSelectorSlice.actions;
export default drawerSelectorSlice.reducer;
