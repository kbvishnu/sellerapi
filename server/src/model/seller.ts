import * as mongodb from "mongodb";
import { Product } from "./product";
 
export interface Seller {
   firstName: string;
   lastName: string;
   address: string;
   city: string;
   state: string;
   pin: string;
   phone:string;
   email:string; 
   _id?: mongodb.ObjectId;
   product: Product;
}