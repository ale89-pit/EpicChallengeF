import { Province } from "./Province";

export interface Municipality {
    id:string;
    province_id:string
    municipality_id: string;
    name: string;
    province: Province
}