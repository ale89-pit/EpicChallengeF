import { Profile } from "../redux/reducers/profile";
import { Library } from "./Library";

export interface Card {
  id: string;
  library: Library;
  user: Profile;
  state: string;
}
