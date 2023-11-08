import { Profile } from "../redux/reducers/profile";
import { Book } from "./Book";
import { Card } from "./Card";
import { Library } from "./Library";

export interface bookProps {
  book: Book;
}

export interface libraryProps {
  book: Book;
  library: Library;
  index: number;
  isUser: boolean;
  currentProfile: Profile;
  cards: Card[];
  getCards: () => void;
}
