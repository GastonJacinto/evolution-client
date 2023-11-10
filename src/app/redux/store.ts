import { configureStore } from '@reduxjs/toolkit';
import gymClassesSlice from './features/gymClassesSlice';
import drawerSelectorSlice from './features/drawerSelectorSlice';
import myProfileSlice from './features/userProfileSlice';
import instructorAndUsersSlice from './features/instructorsAndUsersSlice';
import allPlansSlice from './features/allPlansSlice';
export const store = configureStore({
  reducer: {
    gymClassesSlice,
    drawerSelectorSlice,
    myProfileSlice,
    instructorAndUsersSlice,
    allPlansSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
