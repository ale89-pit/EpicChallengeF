import type { RootState } from "../store/index";
import {UPDATE_PROFILE_FIELD} from "../actions/index";
import { Address } from "../../interfaces/Address";

export interface Profile {
  id: number | null;
  name: string;
  fullname: string;
  username: string;
  email: string;
  phone: string ;
  address: Address,
  isActive: boolean;
  roles: { id: number; roleName: string }[];
  booklist: {};
 
}

export const initialState: { profile: Profile } = {
  profile: {
    id: null,
    name: "",
    fullname: "",
    username: "",
    email: "",
    phone: "",
    address: {
      id: null,
      municipality: {
        id: "",
        province_id:"",
        municipality_id:"",
        name: "",
        province: {
          
          sign: "",
          name: "",
          region: "",
        }
      },
      street: "",
      number: "",
      km: "",
      description: "",
      lat: "",
      lon: "",
    },
    isActive: false,
    roles: [],
    booklist: {},
  },
 
};

export const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_PROFILE":
      return action.payload;
    case UPDATE_PROFILE_FIELD:
      return {

        profile: {
          ...state.profile,
        [action.fieldName]: action.value
      }
    } 
    default:
      return state;
  }
};

export const selectProfile = (state: RootState) => state.profile;
