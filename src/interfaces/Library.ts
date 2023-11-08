import { Address } from "./Address";
import { Book } from "./Book";
export interface Library {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  address: Address;
  booklist: { book: string; quantity: number };
  isActive: boolean;
  roles: { id: number; roleName: string }[];
}
