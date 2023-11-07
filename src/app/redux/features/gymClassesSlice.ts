import { GymClassType } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

export const gymClassesSlice = createSlice({
  name: 'classesState',
  initialState: {
    myClasses: [] as GymClassType[],
    allClasses: [] as GymClassType[],
  },
  reducers: {
    loadMyClasses: (state, action) => {
      state.myClasses = action.payload;
    },
    loadAllClasses: (state, action) => {
      state.allClasses = action.payload;
    },
  },
});

export const { loadMyClasses, loadAllClasses } = gymClassesSlice.actions;
export default gymClassesSlice.reducer;
