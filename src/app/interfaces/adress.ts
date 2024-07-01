import { User } from "./user";
export interface Adress {
    street:string
    suburb:string
    city:string
    state:string
    country:string
    zip_code:number
    latitude:number
    longitude:number
    users:User
}
