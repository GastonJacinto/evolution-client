import { configureStore } from '@reduxjs/toolkit';
import myClassesSlice from './features/myClassesSlice';
import drawerSelectorSlice from './features/drawerSelectorSlice';
import myProfileSlice from './features/userProfileSlice';
export const store = configureStore({
  reducer: {
    myClassesSlice,
    drawerSelectorSlice,
    myProfileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
