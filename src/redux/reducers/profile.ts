import type { RootState } from "../store/index";


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



export const profileReducer = (state = initialState ,action : any) => {
  switch(action.type){
    case "SET_PROFILE":
      return action.payload;
    default:
      return state;
  }
}

export const selectProfile = (state: RootState) => state.profile;

