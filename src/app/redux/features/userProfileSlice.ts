import { UserType } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format, parseISO } from 'date-fns';

interface MyProfileState {
  myProfile: UserType;
}

const initialState: MyProfileState = {
  myProfile: {
    active: false,
    birth: '',
    createdAt: '',
    deletedAt: null,
    classes: [],
    dni: '',
    email: '',
    genre: '',
    id: '',
    image: '',
    lastname: '',
    name: '',
    phone: '',
    role: '',
  },
};

export const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    getProfile: (state, action: PayloadAction<UserType>) => {
      const formattedProfile: UserType = {
        ...action.payload,
        birth: format(parseISO(action.payload.birth), 'yyyy-MM-dd'),
        createdAt: format(
          parseISO(action.payload.createdAt),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        ),
      };
      state.myProfile = formattedProfile;
    },
  },
});

export const { getProfile } = myProfileSlice.actions;
export default myProfileSlice.reducer;
