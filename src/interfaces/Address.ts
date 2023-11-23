import { Municipality } from "./Municipality";

export interface Address {
  id: number |null;
  municipality: Municipality;
  street: string;
  number: string;
  km: string;
  description: string;
  lat: string;
  lon: string; 
}
