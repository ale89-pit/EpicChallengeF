import type { RootState } from "../store/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SET_PROFILE } from "../actions/index";

export interface Profile {
  id: number | null;
  name: string;
  fullname: string;
  username: string;
  email: string;
  phone: number | null;
  address: any | null;
  isActive: boolean;
  roles: { id: number; roleName: string }[];
  booklist: {};
}

const initialState: { profile: Profile } = {
  profile: {
    id: null,
    name: "",
    fullname: "",
    username: "",
    email: "",
    phone: null,
    address: "",
    isActive: false,
    roles: [],
    booklist: {},
  },
};

export const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});
export const { setProfile } = profileReducer.actions;
export const selectProfile = (state: RootState) => state.profile;
export default profileReducer.reducer;
