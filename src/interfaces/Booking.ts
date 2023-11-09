import { Profile } from "../redux/reducers/profile";
import { Book } from "./Book";
import { Card } from "./Card";

export interface Booking {
  id: number;
  card: Card;
  user: Profile;
  books: Book[];
  startDate: string;
  endDate: string | null;
  restitutionDate: string | null;
  confirmed: boolean;
  state: string;
}
