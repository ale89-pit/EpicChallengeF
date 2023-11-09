import { Book } from "./Book";

export interface BookingDto {
  cardId: string;
  books: string[];
  booksNotAvailable: Book[] | null;
  startDate: string | null;
  endDate: string | null;
  restitutionDate: string | null;
  state: string;
}
export interface NewBookingDto {
  cardId: string;
  books: string[];
}
