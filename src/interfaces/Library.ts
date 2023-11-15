import { Address } from "./Address";
import { Book } from "./Book";
import { LibrarybookList } from "./LibraryBookList";
export interface Library {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  address: Address;
  booklist: LibrarybookList;
  isActive: boolean;
  roles: { id: number; roleName: string }[];
}
