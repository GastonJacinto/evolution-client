import { InstructorType, UserType } from '@/utils/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const InstructorsAndUsersSlice = createSlice({
  name: 'usersAndInstructors',
  initialState: {
    users: [] as UserType[],
    instructors: [] as InstructorType[],
  },
  reducers: {
    loadInstructors: (state, action: PayloadAction<InstructorType[]>) => {
      state.instructors = action.payload;
    },
    loadUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
  },
});

export const { loadInstructors, loadUsers } = InstructorsAndUsersSlice.actions;
export default InstructorsAndUsersSlice.reducer;
