import { PlanType } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

export const plansSlice = createSlice({
  name: 'allPlansState',
  initialState: {
    allPlans: [] as PlanType[],
  },
  reducers: {
    loadAllPlans: (state, action) => {
      state.allPlans = action.payload;
    },
  },
});

export const { loadAllPlans } = plansSlice.actions;
export default plansSlice.reducer;
